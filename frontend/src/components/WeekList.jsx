import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import DayList from "./DayList";
import "../index.css";

function WeekList(props) {
  const renderWeeks = () => {
    if (!props.weeks) {
      return "Hello there is nothing"; // change to null when done testing
    }

    return (
      <Container>
        <div className="grid-container">
          {Array.from(props.weeks).map((week, index) => (
            <Card eventkey={index} key={index} className="grid-item">
              <Card.Header>WEEK {week.week_number}</Card.Header>
              <Card.Body>
                <DayList week_number={week.week_number} days={week.days} USER_AUTH={props.USER_AUTH}/>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    );
  };

  return (
    <div>
      <h3>Bar Path Program</h3>
      <br></br>
      <div className="list-container">{renderWeeks()}</div>
      <br></br>
      <br></br>
    </div>
  );
}

export default WeekList;

// import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import DayList from "./DayList";

// function WeekList(props) {
//   const renderWeeks = () => {
//     if (!props.weeks) {
//       return "Hello there is nothing"; // change to null when done testing
//     }

//     return (
//       <Container>
//         <Row>
//           {Array.from(props.weeks)
//             .slice(0, 5)
//             .map((week, index) => (
//               <Col className="mb-4" key={index}>
//                 <Card eventkey={index}>
//                   <Card.Header>WEEK {week.week_number}</Card.Header>
//                   <Card.Body>
//                     <DayList week_number={week.week_number} days={week.days} />
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//         </Row>
//         <Row>
//           {Array.from(props.weeks)
//             .slice(5, 10)
//             .map((week, index) => (
//               <Col key={index}>
//                 <Card>
//                   <Card.Header>WEEK {week.week_number}</Card.Header>
//                   <Card.Body>
//                     <DayList week_number={week.week_number} days={week.days} />
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//         </Row>
//       </Container>
//     );
//   };

//   return (
//     <div>
//       <h3>Bar Path Program</h3>
//       <br></br>
//       <div className="list-container">{renderWeeks()}</div>
//       <br></br>
//       <br></br>
//     </div>
//   );
// }

// export default WeekList;
