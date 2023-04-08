import React, { useState, useEffect } from "react";
import API from "../api/API";
import WeekList from "../components/WeekList";
import { Routes, Route } from "react-router-dom";
import WeekPage from "./WeekPage.jsx";
import { Navigate } from "react-router-dom";
import CreateModal from "../components/CreateModal";
import DeleteModal from "../components/DeleteModal";
import { Button, ButtonGroup } from "react-bootstrap";

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const guestRedirect = () => {
    return <Navigate to="/app" />;
  };

  const coachButtonGroup = () => {
    return (
      <>
        <Button className="mt-3" onClick={handleOpenCreateModal}>
          Create
        </Button>
        {showCreateModal && (
          <CreateModal data={weeks} onClose={handleCloseCreateModal} />
        )}
        <Button
          className="mt-3"
          variant="secondary"
          onClick={handleOpenDeleteModal}
        >
          Delete
        </Button>
        {showDeleteModal && (
          <DeleteModal data={weeks} onClose={handleCloseDeleteModal} />
        )}
      </>
    );
  };

  const userInterface = () => {
    return (
      <>
        {USER_AUTH["is_coach"] && coachButtonGroup()}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <br></br>
                <hr />
                <WeekList weeks={weeks} USER_AUTH={USER_AUTH}/>
              </div>
            }
          />
          <Route
            path="/week/:week_number/*"
            element={<WeekPage weeks={weeks} />}
          />
        </Routes>
      </>
    );
  };

  return (
  <div>
    {USER_AUTH["TOKEN"] ? userInterface() : guestRedirect()}
  </div>
  )
}

export default HomePage;

// NON-WORKING SOLUTION THAT HAS A RENDERBUTTONGROUP FUNCTION CALLED IN RETURN STATEMENT
// import React, { useState, useEffect } from "react";
// import API from "../api/API";
// import WeekList from "../components/WeekList";
// import { Routes, Route } from "react-router-dom";
// import WeekPage from "./WeekPage.jsx";
// import { Navigate } from "react-router-dom";
// import CreateModal from "../components/CreateModal";
// import DeleteModal from "../components/DeleteModal";
// import { Button, ButtonGroup } from "react-bootstrap";

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

//   const [showCreateModal, setShowCreateModal] = useState(false);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const handleOpenCreateModal = () => {
//     setShowCreateModal(true);
//   };

//   const handleCloseCreateModal = () => {
//     setShowCreateModal(false);
//   };

//   const handleOpenDeleteModal = () => {
//     setShowDeleteModal(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setShowDeleteModal(false);
//   };

//   const renderButtonGroup = () => {
//     if (USER_AUTH["is_coach"]) {
//       return (
//         <ButtonGroup className="mt-3">
//           <Button className="mt-3" onClick={handleOpenCreateModal}>
//             Create
//           </Button>
//           {showCreateModal && (
//             <CreateModal data={weeks} onClose={handleCloseCreateModal} />
//           )}
//           <Button
//             className="mt-3"
//             variant="secondary"
//             onClick={handleOpenDeleteModal}
//           >
//             Delete
//           </Button>
//           {showDeleteModal && (
//             <DeleteModal data={weeks} onClose={handleCloseDeleteModal} />
//           )}
//         </ButtonGroup>
//       )
//     }
//   }

//   return (
//     <div>
//       {!USER_AUTH["TOKEN"] && <Navigate to="/app" />}
//       <div>
//         {renderButtonGroup()}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <div>
//                 <br></br>
//                 <hr />
//                 <WeekList weeks={weeks} />
//               </div>
//             }
//           />
//           <Route
//             path="/week/:week_number/*"
//             element={<WeekPage weeks={weeks} />}
//           />
//         </Routes>
//         <br></br>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

// NON-WORKING SOLUTION USING &&:

// import React, { useState, useEffect } from "react";
// import API from "../api/API";
// import WeekList from "../components/WeekList";
// import { Routes, Route } from "react-router-dom";
// import WeekPage from "./WeekPage.jsx";
// import { Navigate } from "react-router-dom";
// import CreateModal from "../components/CreateModal";
// import DeleteModal from "../components/DeleteModal";
// import { Button, ButtonGroup } from "react-bootstrap";

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

//   const [showCreateModal, setShowCreateModal] = useState(false);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const handleOpenCreateModal = () => {
//     setShowCreateModal(true);
//   };

//   const handleCloseCreateModal = () => {
//     setShowCreateModal(false);
//   };

//   const handleOpenDeleteModal = () => {
//     setShowDeleteModal(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setShowDeleteModal(false);
//   };

//   return (
//     <div>
//       {!USER_AUTH["TOKEN"] && <Navigate to="/app" />}
//       <div>
//         {USER_AUTH["is_coach"] && (
//             <ButtonGroup className="mt-3">
//               <Button className="mt-3" onClick={handleOpenCreateModal}>
//                 Create
//               </Button>
//               {showCreateModal && (
//                 <CreateModal data={weeks} onClose={handleCloseCreateModal} />
//               )}
//               <Button
//                 className="mt-3"
//                 variant="secondary"
//                 onClick={handleOpenDeleteModal}
//               >
//                 Delete
//               </Button>
//               {showDeleteModal && (
//                 <DeleteModal data={weeks} onClose={handleCloseDeleteModal} />
//               )}
//             </ButtonGroup>
//           )}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <div>
//                 <br></br>
//                 <hr />
//                 <WeekList weeks={weeks} />
//               </div>
//             }
//           />
//           <Route
//             path="/week/:week_number/*"
//             element={<WeekPage weeks={weeks} />}
//           />
//         </Routes>
//         <br></br>
//         <br></br>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

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
