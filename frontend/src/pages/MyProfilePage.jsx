import { useState, useEffect } from "react";
import API from "../api/API";
import { Navigate, useNavigate } from "react-router-dom";
import MyProfileCard from "../components/MyProfileCard";

function MyProfilePage({USER_AUTH}) {

  const [myProfile, setMyprofile] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getMyProfile = async () => {
      const data = await API.fetchProfile(); //FETCH TO >> BASE_URL + `profile/`

      if(data) {
        setMyprofile(data);
      } else {
        alert ('Please create a profile');
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
        <div className="profilecentered">
          <h2>My Bar Path Profile</h2>
          <MyProfileCard profile={myProfile} />
        </div>
      <br></br>
      <br></br>
    </div>
  )
}

export default MyProfilePage;