import React, { useEffect } from "react";
import { PanelMenu } from "primereact/panelmenu";

interface Props { leftMenuItems: any }
const LeftMenu: React.FC<Props> = ({ leftMenuItems }) => {
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


