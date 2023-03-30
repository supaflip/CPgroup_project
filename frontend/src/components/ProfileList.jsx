import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import SearchBar from "./SearchBar";

function ProfileList(props) {
  const profileKeys = Object.keys(props.profiles);
  const [filteredProfiles, setFilteredProfiles] = useState(props.profiles);
  const [expandedProfileIds, setExpandedProfileIds] = useState([]);

  // this useEffect sets filteredProfiles to props.profiles when component is first rendered
  useEffect(() => {
    setFilteredProfiles(props.profiles);
  }, [props.profiles]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProfiles(props.profiles);
      return;
    }

    const filtered = profileKeys.filter((key) =>
      props.profiles[key].user_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const FilteredProfiles = {};
    filtered.forEach((key) => {
      FilteredProfiles[key] = props.profiles[key];
    });

    setFilteredProfiles(() => FilteredProfiles);
    setExpandedProfileIds([]);
  };

  const handleProfileToggle = (id) => {
    if (expandedProfileIds.includes(id)) {
      setExpandedProfileIds((prevIds) =>
        prevIds.filter((prevId) => prevId !== id)
      );
    } else {
      setExpandedProfileIds((prevIds) => [...prevIds, id]);
    }
  };

  const renderProfiles = () => {
    const profileKeys = Object.keys(filteredProfiles);

    if (Object.keys(filteredProfiles).length === 0) {
      return (
        <div className="alert alert-primary" role="alert">
          No profile exists
        </div>
      );
    }

    return profileKeys.map((key) => {
      const profile = filteredProfiles[key];

      // "md={3}" means Col component takes up 3 out of 12 grid columns
      return (
        <Col className="mb-4" key={profile.id} md={3}>
          <Card>
            <Card.Header>
              <Card.Title>{profile.user_name}</Card.Title>
              <Button 
                variant="outline-primary"
                size="sm"
                onClick={() => handleProfileToggle(profile.id)}
              >
                {expandedProfileIds.includes(profile.id) ? "Hide" : "Stats"}
              </Button>
            </Card.Header>
            {expandedProfileIds.includes(profile.id) && (
              <div className="profile_breakdown">
                <Card.Body>
                  <p>
                    Snatch:{" "}
                    {profile.weights === 1
                      ? `${profile.max_snatch} LB`
                      : `${profile.max_snatch} KG`}
                  </p>
                  <p>
                    Clean & Jerk:{" "}
                    {profile.weights === 1
                      ? `${profile.max_cleanjerk} LB`
                      : `${profile.max_cleanjerk} KG`}
                  </p>
                  <p>
                    Front Squat:{" "}
                    {profile.weights === 1
                      ? `${profile.max_frontsquat} LB`
                      : `${profile.max_frontsquat} KG`}
                  </p>
                  <p>
                    Back Squat:{" "}
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

  // const rows = <Row className="mb-3">{renderProfiles()}</Row>;

  return (
    <div>
      <h3>All Profiles</h3>
      <SearchBar onSearch={handleSearch} />
      <br />
      <div className="list-container">
        <Row className="mb-3">{renderProfiles()}</Row>
      </div>
    </div>
  );
}

export default ProfileList;

// WORKING PROFILE LIST WITHOUT SEARCHBAR
// import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { useState } from "react";
// import Button from "react-bootstrap/Button";

// function ProfileList(props) {
//   const profileKeys = Object.keys(props.profiles);

//   const renderProfiles = () => {
//     if (!props.profiles) {
//       return "No profile exists"; // change to null when done testing
//     }

//     return profileKeys.map((key) => {
//       const profile = props.profiles[key];
//       const [isExpanded, setIsExpanded] = useState(false);

//       const handleToggle = () => {
//         setIsExpanded(!isExpanded);
//       };

//       // "md={3}" means Col component takes up 3 out of 12 grid columns
//       return (
//         <Col key={profile.id} md={3}>
//           <Card>
//             <Card.Header>
//               <Card.Title>{profile.user_name}</Card.Title>
//               <Button
//                 variant="outline-primary"
//                 size="sm"
//                 onClick={handleToggle}
//               >
//                 {isExpanded ? "Hide" : "Stats"}
//               </Button>
//             </Card.Header>
//             {isExpanded && (
//               <div className="profile_breakdown">
//                 <Card.Body>
//                   <p>
//                     Snatch:{" "}
//                     {profile.weights === 1
//                       ? `${profile.max_snatch} LB`
//                       : `${profile.max_snatch} KG`}
//                   </p>
//                   <p>
//                     C&J:{" "}
//                     {profile.weights === 1
//                       ? `${profile.max_cleanjerk} LB`
//                       : `${profile.max_cleanjerk} KG`}
//                   </p>
//                   <p>
//                     FS:{" "}
//                     {profile.weights === 1
//                       ? `${profile.max_frontsquat} LB`
//                       : `${profile.max_frontsquat} KG`}
//                   </p>
//                   <p>
//                     BS:{" "}
//                     {profile.weights === 1
//                       ? `${profile.max_backsquat} LB`
//                       : `${profile.max_backsquat} KG`}
//                   </p>
//                 </Card.Body>
//               </div>
//             )}
//           </Card>
//         </Col>
//       );
//     });
//   };

//   const rows = [];
//   let currentRow = [];

//   renderProfiles().forEach((col, index) => {
//     currentRow.push(col);

//     if (currentRow.length === 4 || index === profileKeys.length - 1) {
//       rows.push(
//         <Row key={`row-${index}`} className="mb-3">
//           {currentRow}
//         </Row>
//       );
//       currentRow = [];
//     }
//   });

//   return (
//     <div>
//       <h3>All Profiles</h3>
//       <br />
//       <div className="list-container">{rows}</div>
//     </div>
//   );
// }

// export default ProfileList;
