import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DeleteDayForm = ({ days, weeks, dayFormData, handleChange }) => {
  //console.log("DeleteDayForm", weeks, days);  // delete when done testing

  // this useState will only allow the days from the selected week to show up in the drop down list
  const [selectedWeek, setSelectedWeek] = useState("");
  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
    handleChange(e);
  };

  return (
    <Form>
      <h5>Delete a Day</h5>
      <Row>
        <Col>
        <Form.Group controlId="week">
            <Form.Control
              as="select"
              name="week"
              value={dayFormData.week}
              onChange={handleWeekChange}
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
        </Col>
        <Col>
          <Form.Group controlId="day">
            <Form.Control
              as="select"
              name="day_number"
              value={dayFormData.day_number}
              onChange={handleChange}
              required
            >
              <option value="">Select Day</option>
              {days
                .filter((day) => day.week_number === selectedWeek)
                .map((day, index) => (
                  <option key={index} value={day.day_number}>
                    {`Day ${day.day_number.slice(-1)}`}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default DeleteDayForm;