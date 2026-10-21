# Hoard

Грамматика английского, которая объясняет, почему так. Название — от древнеанглийского *hord*, «сокровищница».

- 36 уроков A1–C1: теория «кратко» или «подробно», глоссы «Почему так?» на полях, практика с упором на сложные задания при повторе
- «История языка»: 36 историй по эпохам, от древнеанглийского до наших дней, в короткой и полной версии
- Выделения в уроках и экран «Заметки»; заметки и истории можно отправить в Anki
- Адаптивный входной тест, финал блока (контрольная, ловушки, блиц), блиц 15 вопросов за минуту, повторение ошибок по интервалам
- Задания из твоей колоды Anki и новые слова твоего уровня
- Ежедневное напоминание в выбранные дни и время, трей и автозапуск
- Навигация назад/вперёд: кнопки, свайп по трекпаду, шорткаты (справка — по `?`)

Работает полностью офлайн, без ИИ.

Tauri 2 + React (Vite) + Bun. Подробности — в [CONCEPT.md](CONCEPT.md), дизайн — в [UX.md](UX.md), план — в [STAGE_PLAN.md](STAGE_PLAN.md).

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

В браузере стартовый экран можно задать в адресе JSON-ом маршрута, например `http://localhost:1420/#{"name":"lesson","id":"past-perfect"}`.

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

- `progress.json`, `settings.json`, `anki-words.json`, `highlights.json` — пишет приложение;
- `reminder-state.json` — пишет фоновый поток напоминаний.

База Anki (`collection.anki2`) открывается только на чтение. Новые слова, заметки (`Hoard::Заметки`) и истории (`Hoard::Истории`) добавляются через [AnkiConnect](https://ankiweb.net/shared/info/2055492159); если Anki закрыт, они ждут в очереди.

## Источники

- Распределение грамматических тем по уровням ориентируется на **CEFR-J Grammar Profile** (ver. 20180315) и **CEFR-J Wordlist** (ver. 1.5), Yukio Tono, Tokyo University of Foreign Studies — <http://www.cefr-j.org/download.html>, через [Open Language Profiles](https://github.com/openlanguageprofiles/olp-en-cefrj). Бесплатно для исследовательского и коммерческого использования при указании источника.
- Файл `shared/data/cefrj-vocabulary-profile-1.5.csv` — оригинал CEFR-J Wordlist; `vocab.json` собирается из него командой `bun shared/data/build-vocab.ts`.
- Уроки, задания, банк входного теста и истории про язык написаны для этого приложения.
- Строки-эпиграфы эпох в «Истории языка» — из текстов в общественном достоянии: древнеанглийский «Отче наш», Чосер, Шекспир, Сэмюэл Джонсон.
