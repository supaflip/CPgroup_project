import Accordion from 'react-bootstrap/Accordion';
import "../App.css"
import WorkoutList from "./WorkoutList";

function DayList (props) {
  
  const renderDays = () => {
    if (!props.days) {
      return 'Hello there is nothing' 
    }
    
    // lists only the days that are in the week
    return props.days.map((day, index) => {
      return (
        <div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item key={index} eventkey={index}>
              <Accordion.Header>
                    DAY {day.day_number.slice(-1)}
                  </Accordion.Header>
                  <Accordion.Body>
                    <WorkoutList
                      day={day.day_number}
                      workouts={day.workouts}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
        </div>
      )
    })
  }
  
    return (
    <div>
      <div className="list-container">
        <p>{ renderDays() }</p>
      </div>
    </div>
  )
}

export default DayList