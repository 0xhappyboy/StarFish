import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useEffect, useState } from "react";
import { TerminalService } from 'primereact/terminalservice';
import { Badge } from "primereact/badge";
import { ScrollPanel } from "primereact/scrollpanel";
import { ListBox } from "primereact/listbox";
import React from "react";
import { Toolbar } from "primereact/toolbar";
import "../css/page/index-page.css";
import { listen } from "@tauri-apps/api/event";
import { DEMO, NetCardList } from "../comm/constant";
import { appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api";
import { isNull } from "../comm/global";
import { Divider } from "primereact/divider";

interface Props { }
const IndexPage: React.FC<Props> = ({ }) => {
    //  net card list
    const [netCardList, setNetCardList] = useState<Array<any>>([]);
    // event init
    const eventInit = () => {
        invoke('init_process');
    }
    // event listen init
    var netCardArr: Array<any> = [];
    const listenInitEvent = async () => {
        // listen net carlist
        await listen(NetCardList, (event) => {
            var netCards = JSON.parse(String(event.payload));
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
            <i className="pi pi-check mr-10" style={{ fontSize: '25px' }}></i>
            <i className="pi pi-check mr-10" style={{ fontSize: '25px' }}></i>
            <i className="pi pi-check mr-10" style={{ fontSize: '25px' }}></i>
        </React.Fragment>
    );

    const headEndContent = (
        <React.Fragment>
            <i className="pi pi-check mr-10" style={{ fontSize: '25px' }}></i>
            <i className="pi pi-check mr-10" style={{ fontSize: '25px' }}></i>
            <i className="pi pi-check mr-10" style={{ fontSize: '25px' }}></i>
        </React.Fragment>
    );

    // data table colums
    const [dataTableColumns, setDataTableColumns] = useState([
        { field: 'index', header: 'Index' },
        { field: 'time', header: 'Time' },
        { field: 'source', header: 'Source' },
        { field: 'destination', header: 'Destination' },
        { field: 'protocol', header: 'Protocol' },
        { field: 'length', header: 'Length' },
        { field: 'info', header: 'Info' },
    ]);
    // data table data
    type dataTableObj = {
        index: number,
        time: any,
        source: String,
        destination: String,
        protocol: String,
        length: number,
        info: String
    };
    const dataTableDataInit = () => {
        var arr = [];
        for (var i = 0; i < 1; i++) {
            arr.push({
                index: i,
                time: <Badge value="2"></Badge>,
                source: '127.0.0.1',
                destination: '127.0.0.1 2023-8-11',
                protocol: 'http',
                length: 123,
                info: 'the network package  InfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfoInfo',
            });
        }
        setDataTable(arr);
    }
    const [dataTable, setDataTable] = useState<dataTableObj[]>([]);
    //  network packet info
    let networkPacketInfo = [
        {
            key: '0',
            label: 'Documents',
            data: 'Documents Folder',
            icon: 'pi pi-fw pi-inbox',
            children: [
                {
                    key: '0-0',
                    label: 'Work',
                    data: 'Work Folder',
                    icon: 'pi pi-fw pi-cog',
                    children: [
                        { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                        { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
                    ]
                },
                {
                    key: '0-1',
                    label: 'Home',
                    data: 'Home Folder',
                    icon: 'pi pi-fw pi-home',
                    children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
                }
            ]
        },
        {
            key: '1',
            label: 'Events',
            data: 'Events Folder',
            icon: 'pi pi-fw pi-calendar',
            children: [
                { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
                { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
                { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
            ]
        },
        {
            key: '2',
            label: 'Movies',
            data: 'Movies Folder',
            icon: 'pi pi-fw pi-star-fill',
            children: [
                {
                    key: '2-0',
                    icon: 'pi pi-fw pi-star-fill',
                    label: 'Al Pacino',
                    data: 'Pacino Movies',
                    children: [
                        { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
                        { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
                    ]
                },
                {
                    key: '2-1',
                    label: 'Robert De Niro',
                    icon: 'pi pi-fw pi-star-fill',
                    data: 'De Niro Movies',
                    children: [
                        { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
                        { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' }
                    ]
                }
            ]
        }
    ];
    //  network packet info 
    //  terminal service config 
    const prompt = '$';
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
    // bottom tool menu
    const startContent = (
        <React.Fragment>
            <i className="pi pi-github mr-10"></i>
            <i className="pi pi-check mr-10"></i>
            <i className="pi pi-check mr-10"></i>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <i onClick={eventDemo} className="pi pi-check mr-10"></i>
            <i onClick={eventDemo} className="pi pi-check mr-10"></i>
            <i onClick={eventDemo} className="pi pi-check mr-10"></i>
        </React.Fragment>
    );
    // init
    useEffect(() => {
        eventInit();
        listenInitEvent();
        dataTableDataInit();
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
                <SplitterPanel minSize={5} size={5} style={{ position: 'relative' }}>
                    {/* head tool bar */}
                    <Toolbar start={headStartContent} end={headEndContent} style={{ border: 'none', borderRadius: '0px', width: '100%', height: '5%', padding: 'padding: 10px 20px' }} />
                    <Divider style={{ position: 'absolute', bottom: '1px', margin: '0px 0px' }} />
                </SplitterPanel>
                {/* body area */}
                <SplitterPanel minSize={90} size={90}>
                    <Splitter layout="horizontal" style={{ borderRadius: "0px", border: 'none' }}>
                        {/* left menu */}
                        <SplitterPanel className="flex align-items-center justify-content-center" minSize={10} size={20}>
                            <ScrollPanel style={{ width: '100%',maxHeight:'200px' }} className="custombar1">
                                <ListBox value={setNetCardList} options={netCardList} optionLabel="name" className="w-full" style={{ border: 'none' }} />
                            </ScrollPanel>
                        </SplitterPanel>
                        {/* right area */}
                        <SplitterPanel className="flex align-items-center justify-content-center" minSize={60} size={80}>
                            <Splitter layout="vertical">
                                <SplitterPanel size={80} className="flex align-items-center justify-content-center" style={{ overflow: 'auto', position: 'relative' }}>
                                    <DataTable className="style-1" scrollable value={dataTable} size={'small'} selectionMode={'single'} style={{ whiteSpace: 'nowrap', position: 'absolute' }}>
                                        {dataTableColumns.map((col, i) => (<Column align={'center'} key={col.field} field={col.field} header={col.header} />))}
                                    </DataTable>
                                </SplitterPanel>
                                <SplitterPanel size={20} className="flex align-items-center justify-content-center" >
                                    <Splitter layout="horizontal">
                                        <SplitterPanel className="flex align-items-center justify-content-center" size={50} >
                                            {/* network packet info */}
                                            <ScrollPanel style={{ height: '100%', border: 'none', padding: '0px', position: 'static', overflow: 'auto', maxHeight: '300px' }} >
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
                <SplitterPanel minSize={5} size={5} style={{ position: 'relative' }}>
                    {/* bottom bar */}
                    <Toolbar start={startContent} end={endContent} style={{ border: 'none', borderRadius: '0px', padding: '0px 10px', bottom: '0px', height: '4%', width: '100%', zIndex: '10' }} />
                </SplitterPanel>
            </Splitter>


            {/* input box */}
            {/* <div className="card flex justify-content-center w-full" style={{ height: "4%", borderRadius: "0px" }}>
                <div className="p-inputgroup w-full" style={{ borderRadius: "0px" }}>
                    <span className="p-inputgroup-addon" style={{ borderRadius: "0px" }}>
                        <i className="pi pi-star-fill"></i>
                    </span>
                    <InputNumber placeholder="Price" style={{ borderRadius: "0px" }} />
                    <span className="p-inputgroup-addon" style={{ borderRadius: "0px" }}></span>
                    <span className="p-inputgroup-addon" style={{ borderRadius: "0px" }}></span>
                </div>
            </div> */}
            {/* bottom bar */}
            {/* <Toolbar start={startContent} end={endContent} style={{ border: 'none', borderRadius: '0px', padding: '0px 10px', bottom: '0px', height: '4%', width: '100%', zIndex: '10' }} /> */}
        </div >
    );
};

export default IndexPage;