import React, { useState } from "react";
import { Button } from "react-bootstrap";
import UpdateWorkoutForm from "./UpdateWorkoutForm";
import { Navigate } from "react-router-dom";

function WorkoutList(props) {
  //console.log("WorkoutList Props", props.USER_AUTH); // Delete when done testing

  const [showModal, setShowModal] = useState(false);

  const srcPage = window.location.pathname;

  /* FUNCTIONS */
  const handleShowModal = () => setShowModal(true);

  const guestRedirect = () => {
    return <Navigate to="/app" />;
  };

  const coachUpdateButton = () => {
    return (
      <>
        <Button variant="primary" onClick={handleShowModal}>
          Update
        </Button>
        <UpdateWorkoutForm
          showModal={showModal}
          setShowModal={setShowModal}
          workouts={props.workouts}
        />
      </>
    );
  };

  const userInterface = () => {
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
          </div>
        ))}
        {props.USER_AUTH["is_coach"] && coachUpdateButton()}
      </>
    );
  };
  
    
  return (
  <div>
    {props.USER_AUTH["TOKEN"] ? userInterface() : guestRedirect()}
  </div>
  );
}

export default WorkoutList;




// PREVIOUS CODE
// import React, {useState} from 'react';
// import { Button } from "react-bootstrap";
// import UpdateWorkoutForm from './UpdateWorkoutForm';

// function WorkoutList(props) {

//   console.log("WorkoutList Props", props.USER_AUTH) // Delete when done testing

//   const [showModal, setShowModal] = useState(false);

//   const srcPage = window.location.pathname;

//   /* FUNCTIONS */
//   const handleShowModal = () => setShowModal(true);

//   const renderWorkouts = () => {
//     if (!props.workouts) {
//       return 'Hello there is nothing'; // Change to 'There are no workouts yet' or null when done testing
//     }

//     console.log(props.workouts)

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
//         <Button variant="primary" onClick={handleShowModal}>Update</Button>
//         <UpdateWorkoutForm
//                 showModal={showModal}
//                 setShowModal={setShowModal}
//                 workouts={props.workouts}
//                 />
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
