import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CreateWorkoutForm = ({
  workouts,
  weeks,
  days,
  workoutFormData,
  handleChange,
}) => {
  console.log("CreateWorkoutForm", workouts); // delete when done testing

  // this useState will only allow the days from the selected week to show up in the drop down list
  const [selectedWeek, setSelectedWeek] = useState("");

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
    handleChange(e);
  };

  return (
    <Form>
      <h5>Create a new Workout</h5>
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
              <option value="">Select Week</option>
              {weeks.map((week, index) => (
                <option key={index} value={week.week_number}>
                  Week {week.week_number}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="day">
            <Form.Control
              as="select"
              name="day"
              value={workoutFormData.day}
              onChange={handleChange}
              required
            >
              <option value="">Select Day</option>
              {days
                .filter((day) => day.week_number === selectedWeek)
                .map((day, index) => (
                  <option key={index} value={day.day_number}>
                    {`Day ${day.day_number.slice(2)}`}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Form.Group controlId="title">
          <Form.Control
            type="text"
            name="title"
            value={workoutFormData.title}
            onChange={handleChange}
            placeholder="Title (e.g., High Pulls, Pause+Snatch)"
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-2">
        <Form.Group controlId="note">
          <Form.Control
            as="textarea"
            rows={2}
            type="text"
            name="note"
            value={workoutFormData.note}
            onChange={handleChange}
            placeholder="A brief note or directive as needed"
          />
        </Form.Group>
      </Row>
      <Row>
        <Col sm={4}>
          <Form.Group controlId="sets">
            <Form.Control
              type="text"
              name="sets"
              value={workoutFormData.sets}
              onChange={handleChange}
              placeholder="Sets (e.g., 5, 12)"
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="reps">
            <Form.Control
              type="text"
              name="reps"
              value={workoutFormData.reps}
              onChange={handleChange}
              placeholder="Reps (e.g., 4, 3+2, 2+2+4)"
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="percentage">
            <Form.Control
              type="number"
              name="percentage"
              value={workoutFormData.percentage}
              onChange={handleChange}
              placeholder="Percentage (e.g., 65, 90)"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateWorkoutForm;

// PREVIOUS CODE BEFORE SHIFTING SAVING OF DATA TO CREATEMODAL SAVE BUTTON
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// const CreateWorkoutForm = ({ workouts, handleClose }) => {
//   console.log("CreateWorkoutForm", workouts)

//   const [formData, setFormData] = useState({
//     title: "",
//     note: "",
//     sets: "",
//     reps: "",
//     percentage: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/workouts/workout/",
//         formData,
//         {
//           headers: {
//             Authorization: "Token " + token,
//           },
//         }
//       );
//       alert("A new Workout has been created");
//       handleClose();
//       window.location.reload();
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="title">
//         <Form.Label>Title:</Form.Label>
//         <Form.Control
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="note">
//         <Form.Label>Note:</Form.Label>
//         <Form.Control
//           type="text"
//           name="note"
//           value={formData.note}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="sets">
//         <Form.Label>Sets:</Form.Label>
//         <Form.Control
//           type="text"
//           name="sets"
//           value={formData.sets}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="reps">
//         <Form.Label>Reps:</Form.Label>
//         <Form.Control
//           type="text"
//           name="reps"
//           value={formData.reps}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="percentage">
//         <Form.Label>Percentage:</Form.Label>
//         <Form.Control
//           type="number"
//           name="percentage"
//           value={formData.percentage}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Button className="mt-3" type="submit">
//         Submit New Workout
//       </Button>
//     </Form>
//   );
// };

// export default CreateWorkoutForm;
