import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { Menubar } from "primereact/menubar";
import { PanelMenu } from "primereact/panelmenu";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useEffect, useState } from "react";
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import { Badge } from "primereact/badge";
import { ScrollPanel } from "primereact/scrollpanel";
import { ListBox } from "primereact/listbox";
import { Tree } from "primereact/tree";
import React from "react";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Toolbar } from "primereact/toolbar";
import { Accordion, AccordionTab } from "primereact/accordion";

interface Props { }
const IndexPage: React.FC<Props> = ({ }) => {
    // head tool menu
    const headStartContent = (
        <React.Fragment>
            <i className="pi pi-check mr-10" style={{ fontSize: '35px' }}></i>
            <i className="pi pi-check mr-10" style={{ fontSize: '35px' }}></i>
            <i className="pi pi-check mr-10" style={{ fontSize: '35px' }}></i>
        </React.Fragment>
    );

    const headEndContent = (
        <React.Fragment>
            <i className="pi pi-check mr-10" style={{ fontSize: '35px' }}></i>
            <i className="pi pi-check mr-10" style={{ fontSize: '35px' }}></i>
            <i className="pi pi-check mr-10" style={{ fontSize: '35px' }}></i>
        </React.Fragment>
    );
    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];
    //  left menu
    const [leftMenuItems, setLeftMenuItems] = useState([
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ]);

    // data table colums
    const [dataTableColumns, setDataTableColumns] = useState([
        { field: 'index', header: 'Index' },
        { field: 'time', header: 'Time' },
        { field: 'source', header: 'Source' },
        { field: 'destination', header: 'Destination' },
        { field: 'protocol', header: 'Protocol' },
        { field: 'length', header: 'Length' },
        { field: 'info', header: 'Info' },
        { field: 'info1', header: 'Info' },
        { field: 'info2', header: 'Info' },
        { field: 'info3', header: 'Info' },
        { field: 'info4', header: 'Info' },
        { field: 'info5', header: 'Info' },
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
        for (var i = 0; i < 100; i++) {
            arr.push({
                index: i,
                time: <Badge value="2"></Badge>,
                source: '127.0.0.1',
                destination: '127.0.0.1 2023-8-11',
                protocol: 'http',
                length: 123,
                info: 'the network package the network package the network package the network package the network package the network package the network package',
                info1: 'the network package',
                info2: 'the network package',
                info3: 'the network package',
                info4: 'the network package',
                info5: 'the network package'
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
            <i className="pi pi-check mr-10"></i>
            <i className="pi pi-check mr-10"></i>
            <i className="pi pi-check mr-10"></i>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <i className="pi pi-check mr-10"></i>
            <i className="pi pi-check mr-10"></i>
            <i className="pi pi-check mr-10"></i>
        </React.Fragment>
    );
    // init
    useEffect(() => {
        dataTableDataInit();
        TerminalService.on('command', commandHandler);
        return () => {
            TerminalService.off('command', commandHandler);
        };
    }, []);
    return (
        <div style={{ overflow: 'hidden', fontSize: '11px', borderRadius: '0px' }}>
            {/* head tool bar */}
            <Toolbar start={headStartContent} end={headEndContent} style={{ border: 'none', borderRadius: '0px', width: '100%', height: '5%', padding: 'padding: 10px 20px' }} />
            {/* input box */}
            <div className="card flex justify-content-center w-full" style={{ height: "1%", borderRadius: "0px" }}>
                <div className="p-inputgroup w-full" style={{ borderRadius: "0px" }}>
                    <span className="p-inputgroup-addon" style={{ borderRadius: "0px" }}>
                        <i className="pi pi-star-fill"></i>
                    </span>
                    <InputNumber placeholder="Price" style={{ borderRadius: "0px" }} />
                    <span className="p-inputgroup-addon" style={{ borderRadius: "0px" }}></span>
                    <span className="p-inputgroup-addon" style={{ borderRadius: "0px" }}></span>
                </div>
            </div>
            {/* panel area */}
            <Splitter style={{ position: 'absolute', height: '80%', width: '100%', borderRadius: "0px" }}>
                {/* left menu */}
                <SplitterPanel className="flex align-items-center justify-content-center" minSize={10} size={20}>
                    <ListBox value={setLeftMenuItems} options={leftMenuItems} optionLabel="name" className="w-full" style={{ border: 'none' }} />
                </SplitterPanel>
                {/* right area */}
                <SplitterPanel className="flex align-items-center justify-content-center" minSize={70} size={80}>
                    <Splitter layout="vertical">
                        <SplitterPanel minSize={50} size={80} className="flex align-items-center justify-content-center" style={{ overflow: 'auto' }}>
                            <DataTable value={dataTable} size={'small'} selectionMode={'single'} style={{ whiteSpace: 'nowrap' }}>
                                {dataTableColumns.map((col, i) => (<Column align={'center'} key={col.field} field={col.field} header={col.header} />))}
                            </DataTable>
                        </SplitterPanel>
                        <SplitterPanel minSize={10} size={20} className="flex align-items-center justify-content-center" >
                            <Splitter layout="horizontal">
                                <SplitterPanel className="flex align-items-center justify-content-center">
                                    {/* network packet info */}
                                    <ScrollPanel style={{ width: '100%', height: '100%', border: 'none', padding: '0px', position: 'static', overflow: 'auto', maxHeight: '300px' }} >
                                        <Accordion multiple activeIndex={[0]}>
                                            <AccordionTab header="Header I">
                                                <p className="m-0">
                                                    Test
                                                </p>
                                            </AccordionTab>
                                            <AccordionTab header="Header II">
                                                <p className="m-0">
                                                    Test
                                                </p>
                                            </AccordionTab>
                                            <AccordionTab header="Header III">
                                                <p className="m-0">
                                                    Test
                                                </p>
                                            </AccordionTab>
                                        </Accordion>
                                    </ScrollPanel>
                                </SplitterPanel>
                                <SplitterPanel className="flex align-items-center justify-content-center" >
                                    <ScrollPanel style={{ width: '100%', height: 'auto', minHeight: '100px', border: 'none', padding: '0px', maxHeight: '328px' }} >
                                        <Terminal style={{ border: 'none', height: 'auto', minHeight: '100px', maxHeight: '228px' }} welcomeMessage="Welcome to StarFish" prompt={prompt} />
                                    </ScrollPanel>
                                </SplitterPanel>
                            </Splitter>
                        </SplitterPanel>
                    </Splitter>
                </SplitterPanel>
            </Splitter >
            {/* bottom bar */}
            <Toolbar start={startContent} end={endContent} style={{ border: 'none', borderRadius: '0px', padding: '0px 10px', position: 'absolute', bottom: '0px', height:'4%', width: '100%', zIndex: '10' }} />
        </div >
    );
};

export default IndexPage;