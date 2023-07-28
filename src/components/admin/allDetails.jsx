import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { USER_COUNT_URL, GET_BOOKING_COUNT } from "../../constant/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { da } from "date-fns/locale";

const AllDetails = (props) => {
  const [data, setData] = useState({
    TotalUser: -1,
    TotalDj: -1,
    TotalRevenue: 6780,
    TotalBooking: -1,
  });
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchData = async (LINK) => {
    try {
      const data = await axios.get(LINK, {
        headers: { Authorization: `Bearer ${user.data.token}` },
      });
      return data.data;
    } catch (err) {}
  };

  useEffect(() => {
    fetchData(USER_COUNT_URL)
      .then((res) => {
        try {
          const response = res.data.count[0];
          const { TotalDj, TotalUser } = response;
          setData((prev) => ({ ...prev, TotalDj, TotalUser }));
        } catch (err) {}
      })
      .catch();

    fetchData(GET_BOOKING_COUNT)
      .then((res) => {
        try {
          const response = res.data.count[0];
          const TotalBooking =
            Number(response.Accepted) +
            Number(response.Pending) +
            Number(response.Decline);
          setData((prev) => ({ ...prev, TotalBooking }));
        } catch (err) {}
      })
      .catch();
  }, []);

  return (
    <div className="w-[90%] mx-auto max-2md:w-[85%]">
      <div className="admin-dashboard flex flex-wrap justify-between mt-24 mb-20 max-xl:justify-evenly max-2md:justify-center">
        <div
          onClick={() => navigate("/admin-dashboard")}
          className={`group max-2md:mb-6 mb-4 w-auto max-2md:w-[80%] max-2md:px-2 px-[40px] flex flex-col 
            shadow-item-shadow rounded-2xl items-center h-[140px] w-[290px] hover:border-2 hover:cursor-pointer hover:border-blue-light`}
        >
          <h1 className="text-[23px] max-2md:text-[20px] max-2md:ml-4 mt-6 font-inter font-[500] group-hover:text-blue-light">
            Total Users
          </h1>
          <p className="mb-[32px] text-[2.5em]  w-[max-content] max-2md:ml-4 font-inter font-[600] group-hover:text-blue-light">
            {data.TotalUser === -1 ? <ClipLoader /> : data.TotalUser}
          </p>
        </div>
        <div
          onClick={() => navigate("/admin-dashboard/djs")}
          className={`group max-2md:mb-6 mb-4 w-auto max-2md:w-[80%] max-2md:px-2 px-[40px] flex flex-col 
            shadow-item-shadow rounded-2xl items-center h-[140px] w-[290px] hover:border-2 hover:cursor-pointer hover:border-blue-light`}
        >
          <h1 className="text-[23px] max-2md:text-[20px] max-2md:ml-4 mt-6 font-inter font-[500] group-hover:text-blue-light">
            Total Djs
          </h1>
          <p className="mb-[32px] text-[2.5em]  w-[max-content] max-2md:ml-4 font-inter font-[600] group-hover:text-blue-light">
            {data.TotalDj === -1 ? <ClipLoader /> : data.TotalDj}
          </p>
        </div>
        <div
          onClick={() => navigate("/admin-dashboard/revenue")}
          className={`group max-2md:mb-6 mb-4 w-auto max-2md:w-[80%] max-2md:px-2 px-[40px] flex flex-col 
            shadow-item-shadow rounded-2xl items-center h-[140px] w-[290px] hover:border-2 hover:cursor-pointer hover:border-blue-light`}
        >
          <h1 className="text-[23px] max-2md:text-[20px] max-2md:ml-4 mt-6 font-inter font-[500] group-hover:text-blue-light">
            Total Revenue
          </h1>
          <p className="mb-[32px] text-[2.5em]  w-[max-content] max-2md:ml-4 font-inter font-[600] group-hover:text-blue-light">
            $ {data.TotalBooking === -1 ? <ClipLoader /> : data.TotalRevenue}
          </p>
        </div>
        <div
          onClick={() => navigate("/admin-dashboard/bookings")}
          className={`group max-2md:mb-6 mb-4 w-auto max-2md:w-[80%] max-2md:px-2 px-[40px] flex flex-col 
            shadow-item-shadow rounded-2xl items-center h-[140px] w-[290px] hover:border-2 hover:cursor-pointer hover:border-blue-light`}
        >
          <h1 className="text-[23px] max-2md:text-[20px] max-2md:ml-4 mt-6 font-inter font-[500] group-hover:text-blue-light">
            Total Bookings
          </h1>
          <p className="mb-[32px] text-[2.5em]  w-[max-content] max-2md:ml-4 font-inter font-[600] group-hover:text-blue-light">
            {data.TotalBooking === -1 ? <ClipLoader /> : data.TotalBooking}
          </p>
        </div>
        <div
          onClick={() => navigate("/admin-dashboard/djoftheweek")}
          className={`group max-2md:mb-6 mb-4 w-auto max-2md:w-[80%] max-2md:px-2 px-[40px] flex flex-col 
            shadow-item-shadow rounded-2xl items-center h-[140px] w-[290px] hover:border-2 hover:cursor-pointer hover:border-blue-light`}
        >
          <h1 className="text-[23px] max-2md:text-[20px] max-2md:ml-4 mt-6 font-inter font-[500] group-hover:text-blue-light">
            Dj of The Week
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AllDetails;
