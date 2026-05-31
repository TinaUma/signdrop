use tauri_plugin_shell::ShellExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            // Start the bundled FastAPI sidecar. Failing to start it must not
            // crash the app (no .unwrap()/.expect()) — log and continue so the
            // window still opens with a clear error path.
            match app.shell().sidecar("api-server") {
                Ok(sidecar) => {
                    if let Err(e) = sidecar.spawn() {
                        eprintln!("Failed to start API sidecar: {e}");
                    }
                }
                Err(e) => eprintln!("API sidecar not available: {e}"),
            }
            Ok(())
        })
        .on_window_event(|_window, event| {
            // Sidecar is auto-killed when all Tauri windows close
            if let tauri::WindowEvent::Destroyed = event {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
