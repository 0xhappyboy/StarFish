use std::time::Duration;

use tauri::{App, CustomMenuItem, Menu, MenuItem, Submenu, WindowBuilder, WindowUrl};
use tauri::{Manager, Window};

use events::events::*;
use net::net::*;

fn init_app(app: &App, winLabel: String) {}

#[tauri::command]
fn init_process(window: Window) {
    std::thread::spawn(move || loop {
        let netCardListStr: String = serde_json::to_string(&NetCard::new_list()).unwrap();
        println!("start event.....{:?}", netCardListStr);
        window.emit(EventTable::NetCardList, netCardListStr);
        std::thread::sleep(Duration::from_millis(10000));
    });

    // std::thread::spawn(move || loop {
    //     window
    //         .emit(EventTable::DEMO, net_card_list.clone())
    //         .unwrap();
    //     std::thread::sleep(Duration::from_millis(10000));
    //     println!("start event.....")
    // });
}

fn main() {
    tauri::Builder::default()
        .setup(|app| Ok(()))
        .invoke_handler(tauri::generate_handler![init_process])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
