import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RandomWorkoutUI(props) {
  console.log(props.randomWorkout.name)
  return (
    <div className="backdrop">
    <div className="popup-overlay">
      <h5>{props.randomWorkout.name}</h5>
      <hr></hr>
      <p>{props.randomWorkout.instructions}</p>
      <hr></hr>
      <Container className='fontsize10'>
        <Row className="textaligncenter">
          <Col className="mb-1" >
          <p>Muscle Group: {props.randomWorkout.muscle.charAt(0).toUpperCase() + props.randomWorkout.muscle.slice(1)}</p>
          </Col>
          <Col>
          <p>Difficulty: {props.randomWorkout.difficulty.charAt(0).toUpperCase() + props.randomWorkout.difficulty.slice(1)}</p>
          
          </Col>
      </Row>
      <Row className="textaligncenter">
          <Col className="mb-1">
          <h7>Equipment: {props.randomWorkout.equipment.charAt(0).toUpperCase() + props.randomWorkout.equipment.slice(1)}</h7>
          </Col>
          <Col>
          <h7>Type: {props.randomWorkout.type.charAt(0).toUpperCase() + props.randomWorkout.type.slice(1)}</h7>
          </Col>
      </Row>
      </Container>
      <br></br>
      <button className="btn" onClick={props.onClose}>Okay</button>
    </div>
    </div>
  );
}

export default RandomWorkoutUI;
