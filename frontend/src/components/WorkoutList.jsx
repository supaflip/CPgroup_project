import React, {useState} from 'react';
import { Button } from "react-bootstrap";
import UpdateWorkoutForm from './UpdateWorkoutForm';

function WorkoutList(props) {

  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const srcPage = window.location.pathname;

  /* FUNCTIONS */
  const handleShowModal = () => setShowModal(true);
  

  const renderWorkouts = () => {
    if (!props.workouts) {
      return 'Hello there is nothing'; // Change to 'There are no workouts yet' or null when done testing
    }

    console.log(props.workouts)

    return (
      <>
        {props.workouts.map((workout, index) => (
          <div key={index+1}>
            <b>{workout.title}</b>
            {workout.note && <p style={{marginBottom: "0.1rem"}}>{workout.note}</p>}
            {workout.sets && workout.reps && <p style={{marginBottom: "0.1rem"}}>Perform {workout.sets} sets of {workout.reps} reps</p>}
            {workout.percentage && <p>at {workout.percentage}% of your 1 rep max.</p>}
          </div>
        ))}
        <Button variant="primary" onClick={handleShowModal}>Update</Button>
        <UpdateWorkoutForm
                showModal={showModal}
                setShowModal={setShowModal}
                workouts={props.workouts}
                />
      </>
    );
  };

  return (
    <div>
      <div className="list-container">
        {renderWorkouts()}
      </div>
    </div>
  );
}

export default WorkoutList;
