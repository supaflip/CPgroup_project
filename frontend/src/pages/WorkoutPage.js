import { useParams } from "react-router-dom";
import React from "react";

function WorkoutPage({ workouts }) {
  const params = useParams();
  const exercise = workouts.find(
    (workout) => workout.id.toString() === params.workoutID
  );

  return (
    <div>
      <br></br>
      <h2>Bar Path Program</h2>
      <hr />
      <br></br>
      <h4>{exercise.title}</h4>
      <div className="workout_breakdown">
        {exercise.note && <p>{exercise.note}</p>}
        {exercise.sets && exercise.reps && (
          <p>
            Perform {exercise.sets} sets of {exercise.reps} reps
          </p>
        )}
        {exercise.percentage && (
          <p>at {exercise.percentage}% of your 1 rep max</p>
        )}
      </div>
    </div>
  );
}

export default WorkoutPage;
