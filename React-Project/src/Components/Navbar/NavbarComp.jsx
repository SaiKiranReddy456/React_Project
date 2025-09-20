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
      <Container>
        <Navbar.Brand onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          HealthBridge
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {loggedInPerson ? (
            <Nav className="ms-auto">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </Nav>
          ) : (
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/aboutus")}>About Us</Nav.Link>
              <Nav.Link onClick={() => navigate("/contactus")}>Contact Us</Nav.Link>

              <div className="d-flex gap-2 ms-lg-3 mt-2 mt-lg-0">
                <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
                  Login
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate("/signup")}>
                  Sign Up
                </button>
              </div>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
