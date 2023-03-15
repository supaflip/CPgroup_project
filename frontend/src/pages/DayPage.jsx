import WorkoutList from "../components/WorkoutList";
import { useParams } from "react-router-dom";
import React from "react";
import { Routes, Route } from "react-router-dom";
import WorkoutPage from "./WorkoutPage.jsx";

function DayPage({ days }) {
  const params = useParams();

  const answer = days.find((day) => day.day_number === params.day_number);

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
          element={<WorkoutPage workouts={answer.workouts} />}
        />
      </Routes>
    </div>
  );
}

export default DayPage;
