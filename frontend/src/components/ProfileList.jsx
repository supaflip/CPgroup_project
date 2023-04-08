import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ProfileCard from "./ProfileCard";

function ProfileList({ allProfiles }) {

  /* Variables */
  const allKeysOfProfiles = Object.keys(allProfiles);

  /* STATE variables */
  const [filteredProfiles, setFilteredProfiles] = useState(allProfiles);

  // this useEffect sets filteredProfiles to allProfiles when component is first rendered
  useEffect(() => {
    setFilteredProfiles(allProfiles);
  }, [allProfiles])

  /* Handle Functions */
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProfiles(allProfiles);
      return;
    }

    const filtered = allKeysOfProfiles.filter((key) =>
      allProfiles[key].user_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const FilteredProfiles = {};
    filtered.forEach((key) => {
      FilteredProfiles[key] = allProfiles[key];
    });

    setFilteredProfiles(() => FilteredProfiles);
  }

  const renderProfiles = () => {
    const filteredKeysofProfiles = Object.keys(filteredProfiles);

    if (Object.keys(filteredProfiles).length === 0) {
      return (
        <div className="alert alert-primary" role="alert">
          No profile exists
        </div>
      );
    }

    return filteredKeysofProfiles.map((key) => {
      const profile = filteredProfiles[key];

      // "md={3}" means Col component takes up 3 out of 12 grid columns
      return (
        <Col style={{justifyContent: 'center'}}className="mx-4 mb-4"key={profile.id} lg={3} sm={5}>
          <ProfileCard profile={profile} />
        </Col>
      );
    });
  };

  return(
    <div>
      <SearchBar onSearch={handleSearch} />
      <br />
      <h3 className="textaligncenter">All Profiles</h3>
      <div>
        <Container className="containcenter">
            <Row style={{marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center'}}className="mb-3">
              {renderProfiles()}
              </Row>
        </Container>
      </div>
      </div>
    
  )
}

export default ProfileList;