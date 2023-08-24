use std::ptr::null;

use pnet::datalink::Channel::Ethernet;
use pnet::datalink::{
    self, Channel, Config, DataLinkReceiver, DataLinkSender, EtherType, NetworkInterface,
};
use pnet::packet::arp::ArpPacket;
use pnet::packet::ethernet::{EtherTypes, EthernetPacket};
use pnet::packet::ip::IpNextHeaderProtocols;
use pnet::packet::ipv4::Ipv4Packet;
use pnet::packet::ipv6::Ipv6Packet;
use pnet::packet::tcp::TcpPacket;
use pnet::packet::udp::UdpPacket;
use pnet::packet::{Packet, PacketSize};
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
        Ok(_) => {
            panic!("Unhandled channel type")
        }
        Err(e) => {
            panic!(
                "An error occurred when creating the datalink channel: {}",
                e
            )
        }
    };
    (send, read)
}

// net package struct
#[derive(serde::Serialize, Debug)]
pub struct NetPackage {
    pub protocol: String,
    pub source: String,
    pub destination: String,
    pub size: usize,
    pub info: String,
    pub data: Vec<u8>,
}

impl NetPackage {
    // net package deconstruct
    pub fn new(ethernet: &EthernetPacket) -> Option<NetPackage> {
        match ethernet.get_ethertype() {
            EtherTypes::Arp => {
                let arp_pacl = ArpPacket::new(ethernet.payload());
                None
            }
            EtherTypes::Ipv4 => {
                let ipv4_pack = Ipv4Packet::new(ethernet.payload());
                if let Some(ipv4_pack) = ipv4_pack {
                    match ipv4_pack.get_next_level_protocol() {
                        IpNextHeaderProtocols::Tcp => {
                            // create tcp package
                            let tcp_pack_head = TcpPacket::new(ipv4_pack.payload()).unwrap();
                            let net_pack = NetPackage {
                                protocol: String::from("tcp"),
                                source: format!(
                                    "{}:{}",
                                    ipv4_pack.get_source(),
                                    tcp_pack_head.get_source()
                                ),
                                destination: format!(
                                    "{}:{}",
                                    ipv4_pack.get_destination(),
                                    tcp_pack_head.get_destination()
                                ),
                                size: tcp_pack_head.packet_size(),
                                data: tcp_pack_head.payload().to_vec(),
                                info: format!(
                                    "Seq:{} ACK:{} Win:{} Flag:{} Offset:{}",
                                    tcp_pack_head.get_sequence().to_string(),
                                    tcp_pack_head.get_acknowledgement().to_string(),
                                    tcp_pack_head.get_window(),
                                    tcp_pack_head.get_flags(),
                                    tcp_pack_head.get_data_offset()
                                ),
                            };
                            return Some(net_pack);
                        }
                        IpNextHeaderProtocols::Udp => {
                            // create tcp package
                            let upd_pack_head = UdpPacket::new(ipv4_pack.payload()).unwrap();
                            let net_pack = NetPackage {
                                protocol: String::from("upd"),
                                source: format!(
                                    "{}:{}",
                                    ipv4_pack.get_source(),
                                    upd_pack_head.get_source()
                                ),
                                destination: format!(
                                    "{}:{}",
                                    ipv4_pack.get_destination(),
                                    upd_pack_head.get_destination()
                                ),
                                size: upd_pack_head.packet_size(),
                                data: upd_pack_head.payload().to_vec(),
                                info: format!(
                                    "Let:{} CheckSum:{}",
                                    upd_pack_head.get_length().to_string(),
                                    upd_pack_head.get_checksum().to_string(),
                                ),
                            };
                            return Some(net_pack);
                        }
                        _ => {
                            println!("Ignoring packet");
                            None
                        }
                    }
                } else {
                    None
                }
            }
            EtherTypes::Ipv6 => None,
            EtherTypes::Arp => None,
            _ => {
                println!("Ignoring packet");
                None
            }
        }
    }
}
