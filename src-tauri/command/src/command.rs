use net::net::*;

#[tauri::command]
pub fn get_card_list(invoke_message: String) -> String {
    let netCardListStr: String = serde_json::to_string(&NetCard::new_list()).unwrap();
    netCardListStr
}
