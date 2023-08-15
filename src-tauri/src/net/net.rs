use std::env;

use pnet::datalink::Channel::Ethernet;
use pnet::datalink::{self, NetworkInterface};

#[derive(Clone, serde::Serialize)]
pub struct NetCard {
    name: String,
}
impl NetCard {
    pub fn new_list() -> Vec<NetCard> {
        let net_card_list: Vec<NetCard> = vec![];
        let interface_name = env::args().nth(1).unwrap();
        let interfaces = datalink::interfaces();
        let interface = interfaces
            .into_iter()
            .filter(|iface: &NetworkInterface| iface.name == interface_name)
            .next()
            .expect("Error getting interface");
        let (_tx, mut rx) = match datalink::channel(&interface, Default::default()) {
            Ok(Ethernet(tx, rx)) => (tx, rx),
            Ok(_) => panic!("Unhandled channel type"),
            Err(e) => panic!("{:?}", e),
        };
        net_card_list
    }
}
