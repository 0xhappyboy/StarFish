use sysinfo::{System, SystemExt};

#[derive(Clone, Debug, serde::Serialize)]
pub struct OSBasis {
    pub totalMemory: String,
}

impl OSBasis {
    pub fn new() -> Option<OSBasis> {
        let mut sys = System::new_all();
        let os_basis = OSBasis {
            totalMemory: sys.total_memory().to_string(),
        };
        Some(os_basis)
    }
}
