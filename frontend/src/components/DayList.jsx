import { Link } from "react-router-dom"
import "../App.css"

function DayList (props) {
  
  const renderDays = () => {
    if (!props.days) {
      return 'Hello there is nothing' 
    }
    
    // lists only the days that are in the week
    return props.days.map((day, index) => {
      return (
        <div>
        <div key={index}>
          <p><Link to={`day/${day.day_number}/`}>DAY { day.day_number.slice(-1) }</Link></p>
          </div>
        </div>
      )
    })
  }
  
    return (
    <div>
      <h3>Select the Day</h3>
      <br></br>
      <div className="list-container">
        <p>{ renderDays() }</p>
      </div>
    </div>
  )
}

export default DayList