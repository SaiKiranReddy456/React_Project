import React from "react";
import healthData from "../Data/Data";
import { Card, Carousel, Button,InputGroup,Form } from "react-bootstrap";
import "./Home.css";
import { FaRegUser } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa6";




const Home = () => {
  console.log(healthData);
  return (
    <div>
      <div id="first">
        {healthData[0].services.map((x) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={x.image}
                style={{ height: "50vh" }}
              />
              <Card.Body>
                <Card.Title>{x.title}</Card.Title>
                <Card.Text>{x.desc}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <div id="second">
        <div id="second-a">
          <h3>Consult top doctors online for any health concern</h3>
          <button>View All Specialities</button>
        </div>
        <div className="second-b">
          {healthData[1].health.map((x, i) => (
            <div key={i} className="health-card">
              <img
                src={x.image}
                alt={x.title}
                className="health-image"
                style={{ width: "50%" }}
              />
              <h5>{x.title}</h5>
              <button className="consult-btn">CONSULT NOW</button>
            </div>
          ))}
        </div>
      </div>

      <div id="third">
        <div id="third-a">
          <h4>Book an appointment for an in-clinic consultation</h4>
          <h6>Find experienced doctors across all specialities</h6>
        </div>
        <div className="third-b">
          <Carousel>
            {healthData[2].specialist.map((x) => {
              return (
                <Carousel.Item>
                  <img
                    src={x.image}
                    style={{ width: "100%", height: "80vh" }}
                  />
                  <Carousel.Caption>
                    <h3 style={{ color: "black" }}>{x.title}</h3>
                    <p style={{ color: "black" }}>{x.desc}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>

      <div id="fourth">
        <div id="fourth-a">
          <h2>Read top articles from health experts</h2>
          <div>
            Health articles that keep you informed about good health practices
            and achieve your goals.
          </div><br></br>
          <button>See all articles</button>
        </div>

        <div className="fourth-b">
          {healthData[3].articles.map((x) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={x.image} />
                <Card.Body>
                  <Card.Title>{x.title}</Card.Title>
                  <Card.Text>{x.desc}</Card.Text>
                  <Card.Text>{x.name}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>

      <div id="fifth">
        <h2>What our users have to say</h2>
        <h4>{healthData[4].reviews[Math.floor(Math.random() * healthData[4].reviews.length)].title}</h4><br></br>
        <h6 style={{margin:"2px"}}><FaRegUser style={{fontSize:"15px",margin:"5px"}}/>
{healthData[4].reviews[Math.floor(Math.random()*healthData[4].reviews.length)].name}</h6>
      </div>

      <div id="sixth">
        <div>
          <img src="https://www.practostatic.com/consumer-home/desktop/images/1597423628/footer-img.png" style={{width:"50%"}}></img>
        </div>
        <div id="sixth-a">
          <h2>Download the HealthBridge app</h2>
          <p>Access consultation with India’s top doctors on the HealthBridge app. Connect with doctors online, available 24/7, from the comfort of your home.</p>
          {/* <h4>Get the link to download the app</h4> */}
          <div id="sixth-b">
             <div id="sixth-c">
              <FaGooglePlay style={{fontSize:"xx-large"}}/>
              <h4>Google Play</h4>
             </div>
             <div id="sixth-d">
              <FaAppStoreIos style={{fontSize:"xx-large"}}/>
              <h4>App Store</h4>
             </div>
          </div>
          <div id="sixth-e">
          <InputGroup id="input" size="lg" style={{width:"50%"}}>
        <InputGroup.Text id="inputGroup-sizing-lg">
          +91
        </InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      <button>Send SMS</button>
          </div>
        </div>
      </div>

      <div id="#seventh">
        <div className="seventh-a">
        <div className="seventh-b">
          <h4>Health Bridge</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="seventh-b">
          <h4>For Patients</h4>
          <ul>
            <li><a href="#">Search for Doctors</a></li>
            <li><a href="#">Search for Clinics</a></li>
            <li><a href="#">Search for Hospitals</a></li>
            <li><a href="#">Health Articles</a></li>
            <li><a href="#">Book Appointments</a></li>
          </ul>
        </div>

        <div className="seventh-b">
          <h4>For Doctors</h4>
          <ul>
            <li><a href="#">Doctor Profiles</a></li>
            <li><a href="#">Join Health Bridge</a></li>
            <li><a href="#">Doctor Dashboard</a></li>
          </ul>
        </div>

        <div className="seventh-b">
          <h4>More</h4>
          <ul>
            <li><a href="#">Help</a></li>
            <li><a href="#">Developers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="seventh-b">
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

      <div className="seventh-c">
        <h2>HealthBridge</h2>
        <p>© 2025 Health Bridge. All rights reserved.</p>
      </div>
      </div>
    </div>
  );
};

export default Home;
