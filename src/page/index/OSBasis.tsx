import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { GET_OS_INFO } from "../../comm/command";
import { invoke } from "@tauri-apps/api";
import { isNull } from "../../comm/global";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Chart } from "primereact/chart";

interface Props { }
const OSBasis: React.FC<Props> = ({ }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [infos, setInfos] = useState([
        {
            'totalMemory': ''
        }
    ]);
    const netCardInit = () => {
        invoke(GET_OS_INFO).then((osInfoStr: any) => {
            var osInfo = JSON.parse(osInfoStr);
            if (!isNull(osInfo)) {
                var osInfoArr = [];
                osInfoArr.push(
                    {
                        'totalMemory': osInfo.totalMemory,
                    }
                );
                setInfos([]);
                setInfos(osInfoArr);
            }
        })
    }

    useEffect(() => {
        netCardInit();

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <Splitter layout="vertical">
                <SplitterPanel
                    size={30}
                    minSize={30}
                    className="dataTableBox flex align-items-center justify-content-center"
                    style={{ overflow: 'auto', position: 'relative', width: '100%' }}>
                    <DataTable value={infos} showGridlines scrollable tableStyle={{ minWidth: '50rem' }}>
                        <Column field="totalMemory" header="Total Memory" ></Column>
                    </DataTable>
                </SplitterPanel>
                <SplitterPanel size={70} minSize={70} className="flex align-items-center justify-content-center" >
                    <Splitter layout="horizontal">
                        <SplitterPanel className="flex align-items-center justify-content-center" size={50} style={{ position: 'relative', overflow: 'auto' }}>
                            <Chart type="line" data={chartData} options={chartOptions} />
                        </SplitterPanel>
                        <SplitterPanel className="flex align-items-center justify-content-center" size={50} style={{ position: 'relative', overflow: 'auto' }}>
                            <Chart type="line" data={chartData} options={chartOptions} />
                        </SplitterPanel>
                    </Splitter>
                </SplitterPanel>
            </Splitter>
        </div>
    );
};

export default OSBasis;