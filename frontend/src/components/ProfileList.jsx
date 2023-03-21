import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Button from "react-bootstrap/Button";
// import Accordion from "react-bootstrap/Accordion";


function ProfileList(props) {
  const profileKeys = Object.keys(props.profiles);

  const renderProfiles = () => {
    if (!props.profiles) {
      return "No profile exists"; // change to null when done testing
    }

    return profileKeys.map((key) => {
      const profile = props.profiles[key];
      const [isExpanded, setIsExpanded] = useState(false);

      const handleToggle = () => {
        setIsExpanded(!isExpanded);
      };

      // "md={3}" means Col component takes up 3 out of 12 grid columns
      return (
        <Col key={profile.id} md={3}>    
          <Card>
            <Card.Header>
              <Card.Title>Athlete # {profile.id}</Card.Title>
              <Button variant="outline-primary" size="sm" onClick={handleToggle}>
                {isExpanded ? "Hide" : "Stats"}
              </Button>
            </Card.Header>
            {isExpanded && (
              <div className="profile_breakdown">
                <Card.Body>
                  <p>
                    Snatch:{" "}
                    {profile.weights === 1
                      ? `${profile.max_snatch} LB`
                      : `${profile.max_snatch} KG`}
                  </p>
                  <p>
                    C&J:{" "}
                    {profile.weights === 1
                      ? `${profile.max_cleanjerk} LB`
                      : `${profile.max_cleanjerk} KG`}
                  </p>
                  <p>
                    FS:{" "}
                    {profile.weights === 1
                      ? `${profile.max_frontsquat} LB`
                      : `${profile.max_frontsquat} KG`}
                  </p>
                  <p>
                    BS:{" "}
                    {profile.weights === 1
                      ? `${profile.max_backsquat} LB`
                      : `${profile.max_backsquat} KG`}
                  </p>
                </Card.Body>
              </div>
            )}
          </Card>
        </Col>
      );
    });
  };

  const rows = [];
  let currentRow = [];

  renderProfiles().forEach((col, index) => {
    currentRow.push(col);

    if (currentRow.length === 4 || index === profileKeys.length - 1) {
      rows.push(
        <Row key={`row-${index}`} className="mb-3">
          {currentRow}
        </Row>
      );
      currentRow = [];
    }
  });

  return (
    <div>
      <h3>All Profiles</h3>
      <br></br>
      <div className="list-container">{rows}</div>
    </div>
  );
}

export default ProfileList;

// function ProfileList(props) {
//   const renderProfiles = () => {
//     if (!props.profiles) {
//       return "No profile exists"; // change to null when done testing
//     }

//     const profileKeys = Object.keys(props.profiles);
//     // const [isExpanded, setIsExpanded] = useState(false); // toggle button for stats

//     const handleToggle = () => {
//       setIsExpanded(!isExpanded);
//     };

//     return (
//       <Container>
//         {profileKeys.map((key, index) => {
//           const profile = props.profiles[key];
//           const [isExpanded, setIsExpanded] = useState(false); // toggle button for stats

//           const handleToggle = () => {
//             setIsExpanded(!isExpanded);
//           };

//           if (index % 4 === 0) {
//             // Starts a new row for every 4 cards ("md={3}" means Col component takes up 3 out of 12 grid columns, meaning there are 4 columns/cards per row)
//             return (
//               <Row key={`row-${index}`} className="mb-3">
//                 {profileKeys.slice(index, index + 4).map((key) => {
//                   const profile = props.profiles[key];

//                   return (
//                     <Col key={profile.id} md={3}>
//                       <Card>
//                         <Card.Header>
//                           <Card.Title>Athlete # {profile.id}</Card.Title>
//                           <Button onClick={handleToggle}>
//                             {isExpanded ? 'Hide' : 'Show'}
//                           </Button>
//                         </Card.Header>
//                         {isExpanded && (
//                           <div className="profile_breakdown">
//                             <Card.Body>
//                               <p>
//                                 Snatch:{" "}
//                                 {profile.weights === 1
//                                   ? `${profile.max_snatch} LB`
//                                   : `${profile.max_snatch} KG`}
//                               </p>
//                               <p>
//                                 C&J:{" "}
//                                 {profile.weights === 1
//                                   ? `${profile.max_cleanjerk} LB`
//                                   : `${profile.max_cleanjerk} KG`}
//                               </p>
//                               <p>
//                                 FS:{" "}
//                                 {profile.weights === 1
//                                   ? `${profile.max_frontsquat} LB`
//                                   : `${profile.max_frontsquat} KG`}
//                               </p>
//                               <p>
//                                 BS:{" "}
//                                 {profile.weights === 1
//                                   ? `${profile.max_backsquat} LB`
//                                   : `${profile.max_backsquat} KG`}
//                               </p>
//                             </Card.Body>
//                           </div>
//                         )}
//                       </Card>
//                     </Col>
//                   );
//                 })}
//               </Row>
//             );
//           }

//           return null; // this return command makes sure that only 1 Row is created for every 4 profiles
//         })}
//       </Container>
//     );
//   };

//   return (
//     <div>
//       <h3>All Profiles</h3>
//       <br></br>
//       <div className="list-container">{renderProfiles()}</div>
//     </div>
//   );
// }

// <Accordion>
//   <Accordion.Header>
//     Athlete # {profile.id}
//   </Accordion.Header>
//   <Accordion.Body>
//     <div className="profile_breakdown">
//       <p>
//         Snatch:{" "}
//         {profile.weights === 1
//           ? `${profile.max_snatch} LB`
//           : `${profile.max_snatch} KG`}
//       </p>
//       <p>
//         C&J:{" "}
//         {profile.weights === 1
//           ? `${profile.max_cleanjerk} LB`
//           : `${profile.max_cleanjerk} KG`}
//       </p>
//       <p>
//         FS:{" "}
//         {profile.weights === 1
//           ? `${profile.max_frontsquat} LB`
//           : `${profile.max_frontsquat} KG`}
//       </p>
//       <p>
//         BS:{" "}
//         {profile.weights === 1
//           ? `${profile.max_backsquat} LB`
//           : `${profile.max_backsquat} KG`}
//       </p>
//     </div>
//   </Accordion.Body>
// </Accordion>

// <Card>
//   <Card.Header>Athlete #{profile.id}</Card.Header>
//   <Card.Body>
//     <div className="profile_breakdown">
//       <p>
//         Snatch:{" "}
//         {profile.weights === 1
//           ? `${profile.max_snatch} LB`
//           : `${profile.max_snatch} KG`}
//       </p>
//       <p>
//         C&J:{" "}
//         {profile.weights === 1
//           ? `${profile.max_cleanjerk} LB`
//           : `${profile.max_cleanjerk} KG`}
//       </p>
//       <p>
//         FS:{" "}
//         {profile.weights === 1
//           ? `${profile.max_frontsquat} LB`
//           : `${profile.max_frontsquat} KG`}
//       </p>
//       <p>
//         BS:{" "}
//         {profile.weights === 1
//           ? `${profile.max_backsquat} LB`
//           : `${profile.max_backsquat} KG`}
//       </p>
//     </div>
//     <Link to={`../${profile.id}/`} className="btn btn-primary">Stats</Link>
//   </Card.Body>
// </Card>

// import { Link } from "react-router-dom"

// function ProfileList (props) {

//   const renderProfiles = () => {
//     if (!props.profiles) {
//       return 'No profile exists' // change to null when done testing
//     }

//     return Object.keys(props.profiles).map((key, index) => {
//       // console.log(props, "chads props")
//       // console.log("chads test", props.profiles)
//       const profile = props.profiles[key];
//       return (
//         <div key={index}>
//           <p>
//             <Link to={`../${profile.id}/`}>profile # {profile.id}</Link>
//           </p>
//         </div>
//       );
//     });
//   };

//   // console.log("Profiles i ProfileList", props.profile)  // delete when done testing

//   return (
//     <div>
//       <h3>Select the profile</h3>
//       <br></br>
//       <div className="list-container">
//         <p>{ renderProfiles() }</p>
//       </div>
//     </div>
//   )
// }

// export default ProfileList
