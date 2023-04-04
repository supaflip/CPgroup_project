import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateWeekForm = ({ week, handleClose }) => {
  const [formData, setFormData] = useState({
    week_number: week.week_number,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://d3tr9iv1x8so5z.cloudfront.net/workouts/week/${week.week_number}/`,
        formData,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      alert("This Week has been updated");
      handleClose();
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="week_number">
        <Form.Label>Week Number:</Form.Label>
        <Form.Control
          type="text"
          name="week_number"
          value={formData.week_number}
          onChange={handleChange}
          placeholder="e.g. 1"
          required
        />
      </Form.Group>
      <Button className="mt-3" type="submit">
        Update Week
      </Button>
    </Form>
  );
};

export default UpdateWeekForm;
