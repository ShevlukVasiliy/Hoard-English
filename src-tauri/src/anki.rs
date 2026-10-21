// Чтение коллекции Anki строго на чтение. Добавление слов — только через AnkiConnect.
use rusqlite::{Connection, OpenFlags};
use serde::Serialize;
use std::{collections::HashMap, fs, io::{Read, Write}, net::TcpStream, path::PathBuf, time::Duration};

#[derive(Serialize)]
pub struct Profile {
    name: String,
    path: String,
}

#[derive(Serialize)]
pub struct Word {
    front: String,
    back: String,
    lapses: i64,
    ivl: i64,
    reps: i64,
}

// Папка Anki2 в стандартном месте каждой системы.
fn anki_root() -> Result<PathBuf, String> {
    #[cfg(target_os = "windows")]
    if let Some(appdata) = std::env::var_os("APPDATA") {
        return Ok(PathBuf::from(appdata).join("Anki2"));
    }
    let home = crate::data::home()?;
    if cfg!(target_os = "macos") {
        Ok(home.join("Library/Application Support/Anki2"))
    } else if cfg!(target_os = "windows") {
        Ok(home.join("AppData/Roaming/Anki2"))
    } else {
        Ok(home.join(".local/share/Anki2"))
    }
}

// Профили — папки с collection.anki2 внутри Anki2.
#[tauri::command]
pub fn anki_profiles() -> Result<Vec<Profile>, String> {
    let root = anki_root()?;
    let mut out = vec![];
    for entry in fs::read_dir(&root).map_err(|e| crate::i18n::anki_not_found(crate::i18n::current(), &root.display().to_string(), &e.to_string()))? {
        let dir = entry.map_err(|e| e.to_string())?.path();
        let col = dir.join("collection.anki2");
        if col.is_file() {
            let name = dir.file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or_default();
            out.push(Profile { name, path: col.display().to_string() });
        }
    }
    Ok(out)
}

fn expand(path: &str) -> PathBuf {
    match (path.strip_prefix("~/"), crate::data::home()) {
        (Some(rest), Ok(home)) => home.join(rest),
        _ => PathBuf::from(path),
    }
}

// Открываем только на чтение. Если база занята запущенным Anki — читаем копию во временной папке.
fn open(path: &str) -> Result<Connection, String> {
    let src = expand(path);
    let flags = OpenFlags::SQLITE_OPEN_READ_ONLY | OpenFlags::SQLITE_OPEN_NO_MUTEX;
    let try_open = |p: &PathBuf| -> Result<Connection, rusqlite::Error> {
        let c = Connection::open_with_flags(p, flags)?;
        // Anki сортирует имена колод своей collation; без неё запросы к decks падают
        c.create_collation("unicase", |a: &str, b: &str| a.to_lowercase().cmp(&b.to_lowercase()))?;
        c.query_row("select count(*) from notes", [], |_| Ok(()))?;
        Ok(c)
    };
    match try_open(&src) {
        Ok(c) => Ok(c),
        Err(_) => {
            let tmp = std::env::temp_dir().join("eng-teacher-anki");
            fs::create_dir_all(&tmp).map_err(|e| e.to_string())?;
            let copy = tmp.join("collection.anki2");
            fs::copy(&src, &copy).map_err(|e| format!("не удалось прочитать {}: {e}", src.display()))?;
            let wal = src.with_extension("anki2-wal");
            if wal.is_file() {
                let _ = fs::copy(&wal, tmp.join("collection.anki2-wal"));
            }
            try_open(&copy).map_err(|e| format!("не удалось открыть коллекцию: {e}"))
        }
    }
}

// Имена колод; вложенные колоды хранятся через \x1f, показываем через «::».
#[tauri::command]
pub fn anki_decks(path: String) -> Result<Vec<String>, String> {
    let c = open(&path)?;
    let mut st = c.prepare("select name from decks order by name").map_err(|e| e.to_string())?;
    let names = st
        .query_map([], |r| r.get::<_, String>(0))
        .map_err(|e| e.to_string())?
        .filter_map(Result::ok)
        .map(|n| n.replace('\u{1f}', "::"))
        .collect();
    Ok(names)
}

// Слова колоды и её подколод: два первых поля заметки и худшая статистика её карточек.
#[tauri::command]
pub fn anki_words(path: String, deck: String) -> Result<Vec<Word>, String> {
    let c = open(&path)?;
    let mut st = c.prepare("select id, name from decks").map_err(|e| e.to_string())?;
    let target = deck.replace("::", "\u{1f}");
    let ids: Vec<i64> = st
        .query_map([], |r| Ok((r.get::<_, i64>(0)?, r.get::<_, String>(1)?)))
        .map_err(|e| e.to_string())?
        .filter_map(Result::ok)
        .filter(|(_, n)| n.eq_ignore_ascii_case(&target) || n.to_lowercase().starts_with(&format!("{}\u{1f}", target.to_lowercase())))
        .map(|(id, _)| id)
        .collect();
    if ids.is_empty() {
        return Err(crate::i18n::deck_not_found(crate::i18n::current(), &deck));
    }
    let list = ids.iter().map(|i| i.to_string()).collect::<Vec<_>>().join(",");
    let sql = format!(
        "select n.flds, max(c.lapses), max(c.ivl), sum(c.reps) from notes n join cards c on c.nid = n.id \
         where c.did in ({list}) group by n.id"
    );
    let mut st = c.prepare(&sql).map_err(|e| e.to_string())?;
    let words = st
        .query_map([], |r| {
            let flds: String = r.get(0)?;
            let mut f = flds.split('\u{1f}');
            Ok(Word {
                front: f.next().unwrap_or_default().to_string(),
                back: f.next().unwrap_or_default().to_string(),
                lapses: r.get(1)?,
                ivl: r.get(2)?,
                reps: r.get(3)?,
            })
        })
        .map_err(|e| e.to_string())?
        .filter_map(Result::ok)
        .collect();
    Ok(words)
}

// Минимальный HTTP-клиент для AnkiConnect на 127.0.0.1:8765.
fn anki_connect(body: &serde_json::Value) -> Result<serde_json::Value, String> {
    let addr = "127.0.0.1:8765".parse().map_err(|e: std::net::AddrParseError| e.to_string())?;
    let mut s = TcpStream::connect_timeout(&addr, Duration::from_secs(2)).map_err(|_| crate::i18n::anki_closed(crate::i18n::current()).to_string())?;
    s.set_read_timeout(Some(Duration::from_secs(10))).map_err(|e| e.to_string())?;
    let payload = body.to_string();
    let req = format!(
        "POST / HTTP/1.0\r\nHost: 127.0.0.1\r\nContent-Type: application/json\r\nContent-Length: {}\r\n\r\n{}",
        payload.len(),
        payload
    );
    s.write_all(req.as_bytes()).map_err(|e| e.to_string())?;
    let mut resp = String::new();
    s.read_to_string(&mut resp).map_err(|e| e.to_string())?;
    let json = resp.split("\r\n\r\n").nth(1).ok_or("пустой ответ AnkiConnect")?;
    let v: serde_json::Value = serde_json::from_str(json).map_err(|e| e.to_string())?;
    if let Some(err) = v.get("error").and_then(|e| e.as_str()) {
        return Err(err.to_string());
    }
    Ok(v["result"].clone())
}

// Тип заметки: «Basic» или локализованная «Простая», иначе первый с двумя полями и больше.
fn pick_model() -> Result<(String, String, String), String> {
    let names: Vec<String> = serde_json::from_value(anki_connect(&serde_json::json!({ "action": "modelNames", "version": 6 }))?)
        .map_err(|e| e.to_string())?;
    let mut ordered: Vec<&String> = names.iter().filter(|n| *n == "Basic" || *n == "Простая").collect();
    ordered.extend(names.iter());
    for name in ordered {
        let fields: Vec<String> = serde_json::from_value(anki_connect(&serde_json::json!({
            "action": "modelFieldNames", "version": 6, "params": { "modelName": name }
        }))?)
        .map_err(|e| e.to_string())?;
        if let [front, back, ..] = fields.as_slice() {
            return Ok((name.clone(), front.clone(), back.clone()));
        }
    }
    Err("в Anki нет типа заметки с двумя полями".into())
}

#[tauri::command]
pub fn anki_add_note(deck: String, front: String, back: String) -> Result<(), String> {
    let (model, f1, f2) = pick_model()?;
    // колоды вроде Hoard::Заметки создаются при первой карточке; существующая не меняется
    anki_connect(&serde_json::json!({ "action": "createDeck", "version": 6, "params": { "deck": deck } }))?;
    let mut fields = HashMap::new();
    fields.insert(f1, front);
    fields.insert(f2, back);
    anki_connect(&serde_json::json!({
        "action": "addNote",
        "version": 6,
        "params": { "note": {
            "deckName": deck,
            "modelName": model,
            "fields": fields,
            "options": { "allowDuplicate": false }
        }}
    }))
    .map(|_| ())
}

#[cfg(test)]
mod tests {
    use super::*;

    // Читает настоящую коллекцию пользователя: cargo test -- --ignored
    #[test]
    #[ignore]
    fn reads_local_collection() {
        let p = anki_profiles().unwrap();
        assert!(!p.is_empty());
        let decks = anki_decks(p[0].path.clone()).unwrap();
        println!("decks: {decks:?}");
        let words = anki_words(p[0].path.clone(), "english".into()).unwrap();
        println!("words: {} first: {} = {}", words.len(), words[0].front, words[0].back);
        assert!(words.len() > 100);
    }
}
