import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateWorkoutForm = ({ workout, handleClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    note: "",
    sets: "",
    reps: "",
    percentage: "",
  });

  useEffect(() => {
    setFormData(workout);
  }, [workout]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `https://d3tr9iv1x8so5z.cloudfront.net/workouts/workout/${workout.id}/`,
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="note">
        <Form.Label>Note:</Form.Label>
        <Form.Control
          type="text"
          name="note"
          value={formData.note}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="sets">
        <Form.Label>Sets:</Form.Label>
        <Form.Control
          type="text"
          name="sets"
          value={formData.sets}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="reps">
        <Form.Label>Reps:</Form.Label>
        <Form.Control
          type="text"
          name="reps"
          value={formData.reps}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="percentage">
        <Form.Label>Percentage:</Form.Label>
        <Form.Control
          type="number"
          name="percentage"
          value={formData.percentage}
          onChange={handleChange}
        />
      </Form.Group>
      <Button className="mt-3" type="submit">
        Update Workout
      </Button>
    </Form>
  );
};

export default UpdateWorkoutForm;
