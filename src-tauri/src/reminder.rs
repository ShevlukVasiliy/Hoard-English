// Фоновый поток: раз в неделю в выбранный день и час — системное уведомление.
// Читает settings.json и progress.json (файлы приложения), пишет только reminder-state.json.
use chrono::{Datelike, Local, Timelike};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::{fs, thread, time::Duration};
use tauri::AppHandle;
use tauri_plugin_notification::NotificationExt;

use crate::data::data_dir;

#[derive(Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
struct State {
    // ISO-неделя последнего уведомления, например "2026-W43"
    last_sent_week: Option<String>,
}

fn read_json(name: &str) -> Option<Value> {
    let s = fs::read_to_string(data_dir().ok()?.join(name)).ok()?;
    serde_json::from_str(&s).ok()
}

fn iso_week(d: chrono::DateTime<Local>) -> String {
    let w = d.iso_week();
    format!("{}-W{:02}", w.year(), w.week())
}

fn plural(n: usize, one: &str, few: &str, many: &str) -> String {
    let (m10, m100) = (n % 10, n % 100);
    let w = if m10 == 1 && m100 != 11 {
        one
    } else if (2..=4).contains(&m10) && !(12..=14).contains(&m100) {
        few
    } else {
        many
    };
    format!("{n} {w}")
}

// Текст по ситуации: ошибки на повтор, занятия на этой неделе, остаток блока.
pub fn message(progress: &Value, now: chrono::DateTime<Local>) -> String {
    let now_utc = now.with_timezone(&chrono::Utc).to_rfc3339();
    let week = iso_week(now);
    let due = progress["reviews"]
        .as_array()
        .map(|r| r.iter().filter(|x| x["dueAt"].as_str().is_some_and(|d| d <= now_utc.as_str())).count())
        .unwrap_or(0);
    let studied = progress["activity"].as_array().is_some_and(|a| {
        a.iter().filter_map(|x| x.as_str()).any(|d| {
            chrono::DateTime::parse_from_rfc3339(d).is_ok_and(|t| iso_week(t.with_timezone(&Local)) == week)
        })
    });
    let block = &progress["nextBlock"];
    let left = block["lessonsLeft"].as_u64().unwrap_or(0) as usize;

    let mut parts = vec![];
    if !studied {
        parts.push("На этой неделе ещё не было занятий.".to_string());
    }
    if due > 0 {
        parts.push(format!("Накопилось {} на повтор.", plural(due, "ошибка", "ошибки", "ошибок")));
    }
    if (1..=2).contains(&left) {
        if let Some(t) = block["title"].as_str() {
            parts.push(format!("До конца блока «{t}» — {}.", plural(left, "урок", "урока", "уроков")));
        }
    }
    if parts.is_empty() {
        parts.push("Серия недель держится. Ещё один урок?".to_string());
    }
    parts.join(" ")
}

fn tick(app: &AppHandle) -> Result<(), String> {
    let settings = read_json("settings.json").unwrap_or(Value::Null);
    if settings["remindersEnabled"].as_bool() == Some(false) {
        return Ok(());
    }
    let weekday = settings["reminderWeekday"].as_u64().unwrap_or(0) as u32;
    let hour = settings["reminderHour"].as_u64().unwrap_or(11) as u32;
    let now = Local::now();
    // 0 = воскресенье, как в Date.getDay()
    if now.weekday().num_days_from_sunday() != weekday || now.hour() < hour {
        return Ok(());
    }
    let dir = data_dir()?;
    let path = dir.join("reminder-state.json");
    let mut state: State = fs::read_to_string(&path).ok().and_then(|s| serde_json::from_str(&s).ok()).unwrap_or_default();
    let week = iso_week(now);
    if state.last_sent_week.as_deref() == Some(week.as_str()) {
        return Ok(());
    }
    let progress = read_json("progress.json").unwrap_or(Value::Null);
    app.notification()
        .builder()
        .title("Grammar")
        .body(message(&progress, now))
        .show()
        .map_err(|e| e.to_string())?;
    state.last_sent_week = Some(week);
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    fs::write(&path, serde_json::to_string_pretty(&state).map_err(|e| e.to_string())?).map_err(|e| e.to_string())
}

pub fn spawn(app: AppHandle) {
    thread::spawn(move || loop {
        if let Err(e) = tick(&app) {
            eprintln!("напоминание: {e}");
        }
        thread::sleep(Duration::from_secs(300));
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
        assert_eq!(message(&empty, now), "На этой неделе ещё не было занятий.");
        let busy = serde_json::json!({
            "reviews": [{ "dueAt": "2026-10-20T00:00:00Z" }, { "dueAt": "2026-10-19T00:00:00Z" }, { "dueAt": "2030-01-01T00:00:00Z" }],
            "activity": [now.with_timezone(&chrono::Utc).to_rfc3339()],
            "nextBlock": { "title": "Perfect", "lessonsLeft": 1 }
        });
        assert_eq!(message(&busy, now), "Накопилось 2 ошибки на повтор. До конца блока «Perfect» — 1 урок.");
    }
}
