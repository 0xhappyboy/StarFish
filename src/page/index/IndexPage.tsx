/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Divider } from "primereact/divider";
import { TerminalService } from 'primereact/terminalservice';
import { GET_NET_CARD_LIST, OPEN_SETTING_WINDOW } from "../../comm/command";
import { isNull } from "../../comm/global";
import { I18N } from "../../comm/i18n";
import { ENV_LANGUAGE } from "../../comm/env";
import NetPacketDataTable from "./NetPacketDataTable";
import Foot from "./Foot";
import LeftMenu from "./LeftMenu";
import Memory from "./Memory";
import Cpu from "./Cpu";
import Process from "./Process";
import { invoke } from "@tauri-apps/api";
import OSBasis from "./OSBasis";

interface Props { }
const IndexPage: React.FC<Props> = ({ }) => {
    // data table scroll top
    const dataTableCrollTop = () => {
        document.getElementsByClassName('dataTableBox')[0].scrollTo(0, 0);
        document.getElementsByClassName('dataTable')[0].scrollTo(0, 0);
    }
    //  net card list
    const [netCardList, setNetCardList] = useState<Array<any>>([
        {
            'label': 'test',
            'id': 'netcard',
            'command': (event: any) => {
                switchRightView(event);
            }
        },
    ]);
    // event listen init
    var netCardArr: Array<any> = [];
    const netCardInit = () => {
        invoke(GET_NET_CARD_LIST).then((netCardListStr: any) => {
            var netCards = JSON.parse(netCardListStr);
            if (!isNull(netCards)) {
                netCards.forEach((card: { name: any; }) => {
                    netCardArr.push({
                        'label': card.name,
                        'id': 'netcard',
                        'command': (event: any) => {
                            console.log(event);
                        }
                    });
                });
                setNetCardList([]);
                setNetCardList(netCardArr);
            }
        })
    }
    // data table scroll bottom
    const dataTableSrollBottom = () => {
        document.getElementsByClassName('dataTableBox')[0].scrollTo(0, document.getElementsByClassName('dataTableBox')[0].scrollHeight);
        document.getElementsByClassName('dataTable')[0].scrollTo(0, document.getElementsByClassName('dataTable')[0].scrollHeight);
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
    // network card name
    const [netCardName, setNetCardName] = useState('');
    // network packet count
    const [netWorkPacketCount, setNetWorkPacketCount] = useState(0);
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
    // switch right view
    const switchRightView = (e: any) => {
        console.log('id');
        console.log(e.item.id);
        if (e.item.id == 'netcard') {
            setNetCardName(e.netCardName);
            setRightView(<NetPacketDataTable setNetCardName={setNetCardName} setNetWorkPacketCount={setNetWorkPacketCount} />);
        } else if (e.item.id == 'memory') {
            setRightView(<Memory />);
        } else if (e.item.id == 'cpu') {
            setRightView(<Cpu />);
        } else if (e.item.id == 'wifi') {
            setRightView(<Cpu />);
        } else if (e.item.id == 'process') {
            setRightView(<Process />);
        } else if (e.item.id == 'os_basis_info') {
            setRightView(<OSBasis />);
        }
    }
    // right view
    const [rightView, setRightView] = useState(
        <NetPacketDataTable setNetCardName={setNetCardName} setNetWorkPacketCount={setNetWorkPacketCount} />
    );
    // left menu item list
    const leftMenuItems = useMemo(() => ([
        {
            'label': I18N[ENV_LANGUAGE].leftMenu.net,
            'id': 'net',
            'icon': 'pi pi-fw pi-globe',
            'items': [
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.nic,
                    'icon': 'pi pi-fw pi-bolt',
                    'id': 'nic',
                    'items': netCardList,
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                },
                {
                    'label': 'Wifi',
                    'id': 'wifi',
                    'icon': 'pi pi-fw pi-wifi',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                }
            ]
        },
        {
            'label': I18N[ENV_LANGUAGE].leftMenu.os,
            'id': 'os',
            'icon': 'pi pi-fw pi-desktop',
            'items': [
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.os_basis_info,
                    'icon': 'pi pi-fw pi-wifi',
                    'id': 'os_basis_info',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                },
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.process,
                    'icon': 'pi pi-fw pi-wifi',
                    'id': 'process',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                },
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.memory,
                    'icon': 'pi pi-fw pi-wifi',
                    'id': 'memory',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                },
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.cpu,
                    'icon': 'pi pi-fw pi-wifi',
                    'id': 'cpu',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                }
            ]
        },
        {
            'label': I18N[ENV_LANGUAGE].leftMenu.blockchain,
            'icon': 'pi pi-fw pi-link',
            'id': 'blockchain',
            'items': [
            ]
        },
    ]), []);

    // init
    useEffect(() => {
        netCardInit();
        TerminalService.on('command', commandHandler);
        return () => {
            TerminalService.off('command', commandHandler);
        };
    }, []);

    return (
        <div style={{ height: '100%' }}>
            {/* panel area */}
            <Splitter layout="vertical" gutterSize={0} style={{ height: '100%', width: '100%', borderRadius: "0px", border: 'none' }}>
                {/* body area */}
                <SplitterPanel minSize={99} size={99}>
                    <Splitter layout="horizontal" style={{ borderRadius: "0px", border: 'none' }}>
                        {/* left menu */}
                        <SplitterPanel style={{ position: 'relative', overflow: 'auto' }} className="flex align-items-center justify-content-center" minSize={15} size={20} >
                            <LeftMenu leftMenuItems={leftMenuItems} />
                        </SplitterPanel>
                        {/* right area */}
                        <SplitterPanel className="flex align-items-center justify-content-center" minSize={60} size={80}>
                            {rightView}
                        </SplitterPanel>
                    </Splitter >
                </SplitterPanel>
                {/* foot area */}
                <SplitterPanel minSize={1} size={1} style={{ position: 'relative' }}>
                    <Divider style={{ position: 'absolute', top: '1px', margin: '0px 0px', backgroundColor: '#272727', height: '2px' }} />
                    <Foot netCardName={netCardName} netWorkPacketCount={netWorkPacketCount} />
                </SplitterPanel>
            </Splitter>
        </div >
    );
};

export default IndexPage;