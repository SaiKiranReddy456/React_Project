import React from "react";
import Sidebarr from "./Sidebarr/Sidebarr";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHome from "./Sidebarr/DashboardHome/DashboardHome"; 
import "./UserDashboard.css"

const UserDashboard = () => {
  const location = useLocation();

  const isBaseDashboard = location.pathname === "/UserDashboard";

  return (
    <div id="user_dashboard">
      <Sidebarr />
      <div className="main-content">
        {isBaseDashboard ? <DashboardHome /> : <Outlet />}
      </div>
    </div>
  );
};

export default UserDashboard;
