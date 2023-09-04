use events::events::emit_net_package_event;
use net::card::NetCard;
use tauri::Manager;
mod command;
mod events;
mod net;
mod os;
use crate::command::command::{get_net_card_list, get_os_info};
use crate::command::windows::open_setting_window;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut main_window = app.get_window("main").unwrap();
            let net_card_list = NetCard::new_list().unwrap();
            let interface = net_card_list
                .into_iter()
                .filter(|n| n.name == "en0")
                .next()
                .unwrap();
            // test net card
            std::thread::spawn(move || {
                emit_net_package_event(&mut main_window, &interface).unwrap();
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_net_card_list,
            open_setting_window,
            get_os_info
        ])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
