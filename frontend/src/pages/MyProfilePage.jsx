import { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import API from "../api/API";
import ModalProfileForm from "../components/ModalProfileForm";
import UpdateProfileForm from "../components/UpdateProfileForm"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function MyProfilePage() {
  const [profile, setProfile] = useState([]);  
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [select, setSelect] = useState("biceps");
  const [isExpanded, setIsExpanded] = useState(false);

      const handleToggle = () => {
        setIsExpanded(!isExpanded);
      };

  const athlete = profile

  const handleButtonClick = () => {
    setShowUpdateForm(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    API.fetchMuscleWorkout(select)
  }

  useEffect(() => {
    const getProfile = async () => {
      const data = await API.fetchProfile();
      if (data) {
        setProfile(data);  
      }
    };
    getProfile();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);

  // const params = useParams()

  // console.log("All Profiles", profiles); // delete when done testing
  
  console.log(localStorage.getItem('token'))
  console.log(profile)
  // let athlete = profile

  return (
    <div>
    <br></br>
    <h2>Bar Path Program</h2>
    <hr />
    <br></br>
    <div className="profilecentered">
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <Card.Title>Athlete # {profile.id}</Card.Title>
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
            <Button variant="primary" onClick={handleShowModal}>Update Profile</Button>
      <UpdateProfileForm showModal={showModal} setShowModal={setShowModal} profile={athlete} />
          </div>
      </Card>
    </div>
    <br></br>
    <br></br>
    <form>
    <select onChange={(e) => setSelect(e.target.value)}>
      <option value="biceps">biceps</option>
      <option value="chest">chest</option>
      <option value="glutes">glutes</option>
    </select>
    <br></br>
    <button type="submit" onClick={handleFormSubmit}>Search</button>
    </form>
    
  </div>
  );
}

export default MyProfilePage;