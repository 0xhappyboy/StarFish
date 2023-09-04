use pnet::datalink::Channel::Ethernet;
use pnet::datalink::{self, Config, DataLinkReceiver, DataLinkSender, NetworkInterface};

// net card
#[derive(Clone, Debug, serde::Serialize)]
pub struct NetCard {
    pub name: String,
    pub description: String,
    #[serde(skip)]
    pub nic: NetworkInterface,
}
impl NetCard {
    pub fn new_list() -> Option<Vec<NetCard>> {
        let mut net_card_list: Vec<NetCard> = vec![];
        let interfaces = datalink::interfaces();
        for (k, v) in interfaces.iter().enumerate() {
            let card: NetCard = NetCard {
                name: v.name.clone(),
                description: v.description.clone(),
                nic: v.clone(),
            };
            net_card_list.push(card)
        }
        Some(net_card_list)
    }

    pub fn new_by_name(name: std::string::String) -> Option<NetCard> {
        let interfaces = datalink::interfaces();
        let interface = interfaces
            .into_iter()
            .filter(|iface: &NetworkInterface| iface.name == name)
            .next()
            .expect("Error getting interface");
        let nc = NetCard {
            name: interface.name.clone(),
            description: interface.description.clone(),
            nic: interface,
        };
        Some(nc)
    }

    pub fn get_channel(&self) -> (Box<dyn DataLinkSender>, Box<dyn DataLinkReceiver>) {
        let (mut send, mut read) = match datalink::channel(&self.nic, Config::default()) {
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
