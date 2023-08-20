import { Tag } from "primereact/tag";

// net packet data table columns
export var NetPacketDataTableColumns: Array<any> = [
    { field: 'source', header: 'Source' },
    { field: 'destination', header: 'Destination' },
    { field: 'protocol', header: 'Protocol' },
    { field: 'size', header: 'Size' },
    { field: 'info', header: 'Info' },
];

// net packet data table item
export type NetPacketDataTableItem = {
    protocol: any,
    source: String,
    destination: String,
    size: number,
    info: any,
    data: any,
};