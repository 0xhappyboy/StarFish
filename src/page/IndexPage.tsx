import { Column } from "primereact/column";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useEffect, useState } from "react";
import { Badge } from "primereact/badge";
import { ScrollPanel } from "primereact/scrollpanel";
import { ListBox } from "primereact/listbox";
import React from "react";
import { Toolbar } from "primereact/toolbar";
import "../css/page/index-page.css";
import { appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api";
import { isNull } from "../comm/global";
import { Divider } from "primereact/divider";
import { GET_NET_CARD_LIST } from "../comm/command";
import { DEMO, NET_PACKAGE_EVENT } from "../comm/constant";
import { NetPacketDataTableColumns, NetPacketDataTableItem } from "../comm/types";
import { emit, listen } from '@tauri-apps/api/event'
import { Tag } from "primereact/tag";

interface Props { }
const IndexPage: React.FC<Props> = ({ }) => {
    // net packets count
    let tmpPacketsCount: number = 0;
    const [packetsCount, setPacketsCount] = useState(tmpPacketsCount);
    //  net card list
    const [netCardList, setNetCardList] = useState<Array<any>>([]);
    // event init
    const eventInit = () => {
    }
    // event listen init
    var netCardArr: Array<any> = [];
    const netCardInit = () => {
        invoke(GET_NET_CARD_LIST, { invokeMessage: 'Hello!' }).then((netCardListStr: any) => {
            var netCards = JSON.parse(netCardListStr);
            if (!isNull(netCards)) {
                netCards.forEach((card: { name: any; }) => {
                    netCardArr.push({
                        'name': card.name
                    });
                });
                setNetCardList([]);
                setNetCardList(netCardArr);
            }
        })
    }

    // event demo 1
    const eventDemo = () => {
        appWindow.emit(DEMO, { message: 'Tauri is awesome!' })
    }

    // head tool menu
    const headStartContent = (
        <React.Fragment>
            <i className="pi pi-play" style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <i className="pi pi-refresh" style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <i className="pi pi-stop" style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <Divider layout="vertical" style={{ margin: '0px auto', marginRight: '20px' }} />
            <i className="pi pi-file-export" style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <Divider layout="vertical" style={{ margin: '0px auto', marginRight: '20px' }} />
            <i className="pi pi-angle-double-up" style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <i className="pi pi-angle-double-down" style={{ fontSize: '20px', marginRight: '20px' }}></i>
        </React.Fragment>
    );

    const headEndContent = (
        <React.Fragment>
        </React.Fragment>
    );

    // data table colums
    const [netPacketDataTableColumns, setNetPacketDataTableColumns] = useState(NetPacketDataTableColumns);
    let tmpNetPacketDataTableItemArr: Array<NetPacketDataTableItem> = [];
    let netPacketDataTableItemArr: Array<NetPacketDataTableItem> = [];
    const [netPacketDataTableItemList, setNetPacketDataTableItemList] = useState(netPacketDataTableItemArr);
    // listen net packet data
    const listenNetPacketData = async () => {
        await listen(NET_PACKAGE_EVENT, (res) => {
            if (!isNull(res.payload)) {
                var n_packet = JSON.parse(JSON.stringify(res.payload));
                let nP = {
                    protocol: <Tag value='tcp' />,
                    source: n_packet.source,
                    destination: n_packet.destination,
                    size: n_packet.size,
                    data: n_packet.data,
                    info: n_packet.info,
                };
                if (n_packet.protocol === 'tcp') {
                    nP.protocol = <Tag value='tcp' />;
                }
                tmpNetPacketDataTableItemArr.push(nP);
                netPacketDataTableItemArr = [...tmpNetPacketDataTableItemArr];
                setNetPacketDataTableItemList(netPacketDataTableItemArr);
                tmpPacketsCount += 1;
                setPacketsCount(tmpPacketsCount);
            }
        })
    }
    // data table row click event
    const dataTableRowClickEvent = (e: DataTableRowClickEvent) => {
        setNetPacketInfo(netPacketDataTableItemList[e.index].data);
    }
    // net packet info
    const [netPacketInfo, setNetPacketInfo] = useState('');
    // bottom tool menu
    const startContent = (
        <React.Fragment>
            <i className="pi pi-github" style={{ fontSize: '14px' }}></i>
        </React.Fragment>
    );
    const endContent = (
        <React.Fragment>
            <i className="pi pi-eye" style={{ fontSize: '14px', marginTop: '3px' }}></i>
            <p style={{ fontSize: '14px', marginLeft: '15px' }}>packets : {packetsCount}</p>
        </React.Fragment>
    );
    // init
    useEffect(() => {
        eventInit();
        netCardInit();
        listenNetPacketData();
        return () => {
        };
    }, []);
    return (
        <div style={{ height: '100%' }}>
            {/* panel area */}
            <Splitter layout="vertical" gutterSize={0} style={{ height: '100%', width: '100%', borderRadius: "0px", border: 'none' }}>
                {/* head area */}
                <SplitterPanel minSize={3} size={3} style={{ position: 'relative' }}>
                    {/* head tool bar */}
                    <Toolbar start={headStartContent} end={headEndContent} style={{ border: 'none', borderRadius: '0px', padding: 'padding: 0px 20px' }} />
                    <Divider style={{ position: 'absolute', bottom: '1px', margin: '0px 0px' }} />
                </SplitterPanel>
                {/* body area */}
                <SplitterPanel minSize={96} size={96}>
                    <Splitter layout="horizontal" style={{ borderRadius: "0px", border: 'none' }}>
                        {/* left menu */}
                        <SplitterPanel className="flex align-items-center justify-content-center" minSize={10} size={20} >
                            <ScrollPanel style={{ width: '100%', maxHeight: '300px' }} className="custombar1">
                                <ListBox value={setNetCardList} options={netCardList} optionLabel="name" className="w-full" style={{ border: 'none' }} />
                            </ScrollPanel>
                        </SplitterPanel>
                        {/* right area */}
                        <SplitterPanel className="flex align-items-center justify-content-center" minSize={60} size={80}>
                            <Splitter layout="vertical" >
                                <SplitterPanel size={80} className="flex align-items-center justify-content-center" style={{ overflow: 'auto', position: 'relative', width: '100%' }}>
                                    <DataTable
                                        onRowClick={dataTableRowClickEvent}
                                        className="style-1"
                                        virtualScrollerOptions={{ itemSize: 46, lazy: true }}
                                        scrollHeight="500px"
                                        scrollable
                                        value={netPacketDataTableItemList}
                                        size={'small'} selectionMode={'single'}
                                        style={{ width: '100%', whiteSpace: 'nowrap', position: 'absolute' }}>
                                        {netPacketDataTableColumns.map((col, i) => (<Column style={{ textAlign: "left" }} align={'left'} key={col.field} field={col.field} header={col.header} />))}
                                    </DataTable>
                                </SplitterPanel>
                                <SplitterPanel size={20} className="flex align-items-center justify-content-center" >
                                    <Splitter layout="horizontal">
                                        <SplitterPanel className="flex align-items-center justify-content-center" size={50} >
                                            {/* network packet info */}
                                            <ScrollPanel style={{ wordBreak: 'break-all', height: '100%', border: 'none', padding: '0px', position: 'static', overflow: 'auto', maxHeight: '300px' }} >
                                                {netPacketInfo}
                                            </ScrollPanel>
                                        </SplitterPanel>
                                        <SplitterPanel className="flex align-items-center justify-content-center" size={50} >
                                        </SplitterPanel>
                                    </Splitter>
                                </SplitterPanel>
                            </Splitter>
                        </SplitterPanel>
                    </Splitter >
                </SplitterPanel>
                {/* foot area */}
                <SplitterPanel minSize={1} size={1} style={{ position: 'relative' }}>
                    {/* bottom bar */}
                    <Toolbar start={startContent} end={endContent} style={{ border: 'none', borderRadius: '0px', padding: '0px 20px', width: '100%', zIndex: '10' }} />
                </SplitterPanel>
            </Splitter>
        </div >
    );
};

export default IndexPage;


