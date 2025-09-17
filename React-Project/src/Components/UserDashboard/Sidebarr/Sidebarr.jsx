import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";


const Sidebarr = () => {
  return (
    <div>
      <div id="sidebarr">
      <Link to="dashboard">Dashboard</Link>
      <Link to="userprofile">Profile</Link>
      <Link to="manageappointments">Manage Appointments</Link>
    </div>
    </div>
  )
}

export default Sidebarr
