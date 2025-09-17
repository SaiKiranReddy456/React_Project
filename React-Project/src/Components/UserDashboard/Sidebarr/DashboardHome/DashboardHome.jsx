import React, { useEffect, useState } from "react";
import { db } from "../../../../ConfigFirebase/Config";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

const DashboardHome = () => {
  const loggedInPerson = JSON.parse(localStorage.getItem("loggedInUser"));
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");

  const dailySlots = ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getDocs(collection(db, "hospitals"));
        const hospitals = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHospitals(hospitals);
        setLoading(false);
      } catch (err) {
        toast.error("Error fetching hospitals: " + err.message);
      }
    };
    fetchHospitals();
  }, []);

  const handleSelectedHospital = async (hospitalId) => {
    setSelectedHospital(hospitalId);
    setSelectedDoctor(null);
    setDoctors([]);

    try {
      const q = query(
        collection(db, "doctors"),
        where("hospitalId", "==", hospitalId)
      );
      const data = await getDocs(q);
      setDoctors(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      toast.error("Error fetching doctors: " + err.message);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) {
      toast.error("Please select doctor, date, and slot");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        doctorId: selectedDoctor.id,
        hospitalId: selectedHospital,
        adminId: loggedInPerson.user.uid,
        patientId: loggedInPerson.user.uid,
        patientName: loggedInPerson.user.displayName,
        slot: selectedSlot,
        date: selectedDate.toISOString().split("T")[0],
        status: "Pending",
        createdAt: new Date(),
      });

      toast.info("Appointment sent for booking confirmation!");
      setSelectedSlot("");
      setSelectedDate(null);
    } catch (err) {
      toast.error("Error booking appointment: " + err.message);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="grow" variant="success" />
        <h3 className="mt-3">Loading, please wait a moment</h3>
      </div>
    );
  }

  return (
    <div id="user_dashboard">
      <Container className="dashboardd-container">
        <h2 className="dashboardd-title">
          Welcome, {`${loggedInPerson.user.displayName}`}
        </h2>

        <h3 className="sectionn-title">Hospitals</h3>
        <Row className="animate__animated animate__jello">
          {hospitals.map((hosp) => (
            <Col lg={4} md={6} sm={6} xs={12} key={hosp.id} className="mb-3">
              <Card
                className={`custom-card ${
                  selectedHospital === hosp.id ? "selected-card" : ""
                }`}
              >
                <Card.Body>
                  <Card.Title>{hosp.name}</Card.Title>
                  <Card.Text>
                    <strong>Location:</strong> {hosp.location}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleSelectedHospital(hosp.id)}
                  >
                    View Doctors
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {selectedHospital && (
          <>
            <h3 className="sectionn-title">Doctors</h3>
            <Row>
              {doctors.map((doc) => (
                <Col lg={4} md={6} sm={6} xs={12} key={doc.id} className="mb-3">
                  <Card
                    className={`custom-card ${
                      selectedDoctor?.id === doc.id ? "selected-card" : ""
                    }`}
                  >
                    <Card.Body>
                      <Card.Title>{doc.name}</Card.Title>
                      <Card.Text>
                        <strong>Specialization:</strong> {doc.specializations}
                        <br />
                        <strong>Degree:</strong> {doc.degree}
                      </Card.Text>
                      <Button
                        variant="outline-success"
                        onClick={() => setSelectedDoctor(doc)}
                      >
                        Select Doctor
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {selectedDoctor && (
          <div className="picker-container">
            <h3 className="section-title">Select Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              placeholderText="Choose a date"
              className="date-picker"
            />
          </div>
        )}

        {selectedDate && (
          <div className="slots-container">
            <h3 className="section-title">Available Slots</h3>
            <select
              className="slot-dropdown"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="">Select Slot</option>
              {dailySlots.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            <Button
              variant="primary"
              onClick={handleBookAppointment}
              className="ml-3"
            >
              Book Appointment
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};
export default DashboardHome;
