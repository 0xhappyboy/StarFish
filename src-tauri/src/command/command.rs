use crate::net::card::NetCard;
use crate::os::basis::OSBasis;

#[tauri::command]
pub fn get_net_card_list() -> String {
    let net_card_list_str: String = serde_json::to_string(&NetCard::new_list()).unwrap();
    net_card_list_str
}

#[tauri::command]
pub fn get_os_info() -> String {
    let os_basis_str: String = serde_json::to_string(&OSBasis::new()).unwrap();
    os_basis_str
}
