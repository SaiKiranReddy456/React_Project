import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../ConfigFirebase/Config";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./ManageAppointments.css";
import "animate.css";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [hospitals, setHospitals] = useState({});
  const [doctors, setDoctors] = useState({});
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);

  const dailySlots = ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  const loggedInPerson = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(loggedInPerson);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentRef = await getDocs(collection(db, "appointments"));
        const data = appointmentRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // setAppointments(data);
        // console.log("Appointments:", data);

        const hospRef = await getDocs(collection(db, "hospitals"));
        const hospData = {};
        hospRef.docs.forEach((hosp) => {
          hospData[hosp.id] = hosp.data().name;
        });
        setHospitals(hospData);

        const docRef = await getDocs(collection(db, "doctors"));
        const docData = {};
        docRef.docs.forEach((doc) => {
          docData[doc.id] = doc.data().name;
        });
        setDoctors(docData);

        const userAppointments = data.filter(
          (x) => x.patientName === loggedInPerson.user.displayName
        );
        setAppointments(userAppointments);
        console.log(userAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (appt) => {
    try {
      await deleteDoc(doc(db, "appointments", appt.id));
      setAppointments((prev) => prev.filter((x) => x.id !== appt.id));
      toast.success("Appointment Cancelled Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Appointment cancellation failed");
    }
  };

  const handleReschedule = (appt) => {
    setOpenModal(true);
    setSelectedAppt(appt);
  };

  const handleConfirm = async () => {
    try {
      if (!date || !slot) {
        toast.error("Please select date and slot");
        return;
      }
      await updateDoc(doc(db, "appointments", selectedAppt.id), {
        date: date.toISOString().split("T")[0],
        slot: slot,
        status: "Pending",
      });
      setAppointments((prev) =>
        prev.map((x) =>
          x.id === selectedAppt.id
            ? {
                ...x,
                date: date.toISOString().split("T")[0],
                slot: slot,
                status: "Pending",
              }
            : x
        )
      );
      toast.success("Appointment reschedule sent for confirmation");
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error("Error in rescheduling");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setDate(null);
    setSlot("");
    setSelectedAppt(null);
  };
  return (
    <div>
      <Container className="dashboardd-container">
        <h2 className="dashboardd-title">
          Welcome, {`${loggedInPerson.user.displayName}`}
        </h2>

        <h3 className="sectionn-title" style={{ textAlign: "center" }}>
          Appointments
        </h3>
        <Row>
          {appointments.length == 0 ? (
            <p style={{ textAlign: "center" }}>No appointments found.</p>
          ) : (
            appointments.map((appt) => (
              <Col lg={3} md={4} sm={6} key={appt.id} className="mb-3">
                <Card className="animate__animated animate__jackInTheBox">
                  <Card.Body>
                    <Card.Title>{appt.name}</Card.Title>
                    <Card.Text>
                      <strong>Hospital:</strong>{" "}
                      {hospitals[appt.hospitalId] || appt.hospitalId}
                    </Card.Text>
                    <Card.Text>
                      <strong>Doctor:</strong>{" "}
                      {doctors[appt.doctorId] || appt.doctorId}
                    </Card.Text>
                    <Card.Text>
                      <strong>Date:</strong> {appt.date}
                    </Card.Text>
                    <Card.Text>
                      <strong>Slot:</strong> {appt.slot}
                    </Card.Text>
                    <Card.Text>
                      <strong>Status:</strong> {appt.status}
                    </Card.Text>
                    <div className="card-buttons">
                      <Button
                        className="btnn-accept"
                        onClick={() => handleCancel(appt)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="btnn-decline"
                        onClick={() => handleReschedule(appt)}
                      >
                        Reschedule
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={new Date()}
            placeholderText="Choose a date"
            className="date-picker"
          />

          <select
            className="slot-dropdown"
            value={slot}
            onChange={(e) => setSlot(e.target.value)} 
          >
            <option value="">Select Slot</option>
            {dailySlots.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageAppointments;
