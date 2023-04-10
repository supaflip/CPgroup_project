import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CreateDayForm = ({ days, weeks, dayFormData, handleChange }) => {

  return (
    <Form>
      <h5>Create a new Day</h5>
      <Row>
        <Col sm={4}>
          <Form.Group controlId="week">
            <Form.Control
              as="select"
              name="week"
              value={dayFormData.week}
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
        </Col>
        <Col>    
          <Form.Group controlId="day_number">
            <Form.Control
              type="text"
              name="day_number"
              value={dayFormData.day_number}
              onChange={handleChange}
              placeholder="Day Number (e.g., 1)"
              required
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateDayForm;
