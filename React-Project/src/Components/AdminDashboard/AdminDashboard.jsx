import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Outlet,useLocation } from 'react-router-dom'
import "./AdminDashboard.css"
import ManageHospitals from './Sidebar/ManageHospitals/ManageHospitals'

const AdminDashboard = () => {

  const location = useLocation();
  
    const isBaseDashboard = location.pathname === "/AdminDashboard";
  return (
      <div id="admin_dashboard">
        <Sidebar></Sidebar>
        <div className="main-content">
        {isBaseDashboard ? <ManageHospitals /> : <Outlet />}
      </div>
    </div>
  )
}

export default AdminDashboard
