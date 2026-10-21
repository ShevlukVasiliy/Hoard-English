// Фоновый поток: в выбранные дни недели и время — системное уведомление, не чаще раза в день.
// Читает settings.json и progress.json (файлы приложения), пишет только reminder-state.json.
use chrono::{Datelike, Local, Timelike};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::{fs, thread, time::Duration};
use tauri::AppHandle;
use tauri_plugin_notification::NotificationExt;

use crate::data::data_dir;
use crate::i18n::{self, Lang};

#[derive(Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
struct State {
    // дата последнего уведомления, например "2026-10-21"
    last_sent_date: Option<String>,
}

fn read_json(name: &str) -> Option<Value> {
    let s = fs::read_to_string(data_dir().ok()?.join(name)).ok()?;
    serde_json::from_str(&s).ok()
}

fn day(d: chrono::DateTime<Local>) -> String {
    d.format("%Y-%m-%d").to_string()
}

// Текст по ситуации: занятия сегодня, ошибки на повтор, следующий урок, остаток блока.
pub fn message(progress: &Value, now: chrono::DateTime<Local>, lang: Lang) -> String {
    let now_utc = now.with_timezone(&chrono::Utc).to_rfc3339();
    let today = day(now);
    let due = progress["reviews"]
        .as_array()
        .map(|r| r.iter().filter(|x| x["dueAt"].as_str().is_some_and(|d| d <= now_utc.as_str())).count())
        .unwrap_or(0);
    let studied_today = progress["activity"].as_array().is_some_and(|a| {
        a.iter().filter_map(|x| x.as_str()).any(|d| {
            chrono::DateTime::parse_from_rfc3339(d).is_ok_and(|t| day(t.with_timezone(&Local)) == today)
        })
    });
    let block = &progress["nextBlock"];
    let left = block["lessonsLeft"].as_u64().unwrap_or(0) as usize;
    let next = progress["nextLesson"].as_str();

    let mut parts = vec![];
    if due > 0 {
        parts.push(i18n::due(lang, due));
    }
    if !studied_today {
        match next {
            Some(t) => parts.push(i18n::next_lesson(lang, t)),
            None => parts.push(i18n::not_studied(lang).to_string()),
        }
    }
    if (1..=2).contains(&left) {
        if let Some(t) = block["title"].as_str() {
            parts.push(i18n::block_left(lang, t, left));
        }
    }
    if parts.is_empty() {
        parts.push(i18n::all_done(lang).to_string());
    }
    parts.join(" ")
}

pub fn notify(app: &AppHandle, body: &str) -> Result<(), String> {
    app.notification().builder().title("Hoard").body(body).show().map_err(|e| e.to_string())
}

fn tick(app: &AppHandle) -> Result<(), String> {
    let settings = read_json("settings.json").unwrap_or(Value::Null);
    if settings["remindersEnabled"].as_bool() == Some(false) {
        return Ok(());
    }
    // по умолчанию — каждый день в 19:00; старые настройки — час из reminderHour
    let days: Vec<u32> = settings["reminderDays"]
        .as_array()
        .map(|a| a.iter().filter_map(|d| d.as_u64()).map(|d| d as u32).collect())
        .unwrap_or_else(|| (0..7).collect());
    let minutes = settings["reminderMinutes"]
        .as_u64()
        .or_else(|| settings["reminderHour"].as_u64().map(|h| h * 60))
        .unwrap_or(19 * 60) as u32;
    let now = Local::now();
    // 0 = воскресенье, как в Date.getDay()
    if !days.contains(&now.weekday().num_days_from_sunday()) || now.hour() * 60 + now.minute() < minutes {
        return Ok(());
    }
    let dir = data_dir()?;
    let path = dir.join("reminder-state.json");
    let mut state: State = fs::read_to_string(&path).ok().and_then(|s| serde_json::from_str(&s).ok()).unwrap_or_default();
    let today = day(now);
    if state.last_sent_date.as_deref() == Some(today.as_str()) {
        return Ok(());
    }
    let progress = read_json("progress.json").unwrap_or(Value::Null);
    notify(app, &message(&progress, now, i18n::current()))?;
    state.last_sent_date = Some(today);
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    fs::write(&path, serde_json::to_string_pretty(&state).map_err(|e| e.to_string())?).map_err(|e| e.to_string())
}

// Пробное уведомление из настроек.
#[tauri::command]
pub fn test_reminder(app: AppHandle) -> Result<(), String> {
    let progress = read_json("progress.json").unwrap_or(Value::Null);
    notify(&app, &message(&progress, Local::now(), i18n::current()))
}

pub fn spawn(app: AppHandle) {
    thread::spawn(move || loop {
        if let Err(e) = tick(&app) {
            eprintln!("напоминание: {e}");
        }
        // раз в минуту: время напоминания задаётся с точностью до минуты
        thread::sleep(Duration::from_secs(60));
    });
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::TimeZone;

    #[test]
    fn message_by_situation() {
        let now = Local.with_ymd_and_hms(2026, 10, 21, 12, 0, 0).unwrap();
        let empty = serde_json::json!({ "reviews": [], "activity": [] });
        assert_eq!(message(&empty, now, Lang::Ru), "Сегодня ещё не было занятий.");
        let next = serde_json::json!({ "reviews": [], "activity": [], "nextLesson": "Past Perfect" });
        assert_eq!(message(&next, now, Lang::Ru), "Следующий урок — «Past Perfect».");
        let busy = serde_json::json!({
            "reviews": [{ "dueAt": "2026-10-20T00:00:00Z" }, { "dueAt": "2026-10-19T00:00:00Z" }, { "dueAt": "2030-01-01T00:00:00Z" }],
            "activity": [now.with_timezone(&chrono::Utc).to_rfc3339()],
            "nextBlock": { "title": "Perfect", "lessonsLeft": 1 }
        });
        assert_eq!(message(&busy, now, Lang::Ru), "Накопилось 2 ошибки на повтор. До конца блока «Perfect» — 1 урок.");
    }
}
