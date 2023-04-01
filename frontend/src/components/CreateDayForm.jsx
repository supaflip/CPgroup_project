import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateDayForm = ({ week_number, handleClose }) => {
  const [formData, setFormData] = useState({
    day_number: "",
    week: week_number,
  });

  const handleChange = (e) => {
    if (e.target.name === "day_number"){
      setFormData({ ...formData, [e.target.name]: `${week_number}.${e.target.value}`, });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/workouts/days/",
        formData,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      alert("A new Day has been created");
      handleClose();
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="day_number">
        <Form.Label>Day Number:</Form.Label>
        <Form.Control
          type="text"
          name="day_number"
          value={formData.day_number}
          onChange={handleChange}
          placeholder="e.g. 1"
          required
        />
      </Form.Group>
      <Button className="mt-3" type="submit">Submit New Day</Button>
    </Form>
  );
};

export default CreateDayForm;
