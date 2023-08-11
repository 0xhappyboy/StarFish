import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { Menu } from "primereact/menu";
import { Menubar } from "primereact/menubar";
import { PanelMenu } from "primereact/panelmenu";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useEffect, useState } from "react";

interface Props { }
const IndexPage: React.FC<Props> = ({ }) => {
    // -------------------------- head menu start --------------------------
    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        },

                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    separator: true
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left'
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                },

            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus',

                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archive',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];
    // -------------------------- head menu end --------------------------
    // -------------------------- left menu start --------------------------
    let letMenuItems = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        }
                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left'
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                }
            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archive',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        }
    ];
    // -------------------------- left menu start --------------------------
    // -------------------------- data table start --------------------------
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
        time: String,
        source: String,
        destination: String,
        protocol: String,
        length: number,
        info: String
    };
    const [dataTable, setDataTable] = useState<dataTableObj[]>([]);
    useEffect(() => {
        var arr = [];
        for (var i = 0; i < 100; i++) {
            arr.push({
                index: i,
                time: '2023-8-11',
                source: '127.0.0.1',
                destination: '127.0.0.1 2023-8-11',
                protocol: 'http',
                length: 123,
                info: 'the network package'
            });
        }
        setDataTable(arr);
    }, []);
    // -------------------------- data table end --------------------------
    // -------------------------- network packet info start --------------------------
    let networkPacketInfo = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        }
                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left'
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                }
            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archive',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        }
    ];
    // -------------------------- network packet info end --------------------------
    return (
        <div style={{ overflow: 'hidden',fontSize: '11px',borderRadius: '0px' }}>
            {/* head menu */}
            <Menubar className="w-full" model={items} style={{ height: '5%', borderRadius: "0px" }} />
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
            <Splitter style={{ position: 'absolute', height: '90%',width:'100%', borderRadius: "0px" }}>
                {/* left menu */}
                <SplitterPanel className="flex align-items-center justify-content-center" minSize={10} size={10}>
                    <PanelMenu model={letMenuItems} className="w-full" />
                </SplitterPanel>
                {/* right area */}
                <SplitterPanel className="flex align-items-center justify-content-center">
                    <Splitter layout="vertical">
                        <SplitterPanel className="flex align-items-center justify-content-center" style={{ overflow: 'auto' }}>
                            <DataTable value={dataTable}>
                                {dataTableColumns.map((col, i) => (<Column key={col.field} field={col.field} header={col.header} />))}
                            </DataTable>
                        </SplitterPanel>
                        <SplitterPanel className="flex align-items-center justify-content-center" >
                            <Splitter layout="horizontal">
                                <SplitterPanel className="flex align-items-center justify-content-center" >
                                    {/* network packet info */}
                                    <PanelMenu model={networkPacketInfo} className="w-full" style={{ overflow: 'auto' }}/>
                                </SplitterPanel>
                                <SplitterPanel className="flex align-items-center justify-content-center" >bbb</SplitterPanel>
                            </Splitter>
                        </SplitterPanel>
                    </Splitter>
                </SplitterPanel>
            </Splitter>
        </div>
    );
};

export default IndexPage;