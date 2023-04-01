// import React, { useState } from "react";

// const CreateWeekForm = ({ handleClose }) => {
//   return <h3>Test Week Form</h3>;
// };

// export default CreateWeekForm;

import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateWeekForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    week_number: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/workouts/",
        formData,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      alert("A new Week has been created");
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
      <Button className="mt-3" type="submit">Submit New Week</Button>
    </Form>
  );
};

export default CreateWeekForm;
