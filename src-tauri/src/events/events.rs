use pnet::packet::ethernet::EthernetPacket;
use tauri::Window;

use crate::net::pack::{get_net_card_by_name, get_net_card_channel, NetPackage};

use super::constant::EventTable::NET_PACKAGE_EVENT;

// net package event
pub fn emit_net_package_event(
    window: &mut Window,
    net_card_name: std::string::String,
) -> Result<(), ()> {
    let (_send, mut read) = get_net_card_channel(&get_net_card_by_name(net_card_name));
    loop {
        match read.next() {
            Ok(packet) => {
                let net_pack = &NetPackage::new(&EthernetPacket::new(packet).unwrap());
                if let Some(net_pack) = net_pack {
                    if net_pack.data.len() == 0 {
                        continue;
                    };
                    let _ = window.emit(NET_PACKAGE_EVENT, net_pack);
                }
            }
            Err(e) => {
                println!("An error occurred while reading: {}", e);
                return Err(());
            }
        }
    }
    Ok(())
}
