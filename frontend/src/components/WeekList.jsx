import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DayList from "./DayList";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CreateWeekForm from "./CreateWeekForm";
import UpdateWeekForm from "./UpdateWeekForm";


function WeekList(props) {
  const [showCreateWeekModal, setShowCreateWeekModal] = useState(false);
  const [showUpdateWeekModal, setShowUpdateWeekModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);

  // Closes modals when no longer needed
  const handleCreateWeekModalClose = () => setShowCreateWeekModal(false);
  const handleUpdateWeekModalClose = () => {
    setShowUpdateWeekModal(false);
    setSelectedWeek(null);
  };

  // Opens Update Week modal
  const handleUpdateWeekModalOpen = (week_number) => {
    setSelectedWeek(week_number);
    setShowUpdateWeekModal(true);
  };

  const renderWeeks = () => {
    if (!props.weeks) {
      return "Hello there is nothing"; // change to null when done testing
    }

    return (
      <Container>
        <Row>
          {Array.from(props.weeks)
            .slice(0, 5)
            .map((week, index) => (
              <Col className="mb-4" key={index}>
                <Card eventkey={index}>
                  <Card.Header>
                    WEEK {week.week_number}
                    <Button
                      className="mt-2"
                      variant="outline-secondary"
                      onClick={handleUpdateWeekModalOpen}
                    >
                      Update this Week
                    </Button>
                    <Modal
                      show={showUpdateWeekModal}
                      onHide={handleUpdateWeekModalClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Update Week</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {selectedWeek && (
                          <UpdateWeekForm
                            week={selectedWeek}
                            handleClose={handleUpdateWeekModalClose}
                          />
                        )}
                      </Modal.Body>
                    </Modal>
                  </Card.Header>
                  <Card.Body>
                    <DayList week_number={week.week_number} days={week.days} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <Row>
          {Array.from(props.weeks)
            .slice(5, 10)
            .map((week, index) => (
              <Col key={index}>
                <Card>
                  <Card.Header>
                    WEEK {week.week_number}
                    <Button
                      className="mt-2"
                      variant="outline-secondary"
                      onClick={handleUpdateWeekModalOpen}
                    >
                      Update this Week
                    </Button>
                    <Modal
                      show={showUpdateWeekModal}
                      onHide={handleUpdateWeekModalClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Update Week</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {selectedWeek && (
                          <UpdateWeekForm
                            week={selectedWeek}
                            handleClose={handleUpdateWeekModalClose}
                          />
                        )}
                      </Modal.Body>
                    </Modal>
                  </Card.Header>
                  <Card.Body>
                    <DayList week_number={week.week_number} days={week.days} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    );
  };

  return (
    <div>
      <h3>Select the Workout</h3>
      <br></br>
      <Button
        className="mb-4"
        variant="secondary"
        onClick={() => setShowCreateWeekModal(true)}
      >
        Create a new Week
      </Button>
      <Modal show={showCreateWeekModal} onHide={handleCreateWeekModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new Week</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateWeekForm handleClose={handleCreateWeekModalClose} />
        </Modal.Body>
      </Modal>
      <div className="list-container">{renderWeeks()}</div>
      <br></br>
      <br></br>
    </div>
  );
}

export default WeekList;

// PREVIOUS CODE BEFORE ADDING UPDATE FUNCTIONALITY
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import DayList from "./DayList";
// // import '../App.css';

// function WeekList(props) {
//   const renderWeeks = () => {

//     if (!props.weeks) {
//       return "Hello there is nothing"; // change to null when done testing
//     }

//       return (
//         <Container>
//         <Row>
//         {Array.from(props.weeks).slice(0,5).map((week, index) => (
//           <Col className="mb-4" key={index}>
//           <Card eventkey={index}>
//             <Card.Header>
//               WEEK {week.week_number}
//             </Card.Header>
//             <Card.Body>
//               <DayList
//                 week_number={week.week_number}
//                 days={week.days}
//               />
//             </Card.Body>
//           </Card>
//           </Col>
//         ))}
//       </Row>
//       <Row>
//         {Array.from(props.weeks).slice(5,10).map((week, index) => (
//           <Col key={index}>
//           <Card>
//             <Card.Header>
//               WEEK {week.week_number}
//             </Card.Header>
//             <Card.Body>
//             <DayList
//                 week_number={week.week_number}
//                 days={week.days}
//               />
//             </Card.Body>
//           </Card>
//           </Col>
//         ))}
//       </Row>
//       </Container>
//   )};

//   return (
//     <div>
//       <h3>Select the Workout</h3>
//       <br></br>
//       <div className="list-container">
//         {renderWeeks()}
//       </div>
//       <br></br>
//       <br></br>
//     </div>
//   );
// }

// export default WeekList;
