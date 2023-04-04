import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import UpdateWeekForm from "./UpdateWeekForm";
import UpdateDayForm from "./UpdateDayForm";
import UpdateWorkoutForm from "./UpdateWorkoutForm";
import "../index.css";

const UpdateModal = ({ data, onClose }) => {
  // data holds all week, day, and workout objects in 1 file
  console.log(typeof onClose);
  // Extract weeks information from data
  const weeks = data.map((item) => ({
    week_number: item.week_number,
  }));

  // Extract days information from data
  const days = data.flatMap((item) =>
    item.days.map((day) => ({
      week_number: item.week_number,
      day_number: day.day_number,
    }))
  );

  // Extract workouts information from data
  const workouts = data.flatMap((item) =>
    item.days.flatMap((day) =>
      day.workouts.map((workout) => ({
        week_number: item.week_number,
        day_number: day.day_number,
        title: workout.title,
        note: workout.note,
        sets: workout.sets,
        reps: workout.reps,
        percentage: workout.percentage,
      }))
    )
  );

  // Separate states for each form, so each form can be submitted independently based on whether there is input data or not
  const [weekFormData, setWeekFormData] = useState({ week_number: "" });
  const [dayFormData, setDayFormData] = useState({ week: "", day_number: "" });
  const [workoutFormData, setWorkoutFormData] = useState({
    title: "",
    note: "",
    sets: "",
    reps: "",
    percentage: "",
  });

  // Separate handleChanges functions for each form
  const handleWeekChange = (e) => {
    setWeekFormData({ ...weekFormData, [e.target.name]: e.target.value });
  };
  const handleDayChange = (e) => {
    setDayFormData({ ...dayFormData, [e.target.name]: e.target.value });
  };
  const handleWorkoutChange = (e) => {
    setWorkoutFormData({ ...workoutFormData, [e.target.name]: e.target.value });
  };

  // submit each form independently
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (weekFormData.week_number) {
      try {
        const response = await axios.patch(
          "http://127.0.0.1:8000/workouts/",
          weekFormData,
          {
            headers: {
              Authorization: "Token " + token,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    if (dayFormData.day_number) {
      try {
        const response = await axios.patch(
          "http://127.0.0.1:8000/workouts/days/",
          dayFormData,
          {
            headers: {
              Authorization: "Token " + token,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    if (
      workoutFormData.title ||
      workoutFormData.note ||
      workoutFormData.sets ||
      workoutFormData.reps ||
      workoutFormData.percentage
    ) {
      try {
        const response = await axios.patch(
          "http://127.0.0.1:8000/workouts/workout/",
          workoutFormData,
          {
            headers: {
              Authorization: "Token " + token,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    onClose();
    window.location.reload();
  };

  return (
    <Modal
      show
      onHide={onClose}
      size="lg"
      backdrop={false}
      className="backdrop"
      style={{ zIndex: 1050 }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">Add Information as Needed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateWeekForm
          weeks={weeks}
          weekFormData={weekFormData}
          handleChange={handleWeekChange}
        />
        <hr/>
        <UpdateDayForm
          weeks={weeks}
          days={days}
          dayFormData={dayFormData}
          handleChange={handleDayChange}
        />
        <hr/>
        <UpdateWorkoutForm
          workouts={workouts}
          workoutFormData={workoutFormData}
          handleChange={handleWorkoutChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;

// PREVIOUS CODE BEFORE IMPLEMENTING SAVE FUNCTIONALITY
// import React from "react";
// import { Modal, Button } from "react-bootstrap";
// import UpdateWeekForm from "./UpdateWeekForm";
// import UpdateDayForm from "./UpdateDayForm";
// import UpdateWorkoutForm from "./UpdateWorkoutForm";
// import "../index.css";

// const UpdateModal = ({ data, onClose }) => {

//   // data holds all week, day, and workout objects in 1 file

//   // Extract weeks information from data
//   const weeks = data.map(item => ({
//     week_number: item.week_number,
//   }));

//   // Extract days information from data
//   const days = data.flatMap(item =>
//     item.days.map(day => ({
//       week_number: item.week_number,
//       day_number: day.day_number,
//     }))
//   );

//   // Extrace workouts information from data
//   const workouts = data.flatMap(item =>
//     item.days.flatMap(day =>
//       day.workouts.map(workout => ({
//         week_number: item.week_number,
//         day_number: day.day_number,
//         title: workout.title,
//         note: workout.note,
//         sets: workout.sets,
//         reps: workout.reps,
//         percentage: workout.percentage,
//       }))
//     )
//   );

//   return(
//     <Modal show onHide={onClose} size="lg" backdrop={false} className="modal-dialog-scrollable" style={{ zIndex: 1050 }}>
//       <Modal.Header closeButton>
//         <Modal.Title>Update Stuff</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <UpdateWeekForm weeks={weeks} />
//         <UpdateDayForm days={days}/>
//         <UpdateWorkoutForm workouts={workouts}/>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="primary">
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }

// export default UpdateModal;
