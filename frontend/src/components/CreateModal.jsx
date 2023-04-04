import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import CreateWeekForm from "./CreateWeekForm";
import CreateDayForm from "./CreateDayForm";
import CreateWorkoutForm from "./CreateWorkoutForm";
import "../index.css";

const CreateModal = ({ data, onClose }) => {
  // data holds all week, day, and workout objects in 1 file

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
    week: "",
    day: "",
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

  // Grabs day ID from the specific Day object matching the day_number
  const getDayIdByDayNumber = async (dayNumber) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/workouts/day/${dayNumber}/`,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      if (response.status === 200) {
        return response.data.result.id;
      } else {
        console.error("Error fetching day data.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching day data:", error);
      return null;
    }
  };

  // If statements in the handleSubmit function so each form can be submitted independently with just one Save button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (weekFormData.week_number) {
      try {
        const response = await axios.post(
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
      const dayDataWithWeekNumber = {
        ...dayFormData,
        day_number: `${dayFormData.week}.${dayFormData.day_number}`,
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/workouts/days/",
          dayDataWithWeekNumber,
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
      workoutFormData.week &&
      workoutFormData.day &&
      (workoutFormData.title ||
        workoutFormData.note ||
        workoutFormData.sets ||
        workoutFormData.reps ||
        workoutFormData.percentage)
    ) {
      const dayId = await getDayIdByDayNumber(workoutFormData.day);

      if (!dayId) {
        console.error("Day ID not found for day number:", workoutFormData.day);
        return;
      }
      
      const workoutDataWithDayId = {
        ...workoutFormData,
        day: dayId,
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/workouts/workout/",
          workoutDataWithDayId,
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
      className="modal-dialog-scrollable"
      style={{ zIndex: 1050 }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">
          Add Information as Needed
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateWeekForm
          weeks={weeks}
          weekFormData={weekFormData}
          handleChange={handleWeekChange}
        />
        <hr />
        <CreateDayForm
          weeks={weeks}
          days={days}
          dayFormData={dayFormData}
          handleChange={handleDayChange}
        />
        <hr />
        <CreateWorkoutForm
          weeks={weeks}
          days={days}
          workouts={workouts}
          workoutFormData={workoutFormData}
          handleChange={handleWorkoutChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;

// PREVIOUS CODE BEFORE IMPLEMENTING SAVE FUNCTIONALITY
// import React from "react";
// import { Modal, Button } from "react-bootstrap";
// import CreateWeekForm from "./CreateWeekForm";
// import CreateDayForm from "./CreateDayForm";
// import CreateWorkoutForm from "./CreateWorkoutForm";
// import "../index.css";

// const CreateModal = ({ data, onClose }) => {

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
//         <Modal.Title>Create Stuff</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <CreateWeekForm weeks={weeks} />
//         <CreateDayForm days={days}/>
//         <CreateWorkoutForm workouts={workouts}/>
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

// export default CreateModal;
