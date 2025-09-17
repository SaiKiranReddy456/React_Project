import React, { useState } from "react";
import { Card, Button, Modal, Form, ProgressBar } from "react-bootstrap";

const UserProfile = () => {
  const loggedInPerson = JSON.parse(localStorage.getItem("loggedInUser"));
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: loggedInPerson.user.displayName,
    dob: loggedInPerson.user.dob || "",
    gender: loggedInPerson.user.gender || "",
    email: loggedInPerson.user.email,
    phone: loggedInPerson.user.phoneNumber || "",
    address: loggedInPerson.user.address || "",
  });
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...loggedInPerson,
      user: {
        ...loggedInPerson.user,
        displayName: formData.name,
        dob: formData.dob,
        gender: formData.gender,
        email: formData.email,
        phoneNumber: formData.phone,
        address: formData.address,
      },
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setShowModal(false);
    window.location.reload();
  };

  const handleProgress = () => {
    let filledFields = Object.values(formData).filter(
      (x) => x !== "" && x !== null
    ).length;
    let totalFields = Object.keys(formData).length;
    return {
      percentage: Math.round((filledFields / totalFields) * 100),
      filledFields,
      totalFields,
    };
  };

  const { percentage, filledFields, totalFields } = handleProgress();

  return (
    <div className="profile-container">
      <h3 className="text-center">
        {loggedInPerson.user.displayName}'s Profile
      </h3>
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Text>
            <strong>Name:</strong> {formData.name}
          </Card.Text>
          <Card.Text>
            <strong>DOB:</strong> {formData.dob || null}
          </Card.Text>
          <Card.Text>
            <strong>Gender:</strong> {formData.gender || null}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {formData.email}
          </Card.Text>
          <Card.Text>
            <strong>Phone:</strong> {formData.phone || null}
          </Card.Text>
          <Card.Text>
            <strong>Address:</strong> {formData.address || null}
          </Card.Text>
          <ProgressBar
            label={`${percentage}%`}
            animated
            now={percentage}
            striped
            variant={percentage < 50 ? "danger" : "success"}
          />
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
            {filledFields} of {totalFields} fields completed
          </p>

          <Button
            variant="outline-success"
            onClick={() => setShowModal(true)}
            style={{ width: "15%", margin: "auto" }}
          >
            Edit Profile
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDob" className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Select Gender"
                value={formData.gender}
                name="gender"
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
