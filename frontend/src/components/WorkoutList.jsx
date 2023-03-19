import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

function WorkoutList(props) {
  // Create a state variable to keep track of which workout was clicked
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
  // Create a function to handle when a workout button is clicked
  const handleWorkoutClick = (index) => {
    setSelectedWorkoutIndex(index);
  };
  // Create a function to handle closing the modal
  const handleClose = () => setSelectedWorkoutIndex(null);
  
  const renderWorkouts = () => {
    if (!props.workouts) {
      return 'Hello there is nothing'; // Change to 'There are no workouts yet' or null when done testing
    }

    return (
      <>
        {props.workouts.map((workout, index) => (
          <div key={index}>
            <Button
              key={index+1}
              variant="primary"
              onClick={() => handleWorkoutClick(index)} // Pass the workout index to the click handler function
            >
              {workout.title}
            </Button>
            <Container>
              <Modal
                show={selectedWorkoutIndex === index} // Show the modal only if the selected workout index matches the current index
                onHide={handleClose}
                backdrop={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    {workout.title}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {workout.note}<br/>
                  <p>Perform {workout.sets} sets of {workout.reps} reps.</p>
                  <p>at {workout.percentage}% of your 1 rep max.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>      
            </Container>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="list-container">
        {renderWorkouts()}
      </div>
    </div>
  );
}

export default WorkoutList;