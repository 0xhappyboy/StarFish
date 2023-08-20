use net::card::NetCard;
use tauri::{Manager, Window};

use command::command::*;
use events::events::*;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut main_window = app.get_window("main").unwrap();
            std::thread::spawn(move || {
                let net_card_list = NetCard::new_list();
                emit_net_package_event(&mut main_window, "en0".to_string()).unwrap();
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_net_card_list])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
