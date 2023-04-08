import WorkoutList from './WorkoutList';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";


function DayList(props) {
  // Create a state variable to keep track of which workout was clicked
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
  // Create a function to handle when a workout button is clicked
  const handleWorkoutClick = (index) => {
    setSelectedWorkoutIndex(index);
  };
  // Create a function to handle closing the modal
  const handleClose = () => setSelectedWorkoutIndex(null);

  const renderDays = () => {
    if (!props.days) {
      return "Hello there is nothing";
    }

    // lists only the days that are in the week
    return (
      <>
        {props.days.map((day, index) => (
          <div key={index - 1}>
            <Button
              key={index}
              variant="primary"
              // day={day.day_number}
              // workouts={day.workouts}
              onClick={() => handleWorkoutClick(index)} // Pass the workout index to the click handler function
            >
              DAY {day.day_number.slice(-1)}
            </Button>
            <p></p>
            <Modal
              className="backdrop"
              show={selectedWorkoutIndex === index}
              onHide={handleClose}
              backdrop={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Day {day.day_number.slice(-1)}, Week{" "}
                  {day.day_number.slice(0, -2)} Workout
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <WorkoutList day={day.day_number} workouts={day.workouts} USER_AUTH={props.USER_AUTH}/>
              </Modal.Body>
            </Modal>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="list-container">{renderDays()}</div>
    </div>
  );
}

export default DayList;
