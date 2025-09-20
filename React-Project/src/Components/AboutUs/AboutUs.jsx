import React from "react";
import "./AboutUs.css";
import { Card, Button } from "react-bootstrap";
import healthData from "../Data/Data";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";


const AboutUs = () => {

  const navigate=useNavigate();

  const handleClick=()=>{
    navigate("/login");
  };

  return (
    <div>
      <div id="a">
        <h1>Quality Healthcare Made Simple</h1>
        <h3>Our Mission</h3>
        <p>
          HealthBridge is on a mission to make quality healthcare affordable and
          accessible for over a billion+ Indians. We believe in empowering our
          users with the most accurate, comprehensive, and curated information
          and care, enabling them to make better healthcare decisions.
        </p>
      </div>

      <div id="b" data-aos="fade-down">
        <div id="b1">
          <h3>Health is a habit</h3>
          <p>
            It is the journey that takes you to new destinations every day with
            endless possibilities of life on the back of happiness, energy, and
            hope. HealthBridge wants to make this journey easy for every Indian
            and help them live healthier and longer lives.
          </p>
        </div>

        <div id="b2">
          <img
            src="https://www.shutterstock.com/image-photo/medical-concept-indian-beautiful-female-600nw-1613858044.jpg"
            style={{ width: "100%" }}
          ></img>
        </div>
      </div>

      <div id="c" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
        <h2>Our Offerings</h2>
        <br></br>
        <div id="c1">
          <div id="c2">
            <ul>
              <li>
                Comprehensive medical directory with detailed, verified
                information about more than a lakh doctor partners across the
                country.
              </li>
              <li>
                Online appointment booking at over 9,000 leading hospitals and
                clinics with doctors who use HealthBridge.
              </li>
              <li>
                Online consultation with trusted doctors across 20+
                specialities.
              </li>
              <li>
                Plus, subscription-based health plans, that provide unlimited
                online consultations* with doctors 24*7*365.
              </li>
            </ul>
          </div>
          <div id="c3">
            <ul>
              <li>
                Ray, HealthBridge award-winning practice management software,
                which is used by 10,000+ clinics.
              </li>
              <li>
                Insta, a full-stack HIMS solution, which is trusted by 500+
                clients across 1,200+ facilities.
              </li>
              <li>
                Diagnostic Tests through HealthBridge Associate Labs to get
                samples collected from the comfort and safety of one’s home.
              </li>
              <li>
                {" "}
                Medicine delivery by a network of verified pharmacies across the
                country.
              </li>
            </ul>
          </div>
        </div>
        <div id="c4">
          <div>
            <img src="https://www.practo.com/providers/static/images/pages/company/about/country-icon.svg"></img>
            <h4>20+</h4>
            <h6>Countries</h6>
          </div>
          <div>
            <img src="https://www.practo.com/providers/static/images/pages/company/about/patient-icon.svg"></img>
            <h4>10 Cr+</h4>
            <h6>Patients per year</h6>
          </div>
          <div>
            <img src="https://www.practo.com/providers/static/images/pages/company/about/doctor-icon.svg"></img>
            <h4>1 L+</h4>
            <h6>Doctor partners</h6>
          </div>
        </div>
      </div>

      <div id="d" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
        <h1 id="d1">
          Each time a patient finds the right doctor, we build a healthier
          nation
        </h1>
        <div id="d2">
          {healthData[5].story.map((x) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={x.image} />
                <Card.Body>
                  <Card.Title>{x.title}</Card.Title>
                  <Button variant="primary" onClick={handleClick}>Read Full Story</Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>

      <div id="e" data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
        <h1>Our approach to healthcare</h1>
        <h4>
          Providing high-quality, trusted, and accessible healthcare is our
          reason for being
        </h4>
        <div id="e1">
          {healthData[6].approach.map((x) => {
            return (
              <Card style={{ width: "18rem", padding: "1%" }}>
                <Card.Img
                  variant="top"
                  src={x.image}
                  style={{ width: "50%", margin: "0% 25%" }}
                />
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    {x.title}
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center" }}>
                    {x.desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>

      <div id="f" data-aos="zoom-out-up">
        <div id="f1">
          <h1>Data privacy and security is our top priority</h1>
          <p>Data privacy and security has always served as one of the founding philosophies of Practo, and we go to great lengths to safeguard the confidentiality and integrity of our users. <button onClick={handleClick}>Read more here</button></p>
        </div>
        <div id="f2">
          <img src="https://www.practo.com/providers/static/images/pages/company/about/security.png" style={{width:"100%"}}></img>
        </div>
      </div>

      <div id="g">
        <h1 style={{textAlign:"center",margin:"2%"}}>Our investors share our vision</h1>
        <div id="g1">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ4rF9YWtARaTd5Awt-_Nf3aLFqSXcKAretw&s" style={{width:"100%"}}></img>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTMPCNaUj-W_l2QLHmYYg7IgSaE2nW9F7BhA&s" style={{width:"100%"}}></img>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRosP7D6rD0iJJ30wNQY1v9uBW4Kk2fLUqdpQ&s" style={{width:"100%"}}></img>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2TjblN4GF_3dnIDxYXmnYP1Fq2EM4K3CtuQ&s" style={{width:"100%"}}></img>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHqi2OFGuW2xRg321iUaGYyqHOZMZxlh9Dg&s" style={{width:"100%"}}></img>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1g14QYtlfSIderodN6Dz1vz4KNb7C3B6BCw&s" style={{width:"100%"}}></img>
        </div>
        <p style={{margin:"5%",textAlign:"center"}}>"HealthBridge is revolutionizing healthcare by enabling consumers to find the best doctors, book instant appointments, consultations, and make better, more informed health decisions. It is our privilege to scale and bring HealthBridge to billions of consumers around the globe."</p>
      </div>

      <div id="i">
        <div className="i1">
        <div className="i2">
          <h4>Health Bridge</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="i2">
          <h4>For Patients</h4>
          <ul>
            <li><a href="#">Search for Doctors</a></li>
            <li><a href="#">Search for Clinics</a></li>
            <li><a href="#">Search for Hospitals</a></li>
            <li><a href="#">Health Articles</a></li>
            <li><a href="#">Book Appointments</a></li>
          </ul>
        </div>

        <div className="i2">
          <h4>For Doctors</h4>
          <ul>
            <li><a href="#">Doctor Profiles</a></li>
            <li><a href="#">Join Health Bridge</a></li>
            <li><a href="#">Doctor Dashboard</a></li>
          </ul>
        </div>

        <div className="i2">
          <h4>More</h4>
          <ul>
            <li><a href="#">Help</a></li>
            <li><a href="#">Developers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="i2">
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

      <div className="i3">
        <h2>HealthBridge</h2>
        <p>© 2025 Health Bridge. All rights reserved.</p>
      </div>
      </div>
    </div>
  );
};

export default AboutUs;
