import { useState, useEffect } from "react";
import API from "../api/API";
import ProfileList from "../components/ProfileList";
import { Navigate } from "react-router-dom";

/* Coach Only Page */
function AllProfilesPage({USER_AUTH}) {

  const [allProfiles, setAllProfiles] = useState([]);

  useEffect(()=>{
    const getAllProfiles = async () => {
      const data = await API.fetchAllProfiles(); // Fetch tO : BASE_URL + "profiles/"
      if(data){
        setAllProfiles(data.result);
      }
    };

    getAllProfiles();
  }, []);


  return(
    <div>
      {(!USER_AUTH['TOKEN'] || !USER_AUTH['is_coach']) && <Navigate to="/app" />}
      <div>
        <ProfileList allProfiles={allProfiles} />
      </div>
    </div>
  );
  
}

export default AllProfilesPage;