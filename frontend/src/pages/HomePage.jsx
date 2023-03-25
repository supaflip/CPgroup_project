import { useState, useEffect } from "react";
import API from "../api/API";
import WeekList from "../components/WeekList";
import { Routes, Route } from "react-router-dom";
import WeekPage from './WeekPage.jsx'
import { Navigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

function HomePage({loggedin}) {
  const [weeks, setWeeks] = useState([]);  // holds all week, day, and workout data in 1 file
  
  useEffect(() => {
    const getWeeks = async () => {
      const data = await API.fetchWeeks();
      if (data) {
        setWeeks(data.result);  
      }
    };
    getWeeks();
  }, []);

  // const params = useParams()
  console.log("Homepage", weeks); // delete when done testing
  

  return (
    <div>
      {!loggedin && <Navigate to="/app" />}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <br></br>
              <hr />
              <WeekList weeks={weeks} />
            </div>
          }
        />
        <Route
          path="/week/:week_number/*"
          element={<WeekPage weeks={weeks}/>}
        />
      </Routes>
      <br></br>
      <br></br>
    </div>
  );
}

export default HomePage;