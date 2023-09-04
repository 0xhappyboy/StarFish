use pnet::{datalink::NetworkInterface, packet::ethernet::EthernetPacket};
use tauri::Window;

use crate::net::{
    card::{get_net_card_channel, NetCard},
    pack::NetPackage,
};

use super::constant::EventTable::NET_PACKAGE_EVENT;

// net package event
pub fn emit_net_package_event(window: &mut Window, nc: &NetCard) -> Result<(), ()> {
    let (_send, mut read) = nc.get_channel();
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
