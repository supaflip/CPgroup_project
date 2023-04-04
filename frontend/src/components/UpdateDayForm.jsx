import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const UpdateDayForm = ({ days, weeks, dayFormData, handleChange }) => {
  console.log("UpdateDayForm", weeks, days)  // delete when done testing

  return (
    <Form>
      <h5>Edit A Day</h5>
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
              placeholder="Day Number (e.g., 2.1 for Week 2, Day 1)"
              required
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateDayForm;


// PREVIOUS CODE BEFORE SHIFTING SAVING OF DATA TO UpdateMODAL SAVE BUTTON
// import React, { useState } from "react";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// const UpdateDayForm = ({ days, handleClose }) => {
//   console.log("UpdateDayForm", days)

//   const [formData, setFormData] = useState({
//     day_number: "",
//     week: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/workouts/days/",
//         formData,
//         {
//           headers: {
//             Authorization: "Token " + token,
//           },
//         }
//       );
//       alert("A new Day has been Updated");
//       handleClose();
//       window.location.reload();
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="day_number">
//         <Form.Label>Day Number:</Form.Label>
//         <Form.Control
//           type="text"
//           name="day_number"
//           value={formData.day_number}
//           onChange={handleChange}
//           placeholder="e.g. 2.1 (Week 2, Day 1)"
//           required
//         />
//       </Form.Group>
//       <Button className="mt-3" type="submit">Submit New Day</Button>
//     </Form>
//   );
// };

// export default UpdateDayForm;
