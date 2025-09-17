import React, { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { authentication } from "../../ConfigFirebase/Config";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSwitchSignup = () => {
    navigate("/signup");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInPerson = await signInWithEmailAndPassword(
        authentication,
        loginDetails.email,
        loginDetails.password
      );
      toast.success("Login successful!");

      if (loginDetails.role === "Admin") {
        localStorage.setItem("loggedInAdmin", JSON.stringify(loggedInPerson));
      } else {
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInPerson));
      }

      navigate(`/${loginDetails.role}Dashboard`);
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div id="main">
      <div className="branding">
        <img src="img2.jpeg"></img>
        <h2>HealthBridge</h2>
        <h3>Connecting You to Better Care, Instantly.</h3>
      </div>

      <div className="login-container">
        <Form onSubmit={handleLoginSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email Address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Email Address"
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, email: e.target.value })
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
          </FloatingLabel>

          <Form.Select
            aria-label="Floating label select example"
            className="mb-3"
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, role: e.target.value })
            }
          >
            <option>Select Your Category</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Select>

          <Button variant="primary" type="submit">
            Login
          </Button>
          <hr />
          <Button variant="success" onClick={handleSwitchSignup}>
            Create a new account
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
