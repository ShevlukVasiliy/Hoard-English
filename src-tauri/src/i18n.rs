// Строки Rust-части на языке ученика: меню, трей, напоминания, ошибки Anki.
// Язык — поле lang в settings.json (пишет приложение); нет поля — русский.
use crate::data::data_dir;
use std::fs;

#[derive(Clone, Copy, PartialEq)]
pub enum Lang {
    Ru,
    Es,
    De,
    Pl,
}

impl Lang {
    pub fn parse(s: &str) -> Lang {
        match s {
            "es" => Lang::Es,
            "de" => Lang::De,
            "pl" => Lang::Pl,
            _ => Lang::Ru,
        }
    }
}

pub fn current() -> Lang {
    data_dir()
        .ok()
        .and_then(|d| fs::read_to_string(d.join("settings.json")).ok())
        .and_then(|s| serde_json::from_str::<serde_json::Value>(&s).ok())
        .and_then(|v| v["lang"].as_str().map(Lang::parse))
        .unwrap_or(Lang::Ru)
}

// Форма по числу: one, few, many. Для испанского и немецкого few = many.
pub fn plural(lang: Lang, n: usize, one: &str, few: &str, many: &str) -> String {
    let (m10, m100) = (n % 10, n % 100);
    let w = match lang {
        Lang::Ru => {
            if m10 == 1 && m100 != 11 {
                one
            } else if (2..=4).contains(&m10) && !(12..=14).contains(&m100) {
                few
            } else {
                many
            }
        }
        Lang::Pl => {
            if n == 1 {
                one
            } else if (2..=4).contains(&m10) && !(12..=14).contains(&m100) {
                few
            } else {
                many
            }
        }
        Lang::Es | Lang::De => {
            if n == 1 {
                one
            } else {
                many
            }
        }
    };
    format!("{n} {w}")
}

pub struct Menu {
    pub go: &'static str,
    pub back: &'static str,
    pub forward: &'static str,
    pub tabs: [&'static str; 5],
    pub settings: &'static str,
    pub shortcuts: &'static str,
    pub open: &'static str,
    pub quit: &'static str,
}

pub fn menu(lang: Lang) -> Menu {
    match lang {
        Lang::Ru => Menu { go: "Перейти", back: "Назад", forward: "Вперёд", tabs: ["Главная", "Уроки", "История языка", "Заметки", "Слова"], settings: "Настройки", shortcuts: "Клавиши  ?", open: "Открыть", quit: "Выйти" },
        Lang::Es => Menu { go: "Ir", back: "Atrás", forward: "Adelante", tabs: ["Inicio", "Lecciones", "Historia del idioma", "Notas", "Palabras"], settings: "Ajustes", shortcuts: "Teclas  ?", open: "Abrir", quit: "Salir" },
        Lang::De => Menu { go: "Gehe zu", back: "Zurück", forward: "Vorwärts", tabs: ["Start", "Lektionen", "Sprachgeschichte", "Notizen", "Wörter"], settings: "Einstellungen", shortcuts: "Tasten  ?", open: "Öffnen", quit: "Beenden" },
        Lang::Pl => Menu { go: "Przejdź", back: "Wstecz", forward: "Dalej", tabs: ["Start", "Lekcje", "Historia języka", "Notatki", "Słowa"], settings: "Ustawienia", shortcuts: "Klawisze  ?", open: "Otwórz", quit: "Zakończ" },
    }
}

// Части текста напоминания.
pub fn due(lang: Lang, n: usize) -> String {
    match lang {
        Lang::Ru => format!("Накопилось {} на повтор.", plural(lang, n, "ошибка", "ошибки", "ошибок")),
        Lang::Es => format!("Tienes {} para repasar.", plural(lang, n, "error", "errores", "errores")),
        Lang::De => if n == 1 { "1 Fehler wartet auf Wiederholung.".to_string() } else { format!("{n} Fehler warten auf Wiederholung.") },
        Lang::Pl => format!("Do powtórki: {}.", plural(lang, n, "błąd", "błędy", "błędów")),
    }
}

pub fn next_lesson(lang: Lang, title: &str) -> String {
    match lang {
        Lang::Ru => format!("Следующий урок — «{title}»."),
        Lang::Es => format!("Siguiente lección: «{title}»."),
        Lang::De => format!("Nächste Lektion: „{title}“."),
        Lang::Pl => format!("Następna lekcja: „{title}”."),
    }
}

pub fn not_studied(lang: Lang) -> &'static str {
    match lang {
        Lang::Ru => "Сегодня ещё не было занятий.",
        Lang::Es => "Hoy todavía no has estudiado.",
        Lang::De => "Heute hast du noch nicht gelernt.",
        Lang::Pl => "Dziś jeszcze nie było nauki.",
    }
}

pub fn block_left(lang: Lang, title: &str, n: usize) -> String {
    match lang {
        Lang::Ru => format!("До конца блока «{title}» — {}.", plural(lang, n, "урок", "урока", "уроков")),
        Lang::Es => format!("Para terminar el bloque «{title}»: {}.", plural(lang, n, "lección", "lecciones", "lecciones")),
        Lang::De => format!("Bis zum Ende des Blocks „{title}“: {}.", plural(lang, n, "Lektion", "Lektionen", "Lektionen")),
        Lang::Pl => format!("Do końca bloku „{title}”: {}.", plural(lang, n, "lekcja", "lekcje", "lekcji")),
    }
}

pub fn all_done(lang: Lang) -> &'static str {
    match lang {
        Lang::Ru => "Сегодня уже позанимался. Может, блиц на минуту?",
        Lang::Es => "Hoy ya has estudiado. ¿Un blitz de un minuto?",
        Lang::De => "Heute hast du schon gelernt. Wie wäre es mit einem Blitz für eine Minute?",
        Lang::Pl => "Dziś nauka już zaliczona. Może minutowy blitz?",
    }
}

// Ошибки Anki, которые видит ученик.
pub fn anki_not_found(lang: Lang, path: &str, e: &str) -> String {
    match lang {
        Lang::Ru => format!("Anki не найден в {path}: {e}"),
        Lang::Es => format!("No se encontró Anki en {path}: {e}"),
        Lang::De => format!("Anki nicht gefunden in {path}: {e}"),
        Lang::Pl => format!("Nie znaleziono Anki w {path}: {e}"),
    }
}

pub fn deck_not_found(lang: Lang, deck: &str) -> String {
    match lang {
        Lang::Ru => format!("колода «{deck}» не найдена"),
        Lang::Es => format!("no se encontró el mazo «{deck}»"),
        Lang::De => format!("Stapel „{deck}“ nicht gefunden"),
        Lang::Pl => format!("nie znaleziono talii „{deck}”"),
    }
}

pub fn anki_closed(lang: Lang) -> &'static str {
    match lang {
        Lang::Ru => "Anki закрыт или AnkiConnect не установлен",
        Lang::Es => "Anki está cerrado o AnkiConnect no está instalado",
        Lang::De => "Anki ist geschlossen oder AnkiConnect ist nicht installiert",
        Lang::Pl => "Anki jest zamknięte albo AnkiConnect nie jest zainstalowany",
    }
}
