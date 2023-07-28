import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const UnAuthorized = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const location = useLocation();
  const {
    data: {
      user: { admin: fullName },
    },
  } = user;

  return (
    <>
      {user && fullName === "dj" ? (
        <Navigate to="/" state={{ from: location }} replace></Navigate>
      ) : fullName === "user" ? (
        <Navigate
          to="/user-dashboard"
          state={{ from: location }}
          replace
        ></Navigate>
      ) : null}
    </>
  );
};

export default UnAuthorized;
