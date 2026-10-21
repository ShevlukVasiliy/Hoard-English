// Файлы данных в ~/.eng-teacher/. Фронтенд пишет только файлы приложения:
// файл фонового потока (reminder-state.json) ему только на чтение.
use std::{fs, path::PathBuf};

const APP_FILES: &[&str] = &["progress.json", "settings.json", "anki-words.json", "highlights.json", "events.json", "sync.json"];
const READ_ONLY: &[&str] = &["reminder-state.json"];

// Домашняя папка: HOME на macOS и Linux, USERPROFILE на Windows.
pub fn home() -> Result<PathBuf, String> {
    std::env::var_os("HOME")
        .or_else(|| std::env::var_os("USERPROFILE"))
        .map(PathBuf::from)
        .ok_or_else(|| "не найдена домашняя папка".to_string())
}

pub fn data_dir() -> Result<PathBuf, String> {
    Ok(home()?.join(".eng-teacher"))
}

#[tauri::command]
pub fn read_data(name: String) -> Result<Option<String>, String> {
    if !APP_FILES.contains(&name.as_str()) && !READ_ONLY.contains(&name.as_str()) {
        return Err(format!("неизвестный файл: {name}"));
    }
    let path = data_dir()?.join(&name);
    match fs::read_to_string(&path) {
        Ok(s) => Ok(Some(s)),
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(None),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn write_data(name: String, contents: String) -> Result<(), String> {
    if !APP_FILES.contains(&name.as_str()) {
        return Err(format!("приложение не владеет файлом: {name}"));
    }
    serde_json::from_str::<serde_json::Value>(&contents).map_err(|e| format!("не JSON: {e}"))?;
    let dir = data_dir()?;
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    // запись через временный файл, чтобы не оставить полузаписанный JSON
    let tmp = dir.join(format!(".{name}.tmp"));
    fs::write(&tmp, contents).map_err(|e| e.to_string())?;
    fs::rename(&tmp, dir.join(&name)).map_err(|e| e.to_string())
}

// Экспорт прогресса в ~/Downloads, имя с датой; возвращает путь.
#[tauri::command]
pub fn export_progress(contents: String) -> Result<String, String> {
    let dir = home()?.join("Downloads");
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let secs = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map_err(|e| e.to_string())?
        .as_secs();
    let path = dir.join(format!("eng-teacher-progress-{secs}.json"));
    fs::write(&path, contents).map_err(|e| e.to_string())?;
    Ok(path.display().to_string())
}
