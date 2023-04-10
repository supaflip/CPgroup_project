import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

function RandomWorkoutUI(props) {
  //console.log(props.randomWorkout.name)
  let name = props.randomWorkout.name
  let equipment = props.randomWorkout.equipment
  let type = props.randomWorkout.type
  let instructions = props.randomWorkout.instructions
  let musclegroup = props.randomWorkout.muscle
  //console.log(equipment)
  
  if (equipment === "body_only"){
    equipment = "Body Only"
  }
  if (equipment === "e-z_curl_bar"){
    equipment = "EZ Curl Bar"
  }
  if (type === "olympic_weightlifting"){
    type = "Olympic Weightlifting"
  }
  if (name === "Glute ham raise-"){
    name = "Glute Ham Raise"
  }
  if (musclegroup === "lower_back"){
    musclegroup = "Lower Back"
  }
  if (musclegroup === "middle_back"){
    musclegroup = "Middle Back"
  }
  let instructionsfinal = instructions.replace('â€™', '\'')
  instructionsfinal = instructions.replace('\\"V\\"', '\"V\"')
  instructionsfinal = instructions.replace('\\"kick\\"', '\"kick\"')

  //console.log(instructionsfinal)


  return (
    <div className="backdrop">
    <div className="popup-overlay">
      <h5>{props.randomWorkout.name}</h5>
      <hr></hr>
      <p>{instructionsfinal}</p>
      <hr></hr>
      <Container className='fontsize10'>
        <Row className="textaligncenter">
          <Col className="mb-1" >
          <p>Muscle Group: {musclegroup.charAt(0).toUpperCase() + musclegroup.slice(1)}</p>
          </Col>
          <Col>
          <p>Difficulty: {props.randomWorkout.difficulty.charAt(0).toUpperCase() + props.randomWorkout.difficulty.slice(1)}</p>
          
          </Col>
      </Row>
      <Row className="textaligncenter">
          <Col className="mb-1">
          <h7>Equipment: {equipment.charAt(0).toUpperCase() + equipment.slice(1)}</h7>
          </Col>
          <Col>
          <h7>Type: {type.charAt(0).toUpperCase() + type.slice(1)}</h7>
          </Col>
      </Row>
      </Container>
      <br></br>
      <Button variant="primary" onClick={props.onClose}>Okay</Button>
    </div>
    </div>
  );
}

export default RandomWorkoutUI;
