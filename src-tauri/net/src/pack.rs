use pnet::datalink::Channel::Ethernet;
use pnet::datalink::{
    self, Channel, Config, DataLinkReceiver, DataLinkSender, EtherType, NetworkInterface,
};
use pnet::packet::arp::ArpPacket;
use pnet::packet::ethernet::{EtherTypes, EthernetPacket};
use pnet::packet::ipv4::Ipv4Packet;
use pnet::packet::ipv6::Ipv6Packet;
use pnet::packet::Packet;
use tauri::Window;

//get net card by name
pub fn get_net_card_by_name(name: std::string::String) -> NetworkInterface {
    let interfaces = datalink::interfaces();
    let interface = interfaces
        .into_iter()
        .filter(|iface: &NetworkInterface| iface.name == name)
        .next()
        .expect("Error getting interface");
    interface
}

// get net card channel
pub fn get_net_card_channel(
    interface: &NetworkInterface,
) -> (Box<dyn DataLinkSender>, Box<dyn DataLinkReceiver>) {
    let (mut send, mut read) = match datalink::channel(&interface, Config::default()) {
        Ok(Ethernet(tx, rx)) => (tx, rx),
        Ok(_) => panic!("Unhandled channel type"),
        Err(e) => panic!(
            "An error occurred when creating the datalink channel: {}",
            e
        ),
    };
    (send, read)
}

// net package struct
#[derive(Clone, serde::Serialize, Debug)]
pub struct NetPackage {
    pub index: u64,
}

impl NetPackage {
    // net package deconstruct
    pub fn new(ethernet: &EthernetPacket) -> NetPackage {
        match ethernet.get_ethertype() {
            EtherTypes::Ipv4 => {
                let ipv4_pack = Ipv4Packet::new(ethernet.payload());
                let net_pack = NetPackage { index: 1 };
                net_pack
            }
            EtherTypes::Ipv6 => {
                let ipv6_pack = Ipv6Packet::new(ethernet.payload());
                let net_pack = NetPackage { index: 1 };
                net_pack
            }
            EtherTypes::Arp => {
                let arp_pack = ArpPacket::new(ethernet.payload());
                let net_pack = NetPackage { index: 1 };
                net_pack
            }
            _ => {
                println!("Ignoring packet");
                let net_pack = NetPackage { index: 1 };
                net_pack
            }
        }
    }
}
