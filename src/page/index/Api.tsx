import { Stack, Typography } from "@mui/material";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { SplitButton } from "primereact/splitbutton";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useRef, useState } from "react";
import { ENV_LANGUAGE } from "../../comm/env";
import { I18N } from "../../comm/i18n";
import "../../css/page/api-page.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Props { }
const Api: React.FC<Props> = ({ }) => {
    // head tool menu
    const headStartContent = (
        <React.Fragment>
            <Typography variant="subtitle1" gutterBottom>https://github.com/</Typography>
        </React.Fragment>
    );
    const headEndContent = (
        <React.Fragment>
        </React.Fragment>
    );

    //const router = useRouter();
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://reactjs.org/';
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                //router.push('/fileupload');
            }
        }
    ];

    const [loading, setLoading] = useState(false);

    const save = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const [value1, setValue1] = useState(42723);
    const [value2, setValue2] = useState(58151);
    const [value3, setValue3] = useState(2351.35);
    const [value4, setValue4] = useState(50);

    const [value, setValue] = useState(null);
    const justifyOptions = [
        { icon: 'pi pi-align-left', value: 'left' },
        { icon: 'pi pi-align-right', value: 'Right' },
        { icon: 'pi pi-align-center', value: 'Center' },
        { icon: 'pi pi-align-justify', value: 'Justify' }
    ];
    const justifyTemplate = (option: any) => {
        return <i className={option.icon}></i>;
    }
    // response
    const [responseView, setResponseView] = useState(<Typography variant="subtitle1" gutterBottom>Response</Typography>);

    const [products, setProducts] = useState([
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Black Watch',
            description: 'Product Description',
            image: 'black-watch.jpg',
            price: 72,
            category: 'Accessories',
            quantity: 61,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'Blue Band',
            description: 'Product Description',
            image: 'blue-band.jpg',
            price: 79,
            category: 'Fitness',
            quantity: 2,
            inventoryStatus: 'LOWSTOCK',
            rating: 3
        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Blue T-Shirt',
            description: 'Product Description',
            image: 'blue-t-shirt.jpg',
            price: 29,
            category: 'Clothing',
            quantity: 25,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1004',
            code: 'h456wer53',
            name: 'Bracelet',
            description: 'Product Description',
            image: 'bracelet.jpg',
            price: 15,
            category: 'Accessories',
            quantity: 73,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1005',
            code: 'av2231fwg',
            name: 'Brown Purse',
            description: 'Product Description',
            image: 'brown-purse.jpg',
            price: 120,
            category: 'Accessories',
            quantity: 0,
            inventoryStatus: 'OUTOFSTOCK',
            rating: 4
        },
        {
            id: '1006',
            code: 'bib36pfvm',
            name: 'Chakra Bracelet',
            description: 'Product Description',
            image: 'chakra-bracelet.jpg',
            price: 32,
            category: 'Accessories',
            quantity: 5,
            inventoryStatus: 'LOWSTOCK',
            rating: 3
        },
        {
            id: '1007',
            code: 'mbvjkgip5',
            name: 'Galaxy Earrings',
            description: 'Product Description',
            image: 'galaxy-earrings.jpg',
            price: 34,
            category: 'Accessories',
            quantity: 23,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1008',
            code: 'vbb124btr',
            name: 'Game Controller',
            description: 'Product Description',
            image: 'game-controller.jpg',
            price: 99,
            category: 'Electronics',
            quantity: 2,
            inventoryStatus: 'LOWSTOCK',
            rating: 4
        },
        {
            id: '1009',
            code: 'cm230f032',
            name: 'Gaming Set',
            description: 'Product Description',
            image: 'gaming-set.jpg',
            price: 299,
            category: 'Electronics',
            quantity: 63,
            inventoryStatus: 'INSTOCK',
            rating: 3
        },
        {
            id: '1010',
            code: 'plb34234v',
            name: 'Gold Phone Case',
            description: 'Product Description',
            image: 'gold-phone-case.jpg',
            price: 24,
            category: 'Accessories',
            quantity: 0,
            inventoryStatus: 'OUTOFSTOCK',
            rating: 4
        },
        {
            id: '1011',
            code: '4920nnc2d',
            name: 'Green Earbuds',
            description: 'Product Description',
            image: 'green-earbuds.jpg',
            price: 89,
            category: 'Electronics',
            quantity: 23,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1012',
            code: '250vm23cc',
            name: 'Green T-Shirt',
            description: 'Product Description',
            image: 'green-t-shirt.jpg',
            price: 49,
            category: 'Clothing',
            quantity: 74,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1013',
            code: 'fldsmn31b',
            name: 'Grey T-Shirt',
            description: 'Product Description',
            image: 'grey-t-shirt.jpg',
            price: 48,
            category: 'Clothing',
            quantity: 0,
            inventoryStatus: 'OUTOFSTOCK',
            rating: 3
        },
        {
            id: '1014',
            code: 'waas1x2as',
            name: 'Headphones',
            description: 'Product Description',
            image: 'headphones.jpg',
            price: 175,
            category: 'Electronics',
            quantity: 8,
            inventoryStatus: 'LOWSTOCK',
            rating: 5
        },
        {
            id: '1015',
            code: 'vb34btbg5',
            name: 'Light Green T-Shirt',
            description: 'Product Description',
            image: 'light-green-t-shirt.jpg',
            price: 49,
            category: 'Clothing',
            quantity: 34,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1016',
            code: 'k8l6j58jl',
            name: 'Lime Band',
            description: 'Product Description',
            image: 'lime-band.jpg',
            price: 79,
            category: 'Fitness',
            quantity: 12,
            inventoryStatus: 'INSTOCK',
            rating: 3
        },
        {
            id: '1017',
            code: 'v435nn85n',
            name: 'Mini Speakers',
            description: 'Product Description',
            image: 'mini-speakers.jpg',
            price: 85,
            category: 'Clothing',
            quantity: 42,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1018',
            code: '09zx9c0zc',
            name: 'Painted Phone Case',
            description: 'Product Description',
            image: 'painted-phone-case.jpg',
            price: 56,
            category: 'Accessories',
            quantity: 41,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1019',
            code: 'mnb5mb2m5',
            name: 'Pink Band',
            description: 'Product Description',
            image: 'pink-band.jpg',
            price: 79,
            category: 'Fitness',
            quantity: 63,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1020',
            code: 'r23fwf2w3',
            name: 'Pink Purse',
            description: 'Product Description',
            image: 'pink-purse.jpg',
            price: 110,
            category: 'Accessories',
            quantity: 0,
            inventoryStatus: 'OUTOFSTOCK',
            rating: 4
        },
        {
            id: '1021',
            code: 'pxpzczo23',
            name: 'Purple Band',
            description: 'Product Description',
            image: 'purple-band.jpg',
            price: 79,
            category: 'Fitness',
            quantity: 6,
            inventoryStatus: 'LOWSTOCK',
            rating: 3
        },
        {
            id: '1022',
            code: '2c42cb5cb',
            name: 'Purple Gemstone Necklace',
            description: 'Product Description',
            image: 'purple-gemstone-necklace.jpg',
            price: 45,
            category: 'Accessories',
            quantity: 62,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1023',
            code: '5k43kkk23',
            name: 'Purple T-Shirt',
            description: 'Product Description',
            image: 'purple-t-shirt.jpg',
            price: 49,
            category: 'Clothing',
            quantity: 2,
            inventoryStatus: 'LOWSTOCK',
            rating: 5
        },
        {
            id: '1024',
            code: 'lm2tny2k4',
            name: 'Shoes',
            description: 'Product Description',
            image: 'shoes.jpg',
            price: 64,
            category: 'Clothing',
            quantity: 0,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1025',
            code: 'nbm5mv45n',
            name: 'Sneakers',
            description: 'Product Description',
            image: 'sneakers.jpg',
            price: 78,
            category: 'Clothing',
            quantity: 52,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1026',
            code: 'zx23zc42c',
            name: 'Teal T-Shirt',
            description: 'Product Description',
            image: 'teal-t-shirt.jpg',
            price: 49,
            category: 'Clothing',
            quantity: 3,
            inventoryStatus: 'LOWSTOCK',
            rating: 3
        },
        {
            id: '1027',
            code: 'acvx872gc',
            name: 'Yellow Earbuds',
            description: 'Product Description',
            image: 'yellow-earbuds.jpg',
            price: 89,
            category: 'Electronics',
            quantity: 35,
            inventoryStatus: 'INSTOCK',
            rating: 3
        },
        {
            id: '1028',
            code: 'tx125ck42',
            name: 'Yoga Mat',
            description: 'Product Description',
            image: 'yoga-mat.jpg',
            price: 20,
            category: 'Fitness',
            quantity: 15,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1029',
            code: 'gwuby345v',
            name: 'Yoga Set',
            description: 'Product Description',
            image: 'yoga-set.jpg',
            price: 20,
            category: 'Fitness',
            quantity: 25,
            inventoryStatus: 'INSTOCK',
            rating: 8
        }
    ]);

    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];
    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} columnKey={col.field} field={col.field} header={col.header} />;
    });

    return (
        <>
            <Splitter layout="vertical" style={{ height: '100%', width: '100%', borderRadius: "0px", border: 'none' }}>
                <SplitterPanel minSize={10} size={70}>
                    <Stack direction="column" spacing={2} style={{ width: '100%' }}>
                        <Toolbar start={headStartContent} end={headEndContent} style={{ width: '100%', border: 'none', borderRadius: '0px', padding: 'padding: 0px 20px' }} />
                        <div className="p-inputgroup" style={{ marginTop: "0px" }}>
                            <Button label="Search" />
                            <InputText placeholder="Keyword" />
                            <div className="card flex justify-content-center">
                                <SplitButton label="Save" style={{ height: '100%' }} onClick={save} model={items} />
                            </div>
                        </div>
                        <TabView>
                            <TabPanel header={I18N[ENV_LANGUAGE].apiPage.params} style={{ borderBottomWidth: '0px', padding: '0px', overflow: 'hidden' }}>

                                <DataTable value={products} reorderableColumns reorderableRows onRowReorder={(e) => setProducts(e.value)} tableStyle={{ minWidth: '50rem' }} style={{ overflow: 'auto', height: '400px' }}>
                                    <Column rowReorder style={{ width: '3rem' }} />
                                    {dynamicColumns}
                                </DataTable>

                            </TabPanel>
                            <TabPanel header={I18N[ENV_LANGUAGE].apiPage.reqHeaders} style={{ borderBottomWidth: '0px', padding: '0px' }}>
                                <p className="m-0">
                                </p>
                            </TabPanel>
                            <TabPanel header={I18N[ENV_LANGUAGE].apiPage.reqBody} style={{ borderBottomWidth: '0px', padding: '0px' }}>
                                <p className="m-0">
                                </p>
                            </TabPanel>
                        </TabView>
                    </Stack>
                </SplitterPanel>
                <SplitterPanel minSize={10} size={30}>
                    <Stack direction="column" spacing={2} style={{ width: '100%' }}>
                        <TabView style={{ padding: '0px' }}>
                            <TabPanel header={I18N[ENV_LANGUAGE].apiPage.resBody} style={{ borderBottomWidth: '0px', padding: '0px' }}>
                                <SelectButton value={value} onChange={(e) => setValue(e.value)} itemTemplate={justifyTemplate} optionLabel="value" options={justifyOptions} />
                                <p className="m-0">
                                </p>
                            </TabPanel>
                            <TabPanel header={I18N[ENV_LANGUAGE].apiPage.cookie} style={{ borderBottomWidth: '0px', padding: '0px' }}>
                                <p className="m-0">
                                </p>
                            </TabPanel>
                            <TabPanel header={I18N[ENV_LANGUAGE].apiPage.resHeaders} style={{ borderBottomWidth: '0px', padding: '0px' }}>
                                <p className="m-0">
                                </p>
                            </TabPanel>
                        </TabView>
                    </Stack>
                </SplitterPanel>
            </Splitter>
        </>
    );
};

export default Api;


