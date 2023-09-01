// open setting window
#[tauri::command]
pub async fn open_setting_window(handle: tauri::AppHandle) {
    tauri::WindowBuilder::new(&handle, "Setting", tauri::WindowUrl::App("/Setting".into()))
        .inner_size(500.0, 600.0)
        .title("Setting")
        .center()
        .build()
        .unwrap();
}
