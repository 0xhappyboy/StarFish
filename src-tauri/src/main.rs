use std::time::Duration;

use tauri::{App, CustomMenuItem, Menu, MenuItem, Submenu, WindowBuilder, WindowUrl};
use tauri::{Manager, Window};

use events::events::*;
use net::net::*;
use command::command::*;

fn main() {
    tauri::Builder::default()
        .setup(|app| Ok(()))
        .invoke_handler(tauri::generate_handler![get_card_list])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
