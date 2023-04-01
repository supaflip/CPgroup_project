import { useState, useEffect } from "react";
import API from "../api/API";
import RandomWorkoutUI from "../components/RandomWorkoutUI";
import { confirmAlert } from "react-confirm-alert";
import { BrowserRouter } from "react-router-dom";

function RandomWorkoutPage({USER_AUTH}) {


const [select, setSelect] = useState("Abdominals");
const [isExpanded, setIsExpanded] = useState(false);


const handleButtonClick = () => {
  setShowUpdateForm(true);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const getWorkout = async () => {
    const data = await API.fetchMuscleWorkout(select);
    if (data) {
      
      handleUI(data)
    }
  };
  getWorkout()
  
};


const handleUI = (data) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <BrowserRouter>
          <RandomWorkoutUI randomWorkout={data} onClose={onClose}/>   
        </BrowserRouter>       
      );
    }
  });
};

  return (
    <div className='container'>
      <div className='jumbotron mt-5'>
      <h2>Need help deciding on a workout?</h2>
      <form>
        <hr></hr>
        <p>Choose a muscle group below and click search</p>
        <select onChange={(e) => setSelect(e.target.value)}>
          <option value="abdominals">Abdominals</option>
          <option value="abductors">Abductors</option>
          <option value="adductors">Adductors</option>
          <option value="biceps">Biceps</option>
          <option value="calves">Calves</option>
          <option value="chest">Chest</option>
          <option value="forearms">Forearms</option>
          <option value="glutes">Glutes</option>
          <option value="hamstrings">Hamstrings</option>
          <option value="lats">Lats</option>
          <option value="lower_back">Lower Back</option>
          <option value="middle_back">Middle Back</option>
          <option value="neck">Neck</option>
          <option value="quadriceps">Quadriceps</option>
          <option value="traps">Traps</option>
          <option value="triceps">Triceps</option>
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


