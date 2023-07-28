import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ userType }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/login");
      return;
    }
  });

  return !user ? (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  ) : user && user?.data?.admin?.fullName === userType ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace></Navigate>
  );
};

export default ProtectedRoutes;
