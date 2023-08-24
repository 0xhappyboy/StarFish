use crate::net::card::NetCard;

#[tauri::command]
pub fn get_net_card_list() -> String {
    let net_card_list_str: String = serde_json::to_string(&NetCard::new_list()).unwrap();
    net_card_list_str
}
