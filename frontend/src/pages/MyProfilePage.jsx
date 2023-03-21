import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import API from "../api/API";
import ModalProfileForm from "../components/ModalProfileForm";
import UpdateProfileForm from "../components/UpdateProfileForm"

function MyProfilePage() {
  const [profile, setProfile] = useState([]);  
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const athlete = profile

  const handleButtonClick = () => {
    setShowUpdateForm(true)
  }

  /* TODO : need to fix API Call. It doesn't work for now. */
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

  return (
    <div>
    <br></br>
    <h2>Bar Path Program</h2>
    <hr />
    <br></br>
    <h4>Hello Athlete # { profile.id }!</h4>
    <br></br>
    <p>These are your current 1 rep maxes:</p>
    <div className="profile_breakdown">
      <p>Snatch: {athlete.weights === 1 ? `${athlete.max_snatch} LB` : `${athlete.max_snatch} KG`}</p>
      <p>Clean & Jerk: {athlete.weights === 1 ? `${athlete.max_cleanjerk} LB` : `${athlete.max_cleanjerk} KG`}</p>
      <p>Front Squat: {athlete.weights === 1 ? `${athlete.max_frontsquat} LB` : `${athlete.max_frontsquat} KG`}</p>
      <p>Back Squat: {athlete.weights === 1 ? `${athlete.max_backsquat} LB` : `${athlete.max_backsquat} KG`}</p>
    </div>
    <div>
      <Button variant="primary" onClick={handleShowModal}>Update Profile</Button>
      <ModalProfileForm showModal={showModal} setShowModal={setShowModal} profile={athlete} />
    </div>
    <br></br>
    <br></br>
    
  </div>
  );
}

export default MyProfilePage;