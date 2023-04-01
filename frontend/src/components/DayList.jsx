import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import WorkoutList from "./WorkoutList";
import CreateDayForm from "./CreateDayForm";
import UpdateDayForm from "./UpdateDayForm";

function DayList(props) {
  // Create a state variable to keep track of which workout was clicked
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
  const [showCreateDayModal, setShowCreateDayModal] = useState(false);
  const [showUpdateDayModal, setShowUpdateDayModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // Create a function to handle when a workout button is clicked
  const handleWorkoutClick = (index) => {
    setSelectedWorkoutIndex(index);
  };
  // Create a function to handle closing the modal
  const handleClose = () => setSelectedWorkoutIndex(null);

  const handleCreateDayModalClose = () => setShowCreateDayModal(false);

  const handleUpdateDayModalOpen = (day) => {
    setSelectedDay(day);
    setShowUpdateDayModal(true);
  };

  const handleUpdateDayModalClose = () => setShowUpdateDayModal(false);

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
              onClick={() => handleWorkoutClick(index)} // Pass the workout index to the click handler function
            >
              DAY {day.day_number.slice(-1)}
            </Button>
            <p></p>
            <Modal
              show={selectedWorkoutIndex === index}
              onHide={handleClose}
              backdrop={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Day {day.day_number.slice(-1)}, Week{" "}
                  {day.day_number.slice(0, 1)} Workout
                </Modal.Title>
                <Button
                  className="ml-2"
                  variant="outline-secondary"
                  onClick={() => handleUpdateDayModalOpen(day)}
                >
                  Update Day Number
                </Button>
                <Modal
                  show={showUpdateDayModal}
                  onHide={handleUpdateDayModalClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Update Day</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <UpdateDayForm
                      day={selectedDay}
                      handleClose={handleUpdateDayModalClose}
                    />
                  </Modal.Body>
                </Modal>
              </Modal.Header>
              <Modal.Body>
                <WorkoutList day={day.day_number} workouts={day.workouts} />
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
      <Button
        className="mb-2"
        variant="outline-secondary"
        size="sm"
        onClick={() => setShowCreateDayModal(true)}
      >
        Create a new Day
      </Button>
      <Modal show={showCreateDayModal} onHide={handleCreateDayModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Day</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateDayForm
            week_number={props.week_number}
            handleClose={handleCreateDayModalClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DayList;

// PREVIOUS CODE BEFORE ADDING UPDATE FUNCTIONALITY
// import "../App.css"
// // import WorkoutList from './WorkoutList';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import React, {useState} from 'react';
// import Container from 'react-bootstrap/Container';
// import WorkoutList from "./WorkoutList";

// function DayList (props) {
//   // Create a state variable to keep track of which workout was clicked
//   const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
//   // Create a function to handle when a workout button is clicked
//   const handleWorkoutClick = (index) => {
//     setSelectedWorkoutIndex(index);
//   };
//   // Create a function to handle closing the modal
//   const handleClose = () => setSelectedWorkoutIndex(null);

//   const renderDays = () => {
//     if (!props.days) {
//       return 'Hello there is nothing'
//     }

//     // lists only the days that are in the week
//     return (
//       <>
//         {props.days.map((day, index) => (
//           <div key={index-1}>
//             <Button
//               key={index}
//               variant="primary"
//               // day={day.day_number}
//               // workouts={day.workouts}
//               onClick={() => handleWorkoutClick(index)} // Pass the workout index to the click handler function
//             >
//               DAY {day.day_number.slice(-1)}
//             </Button>
//             <p></p>
//             <Modal className="backdrop"
//               show={selectedWorkoutIndex === index}
//               onHide={handleClose}
//               backdrop={false}
//               >
//                 <Modal.Header closeButton>
//                   <Modal.Title>
//                     Day {day.day_number.slice(-1)}, Week {day.day_number.slice(0,1)} Workout
//                   </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 <WorkoutList
//                     day={day.day_number}
//                     workouts={day.workouts}
//                   />
//                 </Modal.Body>
//               </Modal>
//             </div>
//         ))}
//       </>
//     )
//   }

//     return (
//     <div>
//       <div className="list-container">
//         { renderDays() }
//       </div>
//     </div>
//   )
// }

// export default DayList
