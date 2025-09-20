import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../ConfigFirebase/Config";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "animate.css";

const Appointments = () => {
  const loggedInPerson = JSON.parse(localStorage.getItem("loggedInAdmin"));
  console.log(loggedInPerson.user.uid);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [hospitals, setHospitals] = useState({});
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const hospitalDocRef = await getDocs(collection(db, "hospitals"));
        const hospitalData = hospitalDocRef.docs.map((x) => ({
          id: x.id,
          ...x.data(),
        }));
        console.log(hospitalData);
        const myHospitals = hospitalData.filter(
          (hosp) => hosp.createdBy === loggedInPerson.user.uid
        );
        const hospitalIds = myHospitals.map((x) => x.id);
        console.log(hospitalIds);

        const appointDocRef = await getDocs(collection(db, "appointments"));
        const data = appointDocRef.docs.map((x) => ({
          id: x.id,
          ...x.data(),
        }));
        console.log(data);

        const filteredData = data.filter((x) =>
          hospitalIds.includes(x.hospitalId)
        );
        console.log(filteredData);
        setAppointments(filteredData);
        // console.log("Appointments:", appointmentDocRef);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleAccept = async (appt) => {
    try {
      const slotLength = appointments.filter(
        (x) =>
          x.doctorId === appt.doctorId &&
          x.date === appt.date &&
          x.slot === appt.slot &&
          x.status === "Accepted"
      ).length;

      if (slotLength >= 2) {
        const apptRef = doc(db, "appointments", appt.id);
        await updateDoc(apptRef, { status: "Declined" });

        setAppointments((prev) =>
          prev.map((x) => (x.id === appt.id ? { ...x, status: "Declined",disabled:true} : x))
        );



        toast.error("Slot full, Appointment declined automatically.");

        return;
      }

      const apptRef = doc(db, "appointments", appt.id);
      await updateDoc(apptRef, { status: "Accepted" });

      setAppointments((prev) =>
        prev.map((a) => (a.id === appt.id ? { ...a, status: "Accepted",disabled:true } : a))
      );

      toast.success("Appointment accepted");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    }
  };

  const handleDecline = async (appt) => {
    try {
      const apptRef = doc(db, "appointments", appt.id);
      await updateDoc(apptRef, { status: "Declined" });

      setAppointments((prev) =>
        prev.map((x) => (x.id === appt.id ? { ...x, status: "Declined",disabled:true } : x))
      );

      toast.success("Appointment declined successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: "0% 20%",
        }}
      >
        <Spinner animation="grow" variant="success" />
        <h3 className="mt-3">Loading, please wait a moment</h3>
      </div>
    );
  }

  return (
    <div>
      <div id="content">
        <div id="title">Welcome, {loggedInPerson.user.displayName}</div>
        <br></br>
        <div id="subtitle">Appointments</div>
        <br></br>

        <div id="appointment">
          {appointments.length == 0 ? (
            <p style={{ textAlign: "center" }}>No appointments found.</p>
          ) : (
          appointments.map((appt) => (
            <div
              id="apptcard"
              className="animate__animated animate__jackInTheBox"
            >
              <div id="cardbody">
                <strong>Hospital:</strong>
                <p>{hospitals[appt.hospitalId]}</p>
              </div>
              <div id="cardbody">
                <strong>Doctor:</strong>
                <p>{doctors[appt.doctorId]}</p>
              </div>
              <div id="cardbody">
                <strong>Date:</strong>
                <p>{appt.date}</p>
              </div>
              <div id="cardbody">
                <strong>Slot:</strong>
                <p>{appt.slot}</p>
              </div>
              <div id="cardbody">
                <strong>Status:</strong>
                <p
                  style={{
                    color:
                      appt.status === "Accepted"
                        ? "green"
                        : appt.status === "Declined"
                        ? "red"
                        : "orange",
                  }}
                  className="animate__animated animate__heartBeat animate__delay-1s"
                >
                  {appt.status}
                </p>
              </div>
              <div id="cardbody">
                <button id="accept" disabled={appt.disabled} onClick={() => handleAccept(appt)}>
                  Accept
                </button>
                <button id="decline" disabled={appt.disabled} onClick={() => handleDecline(appt)}>
                  Decline
                </button>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
