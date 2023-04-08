import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateWorkoutForm = ({ showModal, setShowModal, workouts}) => {
  const [formData, setFormData] = useState({
    title: "",
    note: "",
    sets: "",
    reps: "",
    percentage: "",
  });

  console.log(workouts)

  // useEffect(() => {
  //   setFormData(workout);
  // }, [workout]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/workouts/workout/${workout.id}/`,
        formData,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      alert("The Workout has been updated");
      handleClose();
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const workoutForms = (workouts) =>{
          {workouts.map((workout, index) => (
          <div key={index+1}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={workout.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="note">
                <Form.Label>Note:</Form.Label>
                <Form.Control
                  type="text"
                  name="note"
                  value={workout.note}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="sets">
                <Form.Label>Sets:</Form.Label>
                <Form.Control
                  type="text"
                  name="sets"
                  value={workout.sets}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="reps">
                <Form.Label>Reps:</Form.Label>
                <Form.Control
                  type="text"
                  name="reps"
                  value={workout.reps}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="percentage">
                <Form.Label>Percentage:</Form.Label>
                <Form.Control
                  type="number"
                  name="percentage"
                  value={workout.percentage}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className="mt-3" type="submit">
                Update Workout
              </Button>
            </Form>
            </div>
    ))
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} backdrop={false}>
          <Modal.Header closeButton>
              <Modal.Title>Update My Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
          {workouts.map((workout, index) => (
          <div key={index+1}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={workout.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="note">
                <Form.Label>Note:</Form.Label>
                <Form.Control
                  type="text"
                  name="note"
                  value={workout.note}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="sets">
                <Form.Label>Sets:</Form.Label>
                <Form.Control
                  type="text"
                  name="sets"
                  value={workout.sets}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="reps">
                <Form.Label>Reps:</Form.Label>
                <Form.Control
                  type="text"
                  name="reps"
                  value={workout.reps}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="percentage">
                <Form.Label>Percentage:</Form.Label>
                <Form.Control
                  type="number"
                  name="percentage"
                  value={workout.percentage}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className="mt-3" type="submit">
                Update Workout
              </Button>
            </Form>
            </div>
    ))} </>
          </Modal.Body>
          <Modal.Footer>
        <div className="textaligncenter">
        <Button variant="primary" onClick={handleSubmit} type="submit">Save Changes</Button> 
        </div>
        </Modal.Footer>
    </Modal>
    </>
  );
};
}

export default UpdateWorkoutForm;
