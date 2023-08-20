use net::pack::{get_net_card_by_name, get_net_card_channel, NetPackage};
use pnet::packet::ethernet::EthernetPacket;
use tauri::Window;

use crate::constant::EventTable::NET_PACKAGE_EVENT;

// net package event
pub fn emit_net_package_event(window: &mut Window, net_card_name: std::string::String) {
    let (send, mut read) = get_net_card_channel(&get_net_card_by_name(net_card_name));
    loop {
        match read.next() {
            Ok(packet) => {
                let mut net_pack = &NetPackage::new(&EthernetPacket::new(packet).unwrap());
                let _ = window.emit(NET_PACKAGE_EVENT, net_pack);
                println!("拿到包===={:?}", net_pack);
            }
            Err(e) => {
                panic!("An error occurred while reading: {}", e);
            }
        }
    }
}
