import { useState, useEffect } from "react";
import API from "../api/API";
import { Routes, Route } from "react-router-dom";
import ProfileList from "../components/ProfileList";
import ProfilePage from "./ProfilePage.jsx";
import { Navigate } from "react-router-dom";
// import fetchProfileByID from '../api/WeekAPI'
// import ProfileForm from "../components/ProfileForm"

function AllProfilesPage({USER_AUTH}) {

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const getProfiles = async () => {
      const data = await API.fetchProfiles();
      if (data) {
        setProfiles(data.result);
      }
    };
    getProfiles();
  }, []);

  // const params = useParams()
  // console.log(localStorage.getItem("token")); // delete when done testing
  // console.log("AllProfilesPage", profiles);

  return (
    <div>
      {!USER_AUTH['TOKEN'] && !USER_AUTH['is_coach'] && <Navigate to="/app" />}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ProfileList profiles={profiles} />
            </div>
          }
        />
        <Route
          path="/:profileID/"
          element={<ProfilePage profiles={profiles} />}
        />
      </Routes>
    </div>
  );
}

export default AllProfilesPage;
