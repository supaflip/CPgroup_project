import { Link } from "react-router-dom"
import React from "react";
// import '../App.css';

function WeekList (props) {
  

  const renderWeeks = () => {
    if (!props.weeks) {
      return 'Hello there is nothing'  // change to null when done testing
    }
    
    return props.weeks.map((week, index) => {
      return (
        <div>
          <div key={index} >
            <p><Link to={`week/${week.week_number}/`}>WEEK { week.week_number }</Link></p>
          </div>
        </div>
      )
    })
  }

  console.log(props.weeks)
  // console.log("Weeks in WeekList:", props.weeks);  // delete when done testing

  return (
    <div className="workoutcontainer">
      <img src='https://cdn.shopify.com/s/files/1/0052/7043/7978/articles/progression-principle-weight-training-conditioning.jpg?v=1635639104' alt='weeklistpage' width='1200'></img>
      <h3 className="centered">Select the Week</h3>
      <br></br>
      <div className="list-container">
        <p>{ renderWeeks() }</p>
      </div>
      <br></br>
      <br></br>
    </div>
  )
}

export default WeekList