import React from "react";
import { AdminNav,AllDetails, BookingTable } from "../../components";

const BookingDashboard = () => {
    return (
        <div>
            <AdminNav showDashboard={false}/>
            <AllDetails/>
            <BookingTable/>
        </div>
    );
}

export default BookingDashboard;