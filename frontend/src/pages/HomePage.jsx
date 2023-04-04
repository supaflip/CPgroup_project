import React, { useState, useEffect } from "react";
import API from "../api/API";
import WeekList from "../components/WeekList";
import { Routes, Route } from "react-router-dom";
import WeekPage from "./WeekPage.jsx";
import { Navigate } from "react-router-dom";
import CreateModal from "../components/CreateModal";
import UpdateModal from "../components/UpdateModal";
import Button from "react-bootstrap/Button";

function HomePage({ USER_AUTH }) {
  const [weeks, setWeeks] = useState([]); // holds all week, day, and workout data in 1 file "weeks"

  useEffect(() => {
    const getWeeks = async () => {
      const data = await API.fetchWeeks();
      if (data) {
        setWeeks(data.result);
      }
    };
    getWeeks();
  }, []);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleOpenUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <div>
      {!USER_AUTH["TOKEN"] && <Navigate to="/app" />}
      <Button className="mt-3" onClick={handleOpenCreateModal}>Create</Button>
      {showCreateModal && <CreateModal data={weeks} onClose={handleCloseCreateModal} />}
      <Button className="mt-3" onClick={handleOpenUpdateModal}>Edit</Button>
      {showUpdateModal && <UpdateModal data={weeks} onClose={handleCloseUpdateModal} />}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <br></br>
              <hr />
              <WeekList weeks={weeks} />
            </div>
          }
        />
        <Route
          path="/week/:week_number/*"
          element={<WeekPage weeks={weeks} />}
        />
      </Routes>
      <br></br>
      <br></br>
    </div>
  );
}

export default HomePage;


// ORIGINAL CODE BEFORE ADDING CRUD FUNCTIONALITY
// import { useState, useEffect } from "react";
// import API from "../api/API";
// import WeekList from "../components/WeekList";
// import { Routes, Route } from "react-router-dom";
// import WeekPage from "./WeekPage.jsx";
// import { Navigate } from "react-router-dom";

// function HomePage({ USER_AUTH }) {
//   const [weeks, setWeeks] = useState([]); // holds all week, day, and workout data in 1 file "weeks"

//   useEffect(() => {
//     const getWeeks = async () => {
//       const data = await API.fetchWeeks();
//       if (data) {
//         setWeeks(data.result);
//       }
//     };
//     getWeeks();
//   }, []);

//   return (
//     <div>
//       {!USER_AUTH["TOKEN"] && <Navigate to="/app" />}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div>
//               <br></br>
//               <hr />
//               <WeekList weeks={weeks} />
//             </div>
//           }
//         />
//         <Route
//           path="/week/:week_number/*"
//           element={<WeekPage weeks={weeks} />}
//         />
//       </Routes>
//       <br></br>
//       <br></br>
//     </div>
//   );
// }

// export default HomePage;