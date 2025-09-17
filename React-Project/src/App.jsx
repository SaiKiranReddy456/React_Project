import React from "react";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import NavbarComp from "./Components/Navbar/NavbarComp";
import ManageHospitals from "./Components/AdminDashboard/Sidebar/ManageHospitals/ManageHospitals";
import ManageDoctors from "./Components/AdminDashboard/Sidebar/ManageDoctors/ManageDoctors";
import UserProfile from "./Components/UserDashboard/Sidebarr/UserProfile/UserProfile";
import ManageAppointments from "./Components/UserDashboard/Sidebarr/ManageAppointments/ManageAppointments";
import DashboardHome from "./Components/UserDashboard/Sidebarr/DashboardHome/DashboardHome";
import Appointments from "./Components/AdminDashboard/Sidebar/Appointments/Appointments";
import AdminHome from "./Components/AdminDashboard/Sidebar/AdminHome/AdminHome";
import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";

const App = () => {
  return (
    <div>
      <NavbarComp></NavbarComp>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/aboutus" element={<AboutUs></AboutUs>} />
        <Route path="/contactus" element={<ContactUs></ContactUs>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route
          path="/AdminDashboard"
          element={<AdminDashboard></AdminDashboard>}
        >
          <Route index path="managehospitals" element={<AdminHome />} />
          <Route
            path="managehospitals"
            element={<ManageHospitals></ManageHospitals>}
          ></Route>
          <Route
            path="managedoctors"
            element={<ManageDoctors></ManageDoctors>}
          ></Route>
          <Route
            path="appointments"
            element={<Appointments></Appointments>}
          ></Route>
        </Route>
        <Route path="/UserDashboard" element={<UserDashboard></UserDashboard>}>
          <Route
            index
            path="dashboard"
            element={<DashboardHome></DashboardHome>}
          />
          <Route
            path="userprofile"
            element={<UserProfile></UserProfile>}
          ></Route>
          <Route
            path="manageappointments"
            element={<ManageAppointments></ManageAppointments>}
          ></Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autolose={3000} />
    </div>
  );
};

export default App;
