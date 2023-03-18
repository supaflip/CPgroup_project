import { Link } from "react-router-dom"
import "../App.css"

function WorkoutList (props) {
  
  const renderWorkouts = () => {
    if (!props.workouts) {
      return 'Hello there is nothing' // change to 'There are no workouts yet' or null when done testing
    }
    
    
    return props.workouts.map((workout, index) => {
      return (
        <p><Link to={`workout/${workout.id}/`}> { workout.title }</Link></p>
      )
    })
  }
  
  console.log(props.workouts)
  // console.log("Workouts in WorkoutList:", props.workouts);  // delete when done testing

  return (
    <div>
      <h3>Select the Exercise</h3>
      <br></br>
      <div className="list-container">
        <p>{ renderWorkouts() }</p>
      </div>
    </div>
  )
}

export default WorkoutList