import React from "react";
import { AdminNav,AllDetails, UserTable } from "../../components";

const AdminDashboard = () => {
    return (
        <div>
            <AdminNav showDashboard={false}/>
            <AllDetails/>
            <UserTable/>
        </div>
    );
}

export default AdminDashboard;