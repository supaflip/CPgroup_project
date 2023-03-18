import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WorkoutModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const renderWorkouts = () => {
    if (!props.workouts) {
      return 'Hello there is nothing' // change to 'There are no workouts yet' or null when done testing
    }

  return props.workouts.map((workout, index) => {
    return (
    <>
      <Button variant="primary" onClick={handleShow}>
        { workout.title }
      </Button>

      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {workout.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Workout Body
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
    </>
      )
    })
  }

  return (
    <div>
      <div className="list-container">
        {renderWorkouts()}
      </div>
    </div>
  )
}

export default WorkoutModal;