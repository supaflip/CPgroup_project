import Accordion from 'react-bootstrap/Accordion';
import "../App.css"
import WorkoutModal from './WorkoutList';

function DayList (props) {
  
  const renderDays = () => {
    if (!props.days) {
      return 'Hello there is nothing' 
    }
    
    // lists only the days that are in the week
    return props.days.map((day, index) => {
      return (
        <div key={index}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item>
              <Accordion.Header>
                    DAY {day.day_number.slice(-1)}
                  </Accordion.Header>
                  <Accordion.Body>
                    <WorkoutModal
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
        { renderDays() }
      </div>
    </div>
  )
}

export default DayList