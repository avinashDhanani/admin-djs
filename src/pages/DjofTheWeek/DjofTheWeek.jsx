import React from "react";
import { AdminNav, AllDetails, DjWeekTable } from "../../components";

const DjofTheWeek = () => {
  return (
    <div>
      <AdminNav showDashboard={false} />
      <AllDetails />
      <DjWeekTable />
    </div>
  );
};

export default DjofTheWeek;
