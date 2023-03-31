import { useState, useEffect } from "react";
import API from "../api/API";
import { Navigate, useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

function MyProfilePage({USER_AUTH}) {

  const [myProfile, setMyprofile] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getMyProfile = async () => {
      const data = await API.fetchProfile(); //FETCH TO >> BASE_URL + `profile/`

      if(data) {
        setMyprofile(data);
      } else {
        alert ('Please, create profile please.');
        navigate('/create');
      }
    };

    getMyProfile();
  },[]);
  
  
  return(
    <div>
      {!USER_AUTH["TOKEN"] && <Navigate to="/app" />}
      <br></br>
      <br></br>
      <br></br>
      <h2>Update MyProfile</h2>
        <div className="profilecentered">
          <ProfileCard profile={myProfile} />
        </div>
      <br></br>
      <br></br>
    </div>
  )
}

export default MyProfilePage;