import React, { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import "./Signup.css";
import { authentication, db } from "../../ConfigFirebase/Config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import myImage from "./img1.jpeg"

const Signup = () => {
  const [signupDetails, setSignpDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const accountCreated = await createUserWithEmailAndPassword(
        authentication,
        signupDetails.email,
        signupDetails.password
      );

      await updateProfile(accountCreated.user, {
        displayName: signupDetails.name,
      });
      console.log(accountCreated);
      await setDoc(doc(db, `${signupDetails.role}s`, signupDetails.name), {
        name: signupDetails.name,
        email: signupDetails.email,
        role: signupDetails.role,
        id: Date.now(),
      });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Signup failed. Please try again.");
    }
  };
  return (
    <div id="main">
      <div className="branding">
        <img src={myImage} alt="HealthBridge Logo" />
        <h2>HealthBridge</h2>
        <h3>Connecting You to Better Care, Instantly.</h3>
      </div>

      <div className="login-container">
        <Form onSubmit={handleSignupSubmit}>
          <FloatingLabel
            controlId="floatingFullName"
            label="Full Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Full Name"
              onChange={(e) =>
                setSignpDetails({ ...signupDetails, name: e.target.value })
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingEmail"
            label="Email Address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Email Address"
              onChange={(e) =>
                setSignpDetails({ ...signupDetails, email: e.target.value })
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
                setSignpDetails({ ...signupDetails, password: e.target.value })
              }
            />
          </FloatingLabel>

          <Form.Select
            aria-label="Floating label select example"
            className="mb-3"
            onChange={(e) =>
              setSignpDetails({ ...signupDetails, role: e.target.value })
            }
          >
            <option>Select Your Category</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Select>

          <Button variant="primary" type="submit">
            Signup
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
