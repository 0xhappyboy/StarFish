import { Splitter, SplitterPanel } from "primereact/splitter";
import { useEffect, useState } from "react";
import React from "react";
import { Divider } from "primereact/divider";
import { TerminalService } from 'primereact/terminalservice';
import NetPacketDataTable from "./NetPacketDataTable";
import Foot from "./Foot";
import LeftMenu from "./LeftMenu";
import Memory from "./Memory";
import Cpu from "./Cpu";
import Process from "./Process";
import OSBasis from "./OSBasis";
import Api from "./Api";

interface Props { }
const IndexPage: React.FC<Props> = ({ }) => {
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
        } else if (e.item.id == 'api') {
            setRightView(<Api />);
        }
    }
    // right view
    const [rightView, setRightView] = useState(
        <NetPacketDataTable setNetCardName={setNetCardName} setNetWorkPacketCount={setNetWorkPacketCount} />
    );

    // init
    useEffect(() => {
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
                            <LeftMenu switchRightView={switchRightView} />
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