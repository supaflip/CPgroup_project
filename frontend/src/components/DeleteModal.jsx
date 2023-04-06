import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import DeleteWeekForm from "./DeleteWeekForm";
import DeleteDayForm from "./DeleteDayForm";
import DeleteWorkoutForm from "./DeleteWorkoutForm";
import "../index.css";

const DeleteModal = ({ data, onClose }) => {
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
        id: workout.id,
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
  const [weekFormData, setWeekFormData] = useState({
    week_number: "",
  });
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
    console.log("Selected day_number:", e.target.value);
  };
  const handleWorkoutChange = (e) => {
    // this finds the workout object from the workouts array
    const selectedWorkout = workouts.find(
      (workout) => workout.title === e.target.value
    );
    // this sets the "id" of the selected workout in the workoutFormData state, so the API call can use this id for the delete function
    setWorkoutFormData({
      ...workoutFormData,
      [e.target.name]: e.target.value,
      id: selectedWorkout ? selectedWorkout.id : "",
    });
  };

  // If statements in the handleSubmit function so each form can be submitted independently with just one Delete button
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called"); // delete when done testing
    const token = localStorage.getItem("token");

    if (weekFormData.week_number) {
      console.log("Week number to delete:", weekFormData.week_number); // delete when done testing
      const userConfirmation = window.confirm(
        `Do you really want to delete the entire Week ${weekFormData.week_number}?`
      );

      if (userConfirmation) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/workouts/week/${weekFormData.week_number}`,
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
    }

    if (dayFormData.day_number) {
      console.log("Day number to delete:", dayFormData.day_number); // delete when done testing
      const userConfirmation = window.confirm(
        `Do you really want to delete Day ${dayFormData.day_number.slice(2)} of Week ${dayFormData.week}?`
      );

      if (userConfirmation) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/workouts/day/${dayFormData.day_number}`,
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
      console.log("Workout Title to delete:", workoutFormData.title); // delete when done testing
      const userConfirmation = window.confirm(
        `Do you really want to remove "${workoutFormData.title}" from Day ${workoutFormData.day.slice(2)} of Week ${workoutFormData.week}?`
      );
      if (userConfirmation) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/workouts/workout/${workoutFormData.id}`,
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
        <Modal.Title className="text-center w-100">
          Select Fields as Needed
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DeleteWeekForm
          weeks={weeks}
          weekFormData={weekFormData}
          handleChange={handleWeekChange}
        />
        <hr />
        <DeleteDayForm
          weeks={weeks}
          days={days}
          dayFormData={dayFormData}
          handleChange={handleDayChange}
        />
        <hr />
        <DeleteWorkoutForm
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
        <Button
          variant="primary"
          onClick={(e) => {
            console.log("Delete button clicked");
            handleSubmit(e);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
