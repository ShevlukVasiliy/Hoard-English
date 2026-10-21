# Hoard

Десктоп-приложение для грамматики английского: 36 уроков A1–C1, адаптивный входной тест, контрольные по блокам, повторение ошибок по интервалам, задания из твоей колоды Anki и еженедельное напоминание. Работает полностью офлайн, без ИИ.

Tauri 2 + React (Vite) + Bun. Подробности — в [CONCEPT.md](CONCEPT.md), план — в [STAGE_PLAN.md](STAGE_PLAN.md).

## Запуск

Нужны [Bun](https://bun.sh) и [Rust](https://rustup.rs).

```bash
bun install
bun run app:dev
```

Только интерфейс в браузере (данные в localStorage, без Anki и уведомлений):

```bash
bun run dev
```

## Проверки

```bash
bun run typecheck
bun test
cd src-tauri && cargo check
```

Тест чтения настоящей коллекции Anki (только чтение): `cd src-tauri && cargo test -- --ignored`.

## Сборка

```bash
bun run app:build
```

Результат: `src-tauri/target/release/bundle/macos/Hoard.app` и `.dmg`.

## Данные

Всё лежит в `~/.eng-teacher/`:

- `progress.json`, `settings.json`, `anki-words.json` — пишет приложение;
- `reminder-state.json` — пишет фоновый поток напоминаний.

База Anki (`collection.anki2`) открывается только на чтение. Новые слова добавляются через [AnkiConnect](https://ankiweb.net/shared/info/2055492159); если Anki закрыт, они ждут в очереди.

## Источники

- Распределение грамматических тем по уровням ориентируется на **CEFR-J Grammar Profile** (ver. 20180315) и **CEFR-J Wordlist** (ver. 1.5), Yukio Tono, Tokyo University of Foreign Studies — <http://www.cefr-j.org/download.html>, через [Open Language Profiles](https://github.com/openlanguageprofiles/olp-en-cefrj). Бесплатно для исследовательского и коммерческого использования при указании источника.
- Файл `shared/data/cefrj-vocabulary-profile-1.5.csv` — оригинал CEFR-J Wordlist; `vocab.json` собирается из него командой `bun shared/data/build-vocab.ts`.
- Уроки, задания, банк входного теста и истории про язык написаны для этого приложения.
