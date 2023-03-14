import { Link } from "react-router-dom";

function ProfileList(props) {
  const renderProfiles = () => {
    if (!props.profiles) {
      return "No profile exists"; // change to null when done testing
    }

    return Object.keys(props.profiles).map((key, index) => {
      const profile = props.profiles[key];
      return (
        <div key={index}>
          <p>
            <Link to={`../${profile.id}/`}>Athlete # {profile.id}</Link>
          </p>
        </div>
      );
    });
  };

  return (
    <div>
      <h3>Select the Athlete</h3>
      <br></br>
      <div className="list-container">
        <p>{renderProfiles()}</p>
      </div>
    </div>
  );
}

export default ProfileList;
