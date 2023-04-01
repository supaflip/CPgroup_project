import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UpdateWorkoutForm from "./UpdateWorkoutForm";

function WorkoutList(props) {
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
  const [showUpdateWorkoutModal, setShowUpdateWorkoutModal] = useState(false);

  const handleUpdateWorkoutClick = (index) => {
    setSelectedWorkoutIndex(index);
    setShowUpdateWorkoutModal(true);
  };

  const handleCloseUpdateWorkoutModal = () => {
    setShowUpdateWorkoutModal(false);
  };

  const renderWorkouts = () => {
    if (!props.workouts) {
      return "Hello there is nothing"; // Change to 'There are no workouts yet' or null when done testing
    }

    return (
      <>
        {props.workouts.map((workout, index) => (
          <div key={index + 1}>
            <b>{workout.title}</b>
            {workout.note && (
              <p style={{ marginBottom: "0.1rem" }}>{workout.note}</p>
            )}
            {workout.sets && workout.reps && (
              <p style={{ marginBottom: "0.1rem" }}>
                Perform {workout.sets} sets of {workout.reps} reps
              </p>
            )}
            {workout.percentage && (
              <p>at {workout.percentage}% of your 1 rep max.</p>
            )}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleUpdateWorkoutClick(index)}
            >
              Update Workout
            </Button>
            <Modal
              show={showUpdateWorkoutModal && selectedWorkoutIndex === index}
              onHide={handleCloseUpdateWorkoutModal}
              backdrop={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Update Workout</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UpdateWorkoutForm
                  workout={workout}
                  handleClose={handleCloseUpdateWorkoutModal}
                />
              </Modal.Body>
            </Modal>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="list-container">{renderWorkouts()}</div>
    </div>
  );
}

export default WorkoutList;

// PREVIOUS CODE BEFORE UPDATE FUNCTIONALITY WAS ADDED
// import React, {useState} from 'react';

// function WorkoutList(props) {

//   const renderWorkouts = () => {
//     if (!props.workouts) {
//       return 'Hello there is nothing'; // Change to 'There are no workouts yet' or null when done testing
//     }

//     return (
//       <>
//         {props.workouts.map((workout, index) => (
//           <div key={index+1}>
//             <b>{workout.title}</b>
//             {workout.note && <p style={{marginBottom: "0.1rem"}}>{workout.note}</p>}
//             {workout.sets && workout.reps && <p style={{marginBottom: "0.1rem"}}>Perform {workout.sets} sets of {workout.reps} reps</p>}
//             {workout.percentage && <p>at {workout.percentage}% of your 1 rep max.</p>}
//           </div>
//         ))}
//       </>
//     );
//   };

//   return (
//     <div>
//       <div className="list-container">
//         {renderWorkouts()}
//       </div>
//     </div>
//   );
// }

// export default WorkoutList;
