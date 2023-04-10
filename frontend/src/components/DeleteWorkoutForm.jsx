import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DeleteWorkoutForm = ({
  workouts,
  weeks,
  days,
  workoutFormData,
  handleChange,
}) => {
  //console.log("DeleteWorkoutForm", workouts); // delete when done testing

  // this useState will only allow the days from the selected week to show up in the drop down list
  const [selectedWeek, setSelectedWeek] = useState("");

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
    handleChange(e);
  };

  // this useState will only allow the workouts from the selected day to show up in the drop down list
  const [selectedDay, setSelectedDay] = useState("");

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    handleChange(e);
  };

  return (
    <Form>
      <h5>Delete a Workout</h5>
      <Row className="mb-2">
        <Col sm={3}>
          <Form.Group controlId="week">
            <Form.Control
              as="select"
              name="week"
              value={workoutFormData.week}
              onChange={handleWeekChange}
              required
            >
              <option value="">Select the Week</option>
              {weeks.map((week, index) => (
                <option key={index} value={week.week_number}>
                  Week {week.week_number}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group controlId="day">
            <Form.Control
              as="select"
              name="day"
              value={workoutFormData.day}
              onChange={handleDayChange}
              required
            >
              <option value="">Select the Day</option>
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
        <Col sm={6}>
          <Form.Group controlId="workout">
            <Form.Control
              as="select"
              name="title"
              value={workoutFormData.title}
              onChange={handleChange}
              required
            >
              <option value="">Select the Workout</option>
              {workouts
                .filter((workout) => workout.day_number === selectedDay)
                .map((workout, index) => (
                  <option key={workout.id} value={workout.title}>
                    {workout.title}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default DeleteWorkoutForm;
