import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { db } from "../../../../ConfigFirebase/Config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const ManageDoctors = () => {
  const loggedInPerson = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const [openModal, setOpenModal] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    degree: "",
    hospitalId: "",
    specializations: "",
  });
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getDocs(collection(db, "hospitals"));
        const hospitalList = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHospitals(hospitalList);
      } catch (err) {
        toast.error("Failed to load hospitals");
      }
    };

    fetchHospitals();
  }, []);

  const handleButton = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleAddDoctor = async () => {
    try {
      if (
        !doctorDetails.name ||
        !doctorDetails.degree ||
        !doctorDetails.hospitalId ||
        !doctorDetails.specializations
      ) {
        toast.error("Please enter all the details.");
        return;
      }

      await addDoc(collection(db, "doctors"), {
        ...doctorDetails,
        specializations: doctorDetails.specializations
          .split(",")
          .map((s) => s.trim()),
        createdBy: loggedInPerson.user.uid,
        createdAt: new Date(),
      });

      toast.success("Doctor Added Successfully");
      handleClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div id="manage_hospitals">
      <h2>HealthBridge</h2>
      <h3>Connecting You to Better Care, Instantly.</h3>
      <p>
        Health is one of the most valuable assets for every individual. In
        today’s fast-paced world, delays in getting timely medical care can lead
        to serious consequences. The motto behind
        <strong> Health Bridge</strong> is to{" "}
        <em>bridge the gap between patients and healthcare providers</em> by
        offering a simple, accessible, and reliable appointment booking system.
        Our vision is to make healthcare management{" "}
        <strong>instant, stress-free, and accessible for everyone</strong>.
      </p>

      <p>
        Many patients struggle with long waiting times, lack of transparency in
        doctor availability, and the hassle of managing appointments manually.
        By digitalizing this process,
        <strong> Health Bridge</strong> ensures that patients can focus on their
        health instead of wasting time in queues or on calls. The platform
        empowers users with <strong>choice, convenience, and confidence</strong>{" "}
        while making healthcare more, patient-centric.
      </p>

      <p>
        For administrators and healthcare providers, the system acts as a{" "}
        <strong>centralized management hub</strong>. Hospitals and doctors can
        efficiently manage their schedules, minimize no-shows, and maintain
        accurate appointment records. This not only improves{" "}
        <strong>workflow efficiency</strong> but also enhances the overall{" "}
        <strong>quality of care </strong>
        provided to patients. With a responsive design and secure
        authentication, <strong> Health Bridge</strong> lays the foundation for
        a future-ready healthcare system.
      </p>

      <h3>Key Features of Health Bridge</h3>
      <ul>
        <li>
          {" "}
          <strong>Instant Appointment Booking</strong> – Book with your chosen
          hospital or doctor in just a few clicks.
        </li>
        <li>
          {" "}
          <strong>Hospital Management</strong> – Admins can add and manage
          hospital details.
        </li>
        <li>
          {" "}
          <strong>Doctor Management</strong> – Add doctors, assign
          specializations, and set availability.
        </li>
        <li>
          {" "}
          <strong>Appointment Management</strong> – Cancel or reschedule easily;
          admins can monitor all appointments.
        </li>
        <li>
          {" "}
          <strong>User Dashboard</strong> – Organized appointment history and
          quick booking options.
        </li>
        <li>
          {" "}
          <strong>Admin Dashboard</strong> – Full hospital/doctor data
          management.
        </li>
        <li>
          {" "}
          <strong>Secure Login</strong> – Role-based dashboards with secured
          login.
        </li>
        <li>
          {" "}
          <strong>Responsive UI</strong> – Mobile-friendly and easy to use.
        </li>
      </ul>

      <Button className="btn btn-primary" onClick={handleButton}>
        Add Doctor
      </Button>

      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Doctor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="form">
            <Form.Control
              type="text"
              placeholder="Doctor Name"
              onChange={(e) =>
                setDoctorDetails({ ...doctorDetails, name: e.target.value })
              }
            />
            <Form.Control
              type="text"
              placeholder="Degree"
              onChange={(e) =>
                setDoctorDetails({ ...doctorDetails, degree: e.target.value })
              }
            />

            <Form.Select
              onChange={(e) =>
                setDoctorDetails({
                  ...doctorDetails,
                  hospitalId: e.target.value,
                })
              }
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name} ({hospital.location})
                </option>
              ))}
            </Form.Select>

            <Form.Control
              as="textarea"
              placeholder="Enter Specializations"
              onChange={(e) =>
                setDoctorDetails({
                  ...doctorDetails,
                  specializations: e.target.value,
                })
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddDoctor}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageDoctors;
