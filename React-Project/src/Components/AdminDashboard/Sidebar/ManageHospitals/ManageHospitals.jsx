import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { db } from "../../../../ConfigFirebase/Config";
import { collection, addDoc } from "firebase/firestore";

const ManageHospitals = () => {
  const loggedInPerson = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const [openModal, setOpenModal] = useState(false);
  const [hospitalDetails, setHospitalDetails] = useState({
    name: "",
    location: "",
  });

  const handleButton = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleAddHospital = async () => {
    try {
      if (!hospitalDetails.name || !hospitalDetails.location) {
        toast.error("Please enter all the details.");
        return;
      }

      await addDoc(collection(db, "hospitals"), {
        ...hospitalDetails,
        createdBy: loggedInPerson.user.uid, // track admin who created it
        createdAt: new Date(),
      });

      toast.success("Hospital Added Successfully");
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
        Add Hospital
      </Button>

      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Hospital</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="form">
            <Form.Control
              type="text"
              placeholder="Hospital Name"
              onChange={(e) =>
                setHospitalDetails({ ...hospitalDetails, name: e.target.value })
              }
            />
            <Form.Control
              type="text"
              placeholder="Location"
              onChange={(e) =>
                setHospitalDetails({
                  ...hospitalDetails,
                  location: e.target.value,
                })
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddHospital}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageHospitals;
