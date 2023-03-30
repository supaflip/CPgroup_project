import { useState, useEffect } from "react";
import API from "../api/API";
import UpdateProfileForm from "../components/UpdateProfileForm";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";

function RandomWorkoutPage({USER_AUTH}) {


const [select, setSelect] = useState("biceps");
const [isExpanded, setIsExpanded] = useState(false);

const handleButtonClick = () => {
  setShowUpdateForm(true);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  API.fetchMuscleWorkout(select);
};

const handleToggle = () => {
  setIsExpanded(!isExpanded);
};
  return (
    <div className='container'>
      <div className='jumbotron mt-5'>
      <h2>Need help deciding on a workout?</h2>
      <form>
        <hr></hr>
        <p>Choose a muscle group below and click search</p>
        <select onChange={(e) => setSelect(e.target.value)}>
          <option value="biceps">Biceps</option>
          <option value="chest">Chest</option>
          <option value="glutes">Glutes</option>
        </select>
        <br></br>
        <br></br>
        <button className='btn btn-primary btn-lg' type="submit" onClick={handleFormSubmit}>
          Search
        </button>
      </form>
      </div>
    </div>
  );
}

export default RandomWorkoutPage;


// NOT SURE WHERE THIS SHOULD BE

// const [showUpdateForm, setShowUpdateForm] = useState(false);
// const [select, setSelect] = useState("biceps");
// const [isExpanded, setIsExpanded] = useState(false);

// const handleButtonClick = () => {
//   setShowUpdateForm(true);
// };

// const handleFormSubmit = (e) => {
//   e.preventDefault();
//   API.fetchMuscleWorkout(select);
// };

// const handleToggle = () => {
//   setIsExpanded(!isExpanded);
// };

{/* <form>
<select onChange={(e) => setSelect(e.target.value)}>
  <option value="biceps">biceps</option>
  <option value="chest">chest</option>
  <option value="glutes">glutes</option>
</select>
<br></br>
<button type="submit" onClick={handleFormSubmit}>
  Search
</button>
</form> */}


