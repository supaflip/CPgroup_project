import React, {useState} from 'react';

function WorkoutList(props) {

  const renderWorkouts = () => {
    if (!props.workouts) {
      return 'Hello there is nothing'; // Change to 'There are no workouts yet' or null when done testing
    }

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