import { useState, useEffect } from "react";
import API from "../api/API";
import { Routes, Route } from "react-router-dom";
import ProfileList from "../components/ProfileList";
// import ProfileForm from "../components/ProfileForm"
import ProfilePage from "./ProfilePage.jsx";
// import fetchProfileByID from '../api/API'

function AllProfilesPage() {
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

  // console.log("All Profiles", profiles); // delete when done testing

  console.log(localStorage.getItem("token"));

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <br></br>
              <h2>Bar Path Program</h2>
              <hr />
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

// import { useState, useEffect } from "react";
// import API from "../api/API";
// import { Routes, Route } from "react-router-dom";
// import ProfileList from "../components/ProfileList";
// import ProfilePage from "./ProfilePage.jsx";

// function AllProfilesPage() {
//   const [profiles, setProfiles] = useState([]);

//   useEffect(() => {
//     const getProfiles = async () => {
//       const data = await API.fetchProfiles();
//       if (data) {
//         setProfiles(data.result);
//       }
//     };
//     getProfiles();
//   }, []);

//   return (
//     <div>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div>
//               <br></br>
//               <h2>Bar Path Program</h2>
//               <hr />
//               <ProfileList profiles={profiles} />
//             </div>
//           }
//         />
//         <Route
//           path="/:profileID/"
//           element={<ProfilePage profiles={profiles} />}
//         />
//       </Routes>
//     </div>
//   );
// }

// export default AllProfilesPage;
