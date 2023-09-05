import { Box, Typography } from "@mui/material";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Column } from "primereact/column";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Terminal } from "primereact/terminal";
import React, { useEffect, useState } from "react";
import { NET_PACKAGE_EVENT } from "../../comm/constant";
import { Tag } from "primereact/tag";
import { NetPacketDataTableColumns, NetPacketDataTableItem } from "../../comm/types";
import { listen } from "@tauri-apps/api/event";
import { isNull } from "../../comm/global";
import "../../css/page/index-page.css";
import { Divider } from "primereact/divider";
import { OPEN_SETTING_WINDOW } from "../../comm/command";
import { invoke } from "@tauri-apps/api";
import { Toolbar } from "primereact/toolbar";
interface Props {
    setNetCardName: any,
    setNetWorkPacketCount: any,
}
const NetPacketDataTable: React.FC<Props> = ({ setNetCardName, setNetWorkPacketCount }) => {
    // ---------------- make protocol tag ----------------
    const makeProtocolTag = (protocol: String) => {
        if (protocol === 'tcp') {
            return <Tag severity="success" value={protocol} />;
        } else if (protocol === 'udp') {
            return <Tag severity="info" value={protocol} />;
        } else {
            return <Tag severity="info" value={protocol} />;
        }
    }
    const sourceColumnBody = (rowData: any) => {
        // eslint-disable-next-line react/style-prop-object
        return <div className={rowData.protocol} style={{ height: '26px', lineHeight: '26px' }}>{rowData.source}</div>;
    };
    const destinationColumnBody = (rowData: any) => {
        // eslint-disable-next-line react/style-prop-object
        return <div className={rowData.protocol} style={{ height: '26px', lineHeight: '26px' }}>{rowData.destination}</div>;
    };
    const protocolEleColumnBody = (rowData: any) => {
        // eslint-disable-next-line react/style-prop-object
        return <div className={rowData.protocol} >{rowData.protocolEle}</div>;
    };
    const sizeColumnBody = (rowData: any) => {
        // eslint-disable-next-line react/style-prop-object
        return <div className={rowData.protocol} style={{ height: '26px', lineHeight: '26px' }}>{rowData.size}</div>;
    };
    const infoColumnBody = (rowData: any) => {
        // eslint-disable-next-line react/style-prop-object
        return <div className={rowData.protocol} style={{ height: '26px', lineHeight: '26px' }}>{rowData.info}</div>;
    };
    // ---------------- column setting end ----------------    
    // data table scroll bottom
    const dataTableSrollBottom = () => {
        if (document.getElementsByClassName('dataTable').length > 0) {
            document.getElementsByClassName('dataTable')[0].scrollTo(0, document.getElementsByClassName('dataTable')[0].scrollHeight);
        }
    }
    // net packets count
    let tmpPacketsCount: number = 0;
    // data table colums
    const [netPacketDataTableColumns, setNetPacketDataTableColumns] = useState(NetPacketDataTableColumns);
    let tmpNetPacketDataTableItemArr: Array<NetPacketDataTableItem> = [];
    let netPacketDataTableItemArr: Array<NetPacketDataTableItem> = [
        {
            protocol: 'tcp',
            protocolEle: <Tag value='tcp' />,
            source: 'yuiyyyi',
            destination: 'yuiyyyi',
            size: 123,
            data: 'yuiyyuiyyyiyuiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyi',
            info: 'yuiyyyi',
        },
        {
            protocol: 'udp',
            protocolEle: <Tag value='udp' />,
            source: 'yuiyyyi',
            destination: 'yuiyyyi',
            size: 123,
            data: 'yuiyyuiyyyiyuiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyi',
            info: 'yuiyyyi',
        },
        {
            protocol: 'udp',
            protocolEle: <Tag value='udp' />,
            source: 'yuiyyyi',
            destination: 'yuiyyyi',
            size: 123,
            data: 'yuiyyuiyyyiyuiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyi',
            info: 'yuiyyyi',
        },
        {
            protocol: 'udp',
            protocolEle: <Tag value='udp' />,
            source: 'yuiyyyi',
            destination: 'yuiyyyi',
            size: 123,
            data: 'yuiyyuiyyyiyuiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyi',
            info: 'yuiyyyi',
        },
        {
            protocol: 'udp',
            protocolEle: <Tag value='udp' />,
            source: 'yuiyyyi',
            destination: 'yuiyyyi',
            size: 123,
            data: 'yuiyyuiyyyiyuiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyi',
            info: 'yuiyyyi',
        },
        {
            protocol: 'udp',
            protocolEle: <Tag value='udp' />,
            source: 'yuiyyyi',
            destination: 'yuiyyyi',
            size: 123,
            data: 'yuiyyuiyyyiyuiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyi',
            info: 'yuiyyyi',
        },
        {
            protocol: 'tcp',
            protocolEle: <Tag value='tcp' />,
            source: 'yuiyyyi',
            destination: 'yuiyyyi',
            size: 123,
            data: 'yuiyyuiyyyiyuiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyi',
            info: 'yuiyyyi',
        },
        {
            protocol: 'tcp',
            protocolEle: <Tag value='tcp' />,
            source: 'yuiyyyi',
            destination: 'yuiyyyi',
            size: 123,
            data: 'yuiyyuiyyyiyuiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyi',
            info: 'yuiyyyi',
        },
        {
            protocol: 'tcp',
            protocolEle: <Tag value='tcp' />,
            source: 'yuiyyyi',
            destination: 'yuiyyyi',
            size: 123,
            data: 'yuiyyuiyyyiyuiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyuiyyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyuiyyyiyyi',
            info: 'yuiyyyi',
        },
    ];

    const [netPacketDataTableItemList, setNetPacketDataTableItemList] = useState(netPacketDataTableItemArr);
    // listen net packet data
    const listenNetPacketData = async () => {
        await listen(NET_PACKAGE_EVENT, (res) => {
            if (!isNull(res.payload)) {
                var n_packet = JSON.parse(JSON.stringify(res.payload));
                let nP = {
                    protocol: n_packet.protocol,
                    protocolEle: makeProtocolTag(n_packet.protocol),
                    source: n_packet.source,
                    destination: n_packet.destination,
                    size: n_packet.size,
                    data: n_packet.data,
                    info: n_packet.info,
                };
                tmpNetPacketDataTableItemArr.push(nP);
                netPacketDataTableItemArr = [...tmpNetPacketDataTableItemArr];
                setNetPacketDataTableItemList(netPacketDataTableItemArr);
                // net packet numberee
                tmpPacketsCount += 1;
                setNetWorkPacketCount(tmpPacketsCount);
                // data table scroll bottom
                dataTableSrollBottom();
            }
        })
    }
    // net packet info
    const [netPacketInfo, setNetPacketInfo] = useState('');
    // data table row click event
    const dataTableRowClickEvent = (e: DataTableRowClickEvent) => {
        setNetPacketInfo(netPacketDataTableItemList[e.index].data);
    }
    // data table scroll top
    const dataTableCrollTop = () => {
        document.getElementsByClassName('dataTable')[0].scrollTo(0, 0);
    }
    // head tool menu
    const headStartContent = (
        <React.Fragment>
            <i className="pi pi-play" style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <i className="pi pi-refresh" style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <i className="pi pi-stop" style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <Divider layout="vertical" style={{ margin: '0px auto', marginRight: '20px', backgroundColor: '#272727', width: '1px' }} />
            <i className="pi pi-file-export" style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <Divider layout="vertical" style={{ margin: '0px auto', marginRight: '20px', backgroundColor: '#272727', width: '1px' }} />
            <i className="pi pi-angle-double-up" onClick={dataTableCrollTop} style={{ fontSize: '20px', marginRight: '20px' }}></i>
            <i className="pi pi-angle-double-down" onClick={dataTableSrollBottom} style={{ fontSize: '20px', marginRight: '20px' }}></i>
        </React.Fragment>
    );
    const headEndContent = (
        <React.Fragment>
        </React.Fragment>
    );

    // init
    useEffect(() => {
        listenNetPacketData();
    }, []);

    return (
        <>
            <Splitter layout="vertical">
                <SplitterPanel size={5} minSize={5} className="flex align-items-center justify-content-center" >
                    {/* head tool bar */}
                    <Toolbar start={headStartContent} end={headEndContent} style={{ border: 'none', borderRadius: '0px', padding: 'padding: 0px 20px' }} />
                </SplitterPanel>
                <SplitterPanel size={95} minSize={95} className="flex align-items-center justify-content-center" >
                    <Splitter layout="vertical">
                        <SplitterPanel
                            size={80}
                            minSize={50}
                            className="dataTableBox flex align-items-center justify-content-center"
                            style={{ overflow: 'auto', position: 'relative', width: '100%' }}>
                            <DataTable
                                className="dataTable"
                                selectionMode={'single'}
                                resizableColumns
                                onRowClick={dataTableRowClickEvent}
                                scrollHeight="600px"
                                scrollable
                                virtualScrollerOptions={{ itemSize: 26, lazy: true }}
                                value={netPacketDataTableItemList}
                                size={'small'}
                                style={{ width: '100%', height: '100%', whiteSpace: 'nowrap', position: 'absolute' }}>
                                <Column body={sourceColumnBody} style={{ textAlign: "left" }}
                                    align={'left'} key={'source'} field={'source'} header={'Source'} />
                                <Column body={destinationColumnBody} style={{ textAlign: "left" }}
                                    align={'left'} key={'destination'} field={'destination'} header={'Destination'} />
                                <Column body={protocolEleColumnBody} style={{ textAlign: "left" }}
                                    align={'left'} key={'protocolEle'} field={'protocolEle'} header={'Protocol'} />
                                <Column body={sizeColumnBody} style={{ textAlign: "left" }}
                                    align={'left'} key={'size'} field={'size'} header={'Size'} />
                                <Column body={infoColumnBody} style={{ textAlign: "left" }}
                                    align={'left'} key={'info'} field={'info'} header={'Info'} />
                            </DataTable>
                        </SplitterPanel>
                        <SplitterPanel size={15} minSize={10} className="flex align-items-center justify-content-center" >
                            <Splitter layout="horizontal">
                                <SplitterPanel className="flex align-items-center justify-content-center" size={50} style={{ position: 'relative', overflow: 'auto' }}>
                                    <Accordion multiple activeIndex={[0]} style={{ position: 'absolute', width: '100%' }}>
                                        <AccordionTab header={'head'} >
                                            <Box sx={{ width: '100%' }}>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                                    blanditiis tenetur
                                                </Typography>
                                            </Box>
                                        </AccordionTab>
                                        <AccordionTab header={"body"} >
                                            <Box sx={{ width: '100%' }}>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                                    blanditiis tenetur
                                                </Typography>
                                            </Box>
                                        </AccordionTab>
                                    </Accordion>
                                </SplitterPanel>
                                <SplitterPanel className="flex align-items-center justify-content-center" size={50} style={{ position: 'relative', overflow: 'auto' }}>
                                    <Terminal defaultChecked prompt="$" />
                                </SplitterPanel>
                            </Splitter>
                        </SplitterPanel>
                    </Splitter>
                </SplitterPanel>
            </Splitter>
        </>
    );
};

export default NetPacketDataTable;


