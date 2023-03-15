import DayList from "../components/DayList";
import { useParams } from "react-router-dom";
import React from "react";
import { Routes, Route } from "react-router-dom";
import DayPage from "./DayPage.jsx";

function WeekPage({ weeks }) {
  const params = useParams();

  const answer = weeks.find((week) => week.week_number === params.week_number);

  console.log("Days in WeekPage:", params.week_number); // delete when done testing

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
              <DayList days={answer.days} />
            </div>
          }
        />
        <Route
          path="/day/:day_number/*"
          element={<DayPage days={answer.days} />}
        />
      </Routes>
    </div>
  );
}

export default WeekPage;
