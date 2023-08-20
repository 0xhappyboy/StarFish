use pnet::datalink;

// net card
#[derive(Clone, Debug, serde::Serialize)]
pub struct NetCard {
    pub name: String,
}
impl NetCard {
    pub fn new_list() -> Option<Vec<NetCard>> {
        let mut net_card_list: Vec<NetCard> = vec![];
        let interfaces = datalink::interfaces();
        for (k, v) in interfaces.iter().enumerate() {
            let card: NetCard = NetCard {
                name: v.name.clone(),
            };
            net_card_list.push(card)
        }
        Some(net_card_list)
    }
}
