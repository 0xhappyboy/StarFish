use events::events::emit_net_package_event;
use net::card::NetCard;
use tauri::Manager;
use tokio::join;
mod command;
mod events;
mod net;
use crate::command::command::get_net_card_list;
use crate::command::windows::open_setting_window;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut main_window = app.get_window("main").unwrap();
            // test net card
            std::thread::spawn(move || {
                let net_card_list = NetCard::new_list().unwrap();
                emit_net_package_event(&mut main_window, net_card_list.get(0).unwrap()).unwrap();
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_net_card_list,
            open_setting_window
        ])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
