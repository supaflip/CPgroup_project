import React from "react";
import Form from "react-bootstrap/Form";

const CreateWeekForm = ({ weeks, weekFormData, handleChange }) => {
  console.log("CreateWeekForm", weeks)  // delete when done testing

  return (
    <Form>
      <h5>Create a new Week</h5>
      <Form.Group controlId="week_number">
        <Form.Control
          type="text"
          name="week_number"
          value={weekFormData.week_number}
          onChange={handleChange}
          placeholder="Week Number (e.g., 1)"
          required
        />
      </Form.Group>
    </Form>
  );
};

export default CreateWeekForm;