import React from "react";
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DayList from "./DayList";
// import '../App.css';

function WeekList (props) {
  
  const renderWeeks = () => {
    
    if (!props.weeks) {
      return 'Hello there is nothing'  // change to null when done testing
    }



      return (
        <Container>
        <Row>
        {Array.from(props.weeks).slice(0,5).map((week, index) => (
          <Col>
          <Card eventKey={index}>
            <Card.Header>
              WEEK {week.week_number}
            </Card.Header>
            <Card.Body>
              <Link to={`week/${week.week_number}/`}>
                Days
              </Link>
            </Card.Body>
          </Card>
          </Col>
        ))}
      </Row>
      <Row>
        {Array.from(props.weeks).slice(5,10).map((week, index) => (
          <Col>
          <Card eventKey={index}>
            <Card.Header>
              WEEK {week.week_number}
            </Card.Header>
            <Card.Body>
              <Link to={`week/${week.week_number}/`}>
                Go to Days Page
              </Link>
            </Card.Body>
          </Card>
          </Col>
        ))}
      </Row>
      </Container>
  )};


  console.log("Weeks data in Weeklist", props.weeks) // delete when done testing
  

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


export default WeekList;


//  this is the return statement from before cards were integrated into weeklist
//    return props.weeks.map((week, index) => {
//      return (
//        <div>
//          <div key={index} >
//            <p><Link to={`week/${week.week_number}/`}>WEEK { week.week_number }</Link></p>
//          </div>
//        </div>
//      )
//    })
//  }


          {/* // <Accordion defaultActiveKey="0">
            // <Accordion.Item eventKey={index}>
                  // <Accordion.Header> */}
                  {/* // </Accordion.Header>
                  // <Accordion.Body> */}
                  {/* // </Accordion.Body>
            // </Accordion.Item>
          // </Accordion> */}


// import { Link } from "react-router-dom";

// function WeekList(props) {
//   const renderWeeks = () => {
//     if (!props.weeks) {
//       return "Hello there is nothing"; // change to null when done testing
//     }

//     return props.weeks.map((week, index) => {
//       return (
//         <div>
//           <div key={index}>
//             <p>
//               <Link to={`week/${week.week_number}/`}>
//                 WEEK {week.week_number}
//               </Link>
//             </p>
//           </div>
//         </div>
//       );
//     });
//   };

//   // console.log(props.weeks)
//   // console.log("Weeks in WeekList:", props.weeks);

//   return (
//     <div>
//       <h3>Select the Week</h3>
//       <br></br>
//       <div className="list-container">
//         <p>{renderWeeks()}</p>
//       </div>
//       <br></br>
//       <br></br>
//       <Link to="/profile/">
//         <button className="btn btn-primary btn-sm">See All Profiles</button>
//       </Link>
//     </div>
//   );
// }

// export default WeekList;

