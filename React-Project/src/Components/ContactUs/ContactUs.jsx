import React from "react";
import {Form} from "react-bootstrap";
import "./ContactUs.css";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactUs = () => {

  const handleClick=()=>{
    window.open(
      "https://www.google.com/maps/place/Healthbridge+Network+Pvt+Ltd/@19.115379,72.878328,17z/",
      "_blank"
    );
  }

  const handleSubmit=()=>{
    toast.success("Submitted successfully")
  }

  return (
    <div>
      <div id="one">
        <h1>Contact us</h1>
        <br></br>
        <h3>
          Have questions about our products, support services, or anything else?
          Let us know and we’ll get back to you.
        </h3>
      </div>

      <div id="two">
        <div id="two-a">
          <h3>Contact us</h3>
          <br></br>
          <p>Interested in</p>
          <br></br>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">Creating a free profile on HealthBridge</option>
            <option value="2">
              Free trial for a software to manage my clinic
            </option>
            <option value="3">Software to manage my hospital(s)</option>
            <option value="4">
              Software to manage my multi-center clinics
            </option>
            <option value="5">Advertising my hospital on HealthBridge</option>
            <option value="6">Career opportunities</option>
          </Form.Select>
          <br></br>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <div id="two-b">
          <h3>Our branches</h3><br></br>
          <p>City</p><br></br>
          <Form.Select aria-label="Default select example">
            <option>Hyderabad</option>
            <option value="1">Chennai</option>
            <option value="2">Mumbai</option>
            <option value="3">Bangalore</option>
          </Form.Select>

          <div id="two-c">
            <div>
              <h5>Mumbai</h5>
              <p style={{width:"100%"}}>
                HealthBridge Network Pvt. Ltd.,Sumer Plaza, Sankasth Pada
                Welfare Society, Marol, Andheri East, Mumbai, Maharashtra 400072
              </p>
            </div>

            <h6 id="two-d" onClick={handleClick}>Get Directions</h6>
          </div>
        </div>
      </div>

      <div id="#three">
        <div className="three-a">
        <div className="three-b">
          <h4>Health Bridge</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="three-b">
          <h4>For Patients</h4>
          <ul>
            <li><a href="#">Search for Doctors</a></li>
            <li><a href="#">Search for Clinics</a></li>
            <li><a href="#">Search for Hospitals</a></li>
            <li><a href="#">Health Articles</a></li>
            <li><a href="#">Book Appointments</a></li>
          </ul>
        </div>

        <div className="three-b">
          <h4>For Doctors</h4>
          <ul>
            <li><a href="#">Doctor Profiles</a></li>
            <li><a href="#">Join Health Bridge</a></li>
            <li><a href="#">Doctor Dashboard</a></li>
          </ul>
        </div>

        <div className="three-b">
          <h4>More</h4>
          <ul>
            <li><a href="#">Help</a></li>
            <li><a href="#">Developers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="three-b">
          <h4>Social</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">Github</a></li>
          </ul>
        </div>
      </div>

      <div className="three-c">
        <h2>HealthBridge</h2>
        <p>© 2025 Health Bridge. All rights reserved.</p>
      </div>
      </div>
    </div>
  );
};

export default ContactUs;
