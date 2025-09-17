import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const NavbarComp = () => {
  const navigate = useNavigate();
  const loggedInPerson =
    JSON.parse(localStorage.getItem("loggedInAdmin")) ||
    JSON.parse(localStorage.getItem("loggedInUser"));
  const handleLoginSwitch = () => {
    navigate("/login");
  };
  const handleSignupSwitch = () => {
    navigate("/signup");
  };

  const handleHome = () => {
    navigate("/home");
  };
  const handleAboutUs = () => {
    navigate("/aboutus");
  };
  const handleContactUs = () => {
    navigate("/contactus");
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("loggedInAdmin");
      localStorage.removeItem("loggedInUser");
      toast.success("Logout successful!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Logout failed. Please try again.");
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container className="navbar-content">
        <Navbar.Brand href="#home">HealthBridge</Navbar.Brand>
        {loggedInPerson ? (
          <>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Nav className="nav-links">
              <button onClick={handleHome}>HOME</button>
              <button onClick={handleAboutUs}>ABOUT US</button>
              <button onClick={handleContactUs}>CONTACT US</button>
            </Nav>
            <div className="nav-buttons">
              <button className="btn btn-primary" onClick={handleLoginSwitch}>
                LOGIN
              </button>
              <button className="btn btn-primary" onClick={handleSignupSwitch}>
                SIGN UP
              </button>
            </div>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
