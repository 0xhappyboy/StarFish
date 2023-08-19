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
    const netCardInit = () => {
        invoke('get_card_list').then((netCardListStr: any) => {
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
            <i className="pi pi-play" style={{ fontSize: '25px', marginRight: '10px' }}></i>
            <i className="pi pi-stop" style={{ fontSize: '25px', marginRight: '10px' }}></i>
        </React.Fragment>
    );

    const headEndContent = (
        <React.Fragment>
            <i className="pi pi-check" style={{ fontSize: '25px' }}></i>
            <i className="pi pi-check" style={{ fontSize: '25px' }}></i>
            <i className="pi pi-check" style={{ fontSize: '25px' }}></i>
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
                info: 'the network package the network packagethe network packagethe network packagethe network packagethe network packagethe network packagethe network packagethe network packagethe network packagethe network packagethe network packagethe network packagethe network package',
            });
        }
        setDataTable(arr);
    }
    const [dataTable, setDataTable] = useState<dataTableObj[]>([]);
    // bottom tool menu
    const startContent = (
        <React.Fragment>
            <i className="pi pi-github" style={{ marginRight: '20px' }}></i>
            <i className="pi pi-check" style={{ marginRight: '20px' }}></i>
            <i className="pi pi-check" style={{ marginRight: '20px' }}></i>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <i onClick={eventDemo} className="pi pi-check" style={{ marginRight: '20px' }}></i>
            <i onClick={eventDemo} className="pi pi-check" style={{ marginRight: '20px' }}></i>
            <i onClick={eventDemo} className="pi pi-check" style={{ marginRight: '20px' }}></i>
        </React.Fragment>
    );
    // init
    useEffect(() => {
        eventInit();
        netCardInit();

        var aa: Array<any> = [];
        for (var i = 0; i < 50; i++) {
            aa.push({
                'name': "1233124124" + i
            });
            setNetCardList(aa);
        }

        dataTableDataInit();
        return () => {
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
                        <SplitterPanel className="flex align-items-center justify-content-center" minSize={10} size={20} >
                            <ScrollPanel style={{ width: '100%', maxHeight: '500px', height: '300px' }} className="custombar1">
                                <ListBox value={setNetCardList} options={netCardList} optionLabel="name" className="w-full" style={{ border: 'none' }} />
                            </ScrollPanel>
                        </SplitterPanel>
                        {/* right area */}
                        <SplitterPanel className="flex align-items-center justify-content-center" minSize={60} size={80}>
                            <Splitter layout="vertical" >
                                <SplitterPanel size={80} className="flex align-items-center justify-content-center" style={{ overflow: 'auto', position: 'relative', width: '100%' }}>
                                    <DataTable className="style-1" scrollable value={dataTable} size={'small'} selectionMode={'single'} style={{ width: '100%', whiteSpace: 'nowrap', position: 'absolute' }}>
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
                    <Toolbar start={startContent} end={endContent} style={{ border: 'none', borderRadius: '0px', padding: '0px 20x', width: '100%', zIndex: '10' }} />
                </SplitterPanel>
            </Splitter>
        </div >
    );
};

export default IndexPage;