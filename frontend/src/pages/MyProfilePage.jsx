import { useState, useEffect } from "react";
import API from "../api/API";
import UpdateProfileForm from "../components/UpdateProfileForm";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";

function MyProfilePage({USER_AUTH}) {

  /* DECLARATIONS OF STATE VARIABLES */
  const [profile, setProfile] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const data = await API.fetchProfile();
      if (data) {
        setProfile(data);
      }
    };
    getProfile();
  }, []);

  /* VARIABLES */
  const athlete = profile;

  /* FUNCTIONS */
  const handleShowModal = () => setShowModal(true);

  return (
    <div>
      {!USER_AUTH['TOKEN'] && <Navigate to="/app" />}
      <br></br>
      <br></br>
      <br></br>
      <h2>Hello {profile.user_name}!</h2>
      <div className="profilecentered">
        <Card style={{ width: "18rem" }}>
          <Card.Header>
            <Card.Title>Current Stats</Card.Title>
          </Card.Header>
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
            <Button variant="primary" onClick={handleShowModal}>
              Update Profile
            </Button>
            <UpdateProfileForm
              showModal={showModal}
              setShowModal={setShowModal}
              profile={athlete}
            />
          </div>
        </Card>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

export default MyProfilePage;


// NOT SURE WHERE THIS SHOULD BE

// const [showUpdateForm, setShowUpdateForm] = useState(false);
// const [select, setSelect] = useState("biceps");
// const [isExpanded, setIsExpanded] = useState(false);

// const handleButtonClick = () => {
//   setShowUpdateForm(true);
// };

// const handleFormSubmit = (e) => {
//   e.preventDefault();
//   API.fetchMuscleWorkout(select);
// };

// const handleToggle = () => {
//   setIsExpanded(!isExpanded);
// };

{/* <form>
<select onChange={(e) => setSelect(e.target.value)}>
  <option value="biceps">biceps</option>
  <option value="chest">chest</option>
  <option value="glutes">glutes</option>
</select>
<br></br>
<button type="submit" onClick={handleFormSubmit}>
  Search
</button>
</form> */}


