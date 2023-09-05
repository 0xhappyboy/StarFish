import React, { useEffect, useMemo, useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { GET_NET_CARD_LIST } from "../../comm/command";
import { invoke } from "@tauri-apps/api";
import { isNull } from "../../comm/global";
import { ENV_LANGUAGE } from "../../comm/env";
import { I18N } from "../../comm/i18n";

interface Props { switchRightView: any }
const LeftMenu: React.FC<Props> = ({ switchRightView }) => {
    // net card list
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
                            switchRightView(event);
                        }
                    });
                });
            }
        })
    }

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
                    'items': netCardArr,
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                },
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.tool,
                    'id': 'tool',
                    'icon': 'pi pi-fw pi-wrench',
                    'items': [
                        {
                            'label': I18N[ENV_LANGUAGE].leftMenu.api,
                            'icon': 'pi pi-fw pi-cloud',
                            'id': 'api',
                            'command': (event: any) => {
                                switchRightView(event);
                            }
                        },
                        {
                            'label': I18N[ENV_LANGUAGE].leftMenu.downloader,
                            'icon': 'pi pi-fw pi-download',
                            'id': 'downloader',
                            'command': (event: any) => {
                                switchRightView(event);
                            }
                        },
                    ]
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
                    'icon': 'pi pi-fw pi-table',
                    'id': 'os_basis_info',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                },
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.process,
                    'icon': 'pi pi-fw pi-server',
                    'id': 'process',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                },
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.memory,
                    'icon': 'pi pi-fw pi-chart-pie',
                    'id': 'memory',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                },
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.cpu,
                    'icon': 'pi pi-fw pi-ticket',
                    'id': 'cpu',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                }
            ]
        },
        {
            'label': I18N[ENV_LANGUAGE].leftMenu.file_system,
            'icon': 'pi pi-fw pi-folder-open',
            'id': 'file_system',
            'items': [
                {
                    'label': I18N[ENV_LANGUAGE].leftMenu.disk,
                    'icon': 'pi pi-fw pi-database',
                    'id': 'disk',
                    'command': (event: any) => {
                        switchRightView(event);
                    }
                },
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

    useEffect(() => { netCardInit(); }, []);
    return (
        <>
            <PanelMenu multiple model={leftMenuItems} className="w-full md:w-25rem" style={{ position: 'absolute' }} />
        </>
    );
};

function arePropsEqual(prevProps: any, nextProps: any) {
    return prevProps === nextProps;
}

export default React.memo(LeftMenu, arePropsEqual);


