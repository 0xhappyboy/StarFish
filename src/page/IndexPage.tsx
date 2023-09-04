/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Column } from "primereact/column";
import { DataTable, DataTableRowClickEvent, DataTableSelection } from "primereact/datatable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { createRef, useEffect, useRef, useState } from "react";
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
import { GET_NET_CARD_LIST, OPEN_SETTING_WINDOW } from "../comm/command";
import { DEMO, NET_PACKAGE_EVENT } from "../comm/constant";
import { NetPacketDataTableColumns, NetPacketDataTableItem } from "../comm/types";
import { emit, listen } from '@tauri-apps/api/event'
import { Tag } from "primereact/tag";
import { Knob } from "primereact/knob";
import { Accordion, AccordionTab } from "primereact/accordion";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import { PanelMenu } from "primereact/panelmenu";
import { I18N } from "../comm/i18n";
import { ENV_LANGUAGE } from "../comm/env";

interface Props { }
const IndexPage: React.FC<Props> = ({ }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    // data table scroll height
    const [dataTableScrollHeight, setDataTableScrollHeight] = useState('400px');
    // data table scroll top
    const dataTableCrollTop = () => {
        document.getElementsByClassName('dataTableBox')[0].scrollTo(0, 0);
        document.getElementsByClassName('dataTable')[0].scrollTo(0, 0);
    }
    // data table scroll bottom
    const dataTableSrollBottom = () => {
        document.getElementsByClassName('dataTableBox')[0].scrollTo(0, document.getElementsByClassName('dataTableBox')[0].scrollHeight);
        document.getElementsByClassName('dataTable')[0].scrollTo(0, document.getElementsByClassName('dataTable')[0].scrollHeight);
    }
    // network card name
    const [netCardName, setNetCardName] = useState('');
    // net packets count
    let tmpPacketsCount: number = 0;
    const [packetsCount, setPacketsCount] = useState(tmpPacketsCount);
    //  net card list
    const [netCardList, setNetCardList] = useState<Array<any>>([
        {
            'name': 123,
        },
        {
            'name': 123,
        },
        {
            'name': 123,
        },
        {
            'name': 123,
        },
        {
            'name': 123,
        },
        {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        }, {
            'name': 123,
        },
    ]);
    // event init
    const eventInit = () => {
    }
    // event listen init
    var netCardArr: Array<any> = [];
    const netCardInit = () => {
        invoke(GET_NET_CARD_LIST).then((netCardListStr: any) => {
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
            <i className="pi pi-cog" onClick={() => { invoke(OPEN_SETTING_WINDOW) }} style={{ fontSize: '20px', marginRight: '20px' }}></i>
        </React.Fragment>
    );

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
                setPacketsCount(tmpPacketsCount);
                // data table scroll bottom
                dataTableSrollBottom();
            }
        })
    }
    // data table row click event
    const dataTableRowClickEvent = (e: DataTableRowClickEvent) => {
        setNetPacketInfo(netPacketDataTableItemList[e.index].data);
    }
    // net packet info
    const [netPacketInfo, setNetPacketInfo] = useState('');
    // foot tool menu
    const footStartContent = (
        <React.Fragment>
            <i className="pi pi-github" style={{ fontSize: '14px', marginRight: '15px' }}></i>
            <i className="pi pi-file" style={{ fontSize: '14px', marginRight: '15px' }}></i>
            <p style={{ fontSize: '14px', marginRight: '15px' }}>{netCardName}</p>
        </React.Fragment>
    );
    const footEndContent = (
        <React.Fragment>
            <i className="pi pi-github" style={{ fontSize: '14px', marginLeft: '15px' }}></i>
            <i className="pi pi-eye" style={{ fontSize: '15px', marginTop: '3px', marginLeft: '15px' }}></i>
            <p style={{ fontSize: '14px', marginLeft: '10px' }}>packets : {packetsCount}</p>
        </React.Fragment>
    );

    const commandHandler = (text: string) => {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            case 'clear':
                response = null;
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response)
            TerminalService.emit('response', response);
        else
            TerminalService.emit('clear');
    };

    // left menu item list
    const leftMenuItems = [
        {
            label: I18N[ENV_LANGUAGE].leftMenu.net,
            icon: 'pi pi-fw pi-globe',
            items: [
                {
                    label: I18N[ENV_LANGUAGE].leftMenu.nic,
                    icon: 'pi pi-fw pi-bolt',
                    items: netCardList
                },
                {
                    label: 'Wifi',
                    icon: 'pi pi-fw pi-wifi'
                }
            ]
        },
        {
            label: I18N[ENV_LANGUAGE].leftMenu.os,
            icon: 'pi pi-fw pi-desktop',
            items: [
            ]
        },
        {
            label: I18N[ENV_LANGUAGE].leftMenu.os,
            icon: 'pi pi-fw pi-link',
            items: [
            ]
        },
    ];

    // init
    useEffect(() => {
        eventInit();
        netCardInit();
        listenNetPacketData();
        TerminalService.on('command', commandHandler);
        return () => {
            TerminalService.off('command', commandHandler);
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
                    <Divider style={{ position: 'absolute', bottom: '1px', margin: '0px 0px', backgroundColor: '#272727', height: '2px' }} />
                </SplitterPanel>
                {/* body area */}
                <SplitterPanel minSize={96} size={96}>
                    <Splitter layout="horizontal" style={{ borderRadius: "0px", border: 'none' }}>
                        {/* left menu */}
                        <SplitterPanel style={{ position: 'relative', overflow: 'auto' }} className="flex align-items-center justify-content-center" minSize={15} size={20} >
                            <PanelMenu multiple model={leftMenuItems} className="w-full md:w-25rem" style={{ position: 'absolute' }} />
                        </SplitterPanel>
                        {/* right area */}
                        <SplitterPanel className="flex align-items-center justify-content-center" minSize={60} size={80}>
                            <Splitter layout="vertical"
                                onResizeEnd={(e) => {
                                    // set data table scroll height
                                    setDataTableScrollHeight(document.getElementsByClassName('dataTable')[0].clientHeight + 'px');
                                }}>
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
                                        scrollHeight="400px"
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
                                <SplitterPanel size={20} minSize={10} className="flex align-items-center justify-content-center" >
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
                    </Splitter >
                </SplitterPanel>
                {/* foot area */}
                <SplitterPanel minSize={1} size={1} style={{ position: 'relative' }}>
                    <Divider style={{ position: 'absolute', top: '1px', margin: '0px 0px', backgroundColor: '#272727', height: '2px' }} />
                    {/* bottom bar */}
                    <Toolbar start={footStartContent} end={footEndContent} style={{ border: 'none', borderRadius: '0px', padding: '0px 20px', width: '100%', zIndex: '10' }} />
                </SplitterPanel>
            </Splitter>
        </div >
    );
};

export default IndexPage;


