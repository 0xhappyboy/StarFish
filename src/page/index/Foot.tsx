import React from "react";
import { Toolbar } from "primereact/toolbar";
import { OPEN_SETTING_WINDOW } from "../../comm/command";
import { invoke } from "@tauri-apps/api";

interface Props { netCardName: string, netWorkPacketCount: number }
const Foot: React.FC<Props> = ({ netCardName, netWorkPacketCount }) => {
    // foot tool menu
    const footStartContent = (
        <React.Fragment>
            <i className="pi pi-github" style={{ fontSize: '14px', marginRight: '15px' }}></i>
            <i className="pi pi-file" style={{ fontSize: '14px', marginRight: '15px' }}></i>
            <i className="pi pi-cog" onClick={() => { invoke(OPEN_SETTING_WINDOW) }} style={{ fontSize: '14px', marginRight: '15px' }}></i>
            <p style={{ fontSize: '14px', marginRight: '15px' }}>{netCardName}</p>
        </React.Fragment>
    );
    const footEndContent = (
        <React.Fragment>
            <i className="pi pi-eye" style={{ fontSize: '15px', marginTop: '3px', marginLeft: '15px' }}></i>
            <p style={{ fontSize: '14px', marginLeft: '10px' }}>packets : {netWorkPacketCount}</p>
        </React.Fragment>
    );
    return (
        <>
            {/* bottom bar */}
            <Toolbar start={footStartContent} end={footEndContent} style={{ border: 'none', borderRadius: '0px', padding: '0px 20px', width: '100%', zIndex: '10' }} />
        </>
    );
};

export default Foot;


