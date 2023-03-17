import { useState, useEffect } from "react";
import API from "../api/API";
import UpdateProfileForm from "../components/UpdateProfileForm"



function MyProfilePage() {
  const [profile, setProfile] = useState([]);  
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const handleButtonClick = () => {
    setShowUpdateForm(true)
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

  // const params = useParams()

  // console.log("All Profiles", profiles); // delete when done testing
  
  console.log(localStorage.getItem('token'))
  console.log(profile)
  let athlete = profile

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
      <button className='btn btn-secondary btn-sm' onClick={handleButtonClick}>Update Profile</button>
      {showUpdateForm && <UpdateProfileForm profile={athlete}/>}
    </div>
    <br></br>
    <br></br>
    
  </div>
  );
}

export default MyProfilePage;