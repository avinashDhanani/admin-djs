import React from "react";
import { AdminNav,AllDetails, DjTable } from "../../components";

const DjDashboard = () => {
    return (
        <div>
            <AdminNav showDashboard={false}/>
            <AllDetails/>
            <DjTable/>
        </div>
    )
}

export default DjDashboard