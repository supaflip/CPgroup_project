import React from "react";
import Form from "react-bootstrap/Form";

const DeleteWeekForm = ({ weeks, weekFormData, handleChange }) => {
  //console.log("DeleteWeekForm", weeks);

  return (
    <Form>
      <h5>Delete a Week</h5>
      <Form.Group controlId="week">
        <Form.Control
          as="select"
          name="week_number"
          value={weekFormData.week_number}
          onChange={handleChange}
          required
        >
          <option value="">Select Week</option>
          {weeks.map((week, index) => (
            <option key={index} value={week.week_number}>
              Week {week.week_number}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default DeleteWeekForm;
