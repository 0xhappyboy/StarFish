import { Box, Typography } from "@mui/material";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Terminal } from "primereact/terminal";
import React from "react";
interface Props {
    setDataTableScrollHeight: any,
    dataTableRowClickEvent: any,
    netPacketDataTableItemList: any,
    sourceColumnBody: any,
    destinationColumnBody: any,
    protocolEleColumnBody: any,
    sizeColumnBody: any,
    infoColumnBody: any
}
const NetPacket: React.FC<Props> = ({ setDataTableScrollHeight, dataTableRowClickEvent, netPacketDataTableItemList, sourceColumnBody, destinationColumnBody, protocolEleColumnBody, sizeColumnBody, infoColumnBody }) => {
    return (
        <>
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
        </>
    );
};

export default NetPacket;


