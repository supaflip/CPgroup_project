import { Link } from "react-router-dom";
import "../App.css";

function WorkoutList(props) {
  const renderWorkouts = () => {
    if (!props.workouts) {
      return "There are no workouts yet";
    }

    return props.workouts.map((workout, index) => {
      return (
        <p>
          <Link to={`workout/${workout.id}/`}> {workout.title}</Link>
        </p>
      );
    });
  };

  return (
    <div>
      <h3>Select the Exercise</h3>
      <br></br>
      <div className="list-container">
        <p>{renderWorkouts()}</p>
      </div>
    </div>
  );
}

export default WorkoutList;
