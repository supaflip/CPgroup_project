import WorkoutList from "../components/WorkoutList"
import { useParams } from "react-router-dom"
import React from "react"
import { Routes, Route } from "react-router-dom";
import WorkoutPage from './WorkoutPage.jsx'


function DayPage({days}) {
   
  const params = useParams()

  // console.log(params.day_number) // delete when done testing. day_number for use to show only the days under that week
  const answer = days.find(day => day.day_number === params.day_number)
  
  // console.log("Workouts in DayPage", workouts); // delete when done testing

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <br></br>
              <h2>Bar Path Program</h2>
              <hr />
              <WorkoutList workouts={answer.workouts} />
            </div>
          }
        />
        <Route
          path="/workout/:workoutID/*"
          element={<WorkoutPage workouts={answer.workouts}/>}
        />
      </Routes>
      
    </div>
  )
}

export default DayPage