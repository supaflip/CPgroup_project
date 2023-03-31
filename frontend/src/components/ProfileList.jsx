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
        <Col className="mb-4" key={profile.id} md={3}>
          <ProfileCard profile={profile} />
        </Col>
        
      );
    });
  };

  return(
    <div>
      <h3>All Profiles</h3>
      <SearchBar onSearch={handleSearch} />
      <br />
      <div className="list-container">
        <Row className="mb-3">{renderProfiles()}</Row>
      </div>
    </div>
  )
}

export default ProfileList;