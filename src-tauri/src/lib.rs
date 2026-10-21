mod anki;
mod data;
mod i18n;
mod reminder;

use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem, Submenu},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Emitter, Manager, WindowEvent,
};
use tauri_plugin_autostart::MacosLauncher;

// Меню приложения (macOS) и меню трея на языке ученика.
fn menus(app: &tauri::AppHandle, lang: i18n::Lang) -> tauri::Result<()> {
    #[cfg(target_os = "macos")]
    {
        let t = i18n::menu(lang);
        let item = |id: &str, title: &str, key: &str| MenuItem::with_id(app, format!("nav:{id}"), title, true, (!key.is_empty()).then_some(key));
        let go = Submenu::with_items(
            app,
            t.go,
            true,
            &[
                &item("back", t.back, "CmdOrCtrl+[")?,
                &item("forward", t.forward, "CmdOrCtrl+]")?,
                &PredefinedMenuItem::separator(app)?,
                &item("tab:0", t.tabs[0], "CmdOrCtrl+1")?,
                &item("tab:1", t.tabs[1], "CmdOrCtrl+2")?,
                &item("tab:2", t.tabs[2], "CmdOrCtrl+3")?,
                &item("tab:3", t.tabs[3], "CmdOrCtrl+4")?,
                &item("tab:4", t.tabs[4], "CmdOrCtrl+5")?,
                &PredefinedMenuItem::separator(app)?,
                &item("settings", t.settings, "CmdOrCtrl+,")?,
                // без сочетания: «?» в меню перехватывался бы и в полях ввода
                &item("shortcuts", t.shortcuts, "")?,
            ],
        )?;
        let menu = Menu::default(app)?;
        menu.append(&go)?;
        app.set_menu(menu)?;
    }
    if let Some(tray) = app.tray_by_id("main") {
        tray.set_menu(Some(tray_menu(app, lang)?))?;
    }
    Ok(())
}

fn tray_menu(app: &tauri::AppHandle, lang: i18n::Lang) -> tauri::Result<Menu<tauri::Wry>> {
    let t = i18n::menu(lang);
    let open = MenuItem::with_id(app, "open", t.open, true, None::<&str>)?;
    let quit = MenuItem::with_id(app, "quit", t.quit, true, None::<&str>)?;
    Menu::with_items(app, &[&open, &quit])
}

// Смена языка в настройках: меню перестраиваются сразу, напоминания читают язык сами.
#[tauri::command]
fn set_lang(app: tauri::AppHandle, lang: String) -> Result<(), String> {
    let h = app.clone();
    app.run_on_main_thread(move || {
        let _ = menus(&h, i18n::Lang::parse(&lang));
    })
    .map_err(|e| e.to_string())
}

fn show_main(app: &tauri::AppHandle) {
    if let Some(w) = app.get_webview_window("main") {
        let _ = w.show();
        let _ = w.unminimize();
        let _ = w.set_focus();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec!["--hidden"])))
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![
            data::read_data,
            data::write_data,
            data::export_progress,
            anki::anki_profiles,
            anki::anki_decks,
            anki::anki_words,
            anki::anki_add_note,
            reminder::test_reminder,
            set_lang
        ])
        .setup(|app| {
            // меню macOS: пункты «Перейти» уходят во фронтенд событием "menu"
            #[cfg(target_os = "macos")]
            app.on_menu_event(|app, e| {
                let id = e.id().0.as_str();
                if id.starts_with("nav:") {
                    show_main(app);
                    let _ = app.emit("menu", id);
                }
            });

            let lang = i18n::current();
            TrayIconBuilder::with_id("main")
                .icon(app.default_window_icon().cloned().ok_or("нет иконки")?)
                .tooltip("Hoard")
                .menu(&tray_menu(app.handle(), lang)?)
                .show_menu_on_left_click(false)
                .on_menu_event(|app, e| match e.id.as_ref() {
                    "open" => show_main(app),
                    "quit" => app.exit(0),
                    _ => {}
                })
                .on_tray_icon_event(|tray, e| {
                    if let TrayIconEvent::Click { button: MouseButton::Left, button_state: MouseButtonState::Up, .. } = e {
                        show_main(tray.app_handle());
                    }
                })
                .build(app)?;
            menus(app.handle(), lang)?;

            // при автозапуске окно не показываем — приложение ждёт в трее
            if std::env::args().any(|a| a == "--hidden") {
                if let Some(w) = app.get_webview_window("main") {
                    let _ = w.hide();
                }
            }
            // клик по уведомлению открывает окно
            {
                use tauri_plugin_notification::NotificationExt;
                let handle = app.handle().clone();
                app.notification().on_action(move |_| {
                    let h = handle.clone();
                    let _ = handle.run_on_main_thread(move || show_main(&h));
                })?;
            }
            reminder::spawn(app.handle().clone());
            Ok(())
        })
        // закрытие окна прячет его в трей; выход — через меню трея
        .on_window_event(|window, event| {
            if let WindowEvent::CloseRequested { api, .. } = event {
                api.prevent_close();
                let _ = window.hide();
            }
        })
        .build(tauri::generate_context!())
        .expect("не удалось запустить приложение")
        .run(|app, event| {
            // клик по иконке в доке на macOS снова открывает окно
            #[cfg(target_os = "macos")]
            if let tauri::RunEvent::Reopen { .. } = event {
                show_main(app);
            }
            let _ = (app, event);
        });
}
