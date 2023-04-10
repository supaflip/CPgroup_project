import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../index.css";

const UpdateWorkoutForm = ({ showModal, setShowModal, workouts }) => {
  // Each day may have multiple workouts
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    note: "",
    sets: "",
    reps: "",
    percentage: "",
  });

  //console.log(workouts);

  // Executed when component first mounts
  useEffect(() => {
    if (workouts && workouts.length > 0) {
      setSelectedWorkout(workouts[0].id);
      setFormData({ ...workouts[0] });
    }
  }, [workouts]);

  // Handles user changes in field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles selection changes in drop down list of workouts via workout.id
  const handleWorkoutChange = (e) => {
    const selectedId = Number(e.target.value);
    const selected = workouts.find((workout) => workout.id === selectedId);
    setSelectedWorkout(selected.id);
    setFormData({ ...selected });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/workouts/workout/${selectedWorkout}/`,
        formData,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      alert("The Workout has been updated");
      handleCloseModal();
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // const renderWorkoutForms = () => {
  //   return workouts.map((workout, index) => (
  //     <div key={index + 1}>
  //       <h5>Workout No. {index + 1}</h5>
  //       <Form onSubmit={handleSubmit}>
  //         <Form.Group controlId="title">
  //           <Form.Label>Title:</Form.Label>
  //           <Form.Control
  //             type="text"
  //             name="title"
  //             value={formData.title}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Form.Group>
  //         <Form.Group controlId="note">
  //           <Form.Label>Note:</Form.Label>
  //           <Form.Control
  //             type="text"
  //             name="note"
  //             value={formData.note}
  //             onChange={handleChange}
  //           />
  //         </Form.Group>
  //         <Form.Group controlId="sets">
  //           <Form.Label>Sets:</Form.Label>
  //           <Form.Control
  //             type="text"
  //             name="sets"
  //             value={formData.sets}
  //             onChange={handleChange}
  //           />
  //         </Form.Group>
  //         <Form.Group controlId="reps">
  //           <Form.Label>Reps:</Form.Label>
  //           <Form.Control
  //             type="text"
  //             name="reps"
  //             value={formData.reps}
  //             onChange={handleChange}
  //           />
  //         </Form.Group>
  //         <Form.Group controlId="percentage">
  //           <Form.Label>Percentage:</Form.Label>
  //           <Form.Control
  //             type="number"
  //             name="percentage"
  //             value={formData.percentage}
  //             onChange={handleChange}
  //           />
  //         </Form.Group>
  //       </Form>
  //       <hr />
  //     </div>
  //   ));
  // };

  return (
    <>
      <Modal
        className="backdrop"
        show={showModal}
        onHide={handleCloseModal}
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="workoutSelect">
            <Form.Label>Select Workout:</Form.Label>
            <Form.Control
              as="select"
              name="workoutSelect"
              onChange={handleWorkoutChange}
            >
              {workouts.map((workout, index) => (
                <option key={index} value={workout.id}>
                  {index+1}: {workout.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <br></br>
            <Form.Group controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="note">
              <Form.Label>Note:</Form.Label>
              <Form.Control
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="sets">
              <Form.Label>Sets:</Form.Label>
              <Form.Control
                type="text"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="reps">
              <Form.Label>Reps:</Form.Label>
              <Form.Control
                type="text"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="percentage">
              <Form.Label>Percentage:</Form.Label>
              <Form.Control
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="textaligncenter">
            <Button variant="primary" onClick={handleSubmit} type="submit">
              Save Changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateWorkoutForm;



// PREVIOUS CODE
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Modal, Button, Form } from "react-bootstrap";
// import "../index.css";

// const UpdateWorkoutForm = ({ showModal, setShowModal, workouts }) => {
//   // Each day may have multiple workouts
//   const [selectedWorkout, setSelectedWorkout] = useState(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     note: "",
//     sets: "",
//     reps: "",
//     percentage: "",
//   });

//   console.log(workouts);

//   // Executed when component first mounts
//   useEffect(() => {
//     if (workouts && workouts.length > 0) {
//       setSelectedWorkout(workouts[0].id);
//       setFormData({ ...workouts[0] });
//     }
//   }, [workouts]);

//   // Handles user changes in field
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handles selection changes in drop down list of workouts via workout.id
//   const handleWorkoutChange = (e) => {
//     const selected = workouts.find((workout) => workout.id === e.target.value);
//     setSelectedWorkout(selected.id);
//     setFormData({ ...selected });
//   };

//   const handleCloseModal = () => setShowModal(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.patch(
//         `http://127.0.0.1:8000/workouts/workout/${selectedWorkout}/`,
//         formData,
//         {
//           headers: {
//             Authorization: "Token " + token,
//           },
//         }
//       );
//       alert("The Workout has been updated");
//       handleCloseModal();
//       window.location.reload();
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   };

//   const renderWorkoutForms = () => {
//     return workouts.map((workout, index) => (
//       <div key={index + 1}>
//         <h5>Workout No. {index + 1}</h5>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="title">
//             <Form.Label>Title:</Form.Label>
//             <Form.Control
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="note">
//             <Form.Label>Note:</Form.Label>
//             <Form.Control
//               type="text"
//               name="note"
//               value={formData.note}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="sets">
//             <Form.Label>Sets:</Form.Label>
//             <Form.Control
//               type="text"
//               name="sets"
//               value={formData.sets}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="reps">
//             <Form.Label>Reps:</Form.Label>
//             <Form.Control
//               type="text"
//               name="reps"
//               value={formData.reps}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="percentage">
//             <Form.Label>Percentage:</Form.Label>
//             <Form.Control
//               type="number"
//               name="percentage"
//               value={formData.percentage}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Form>
//         <hr />
//       </div>
//     ));
//   };

//   return (
//     <>
//       <Modal
//         className="backdrop"
//         show={showModal}
//         onHide={handleCloseModal}
//         backdrop={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Update a Workout</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{renderWorkoutForms()}</Modal.Body>
//         <Modal.Footer>
//           <div className="textaligncenter">
//             <Button variant="primary" onClick={handleSubmit} type="submit">
//               Save Changes
//             </Button>
//           </div>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default UpdateWorkoutForm;

// ORIGINAL CODE
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Modal, Button, Form } from "react-bootstrap";

// const UpdateWorkoutForm = ({ showModal, setShowModal, workouts}) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     note: "",
//     sets: "",
//     reps: "",
//     percentage: "",
//   });

//   console.log(workouts)

//   // useEffect(() => {
//   //   setFormData(workout);
//   // }, [workout]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCloseModal = () => setShowModal(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.patch(
//         `http://127.0.0.1:8000/workouts/workout/${workout.id}/`,
//         formData,
//         {
//           headers: {
//             Authorization: "Token " + token,
//           },
//         }
//       );
//       alert("The Workout has been updated");
//       handleClose();
//       window.location.reload();
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   };

//   const workoutForms = (workouts) =>{
//           {workouts.map((workout, index) => (
//           <div key={index+1}>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="title">
//                 <Form.Label>Title:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="title"
//                   value={workout.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group controlId="note">
//                 <Form.Label>Note:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="note"
//                   value={workout.note}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="sets">
//                 <Form.Label>Sets:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="sets"
//                   value={workout.sets}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="reps">
//                 <Form.Label>Reps:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="reps"
//                   value={workout.reps}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="percentage">
//                 <Form.Label>Percentage:</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="percentage"
//                   value={workout.percentage}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Button className="mt-3" type="submit">
//                 Update Workout
//               </Button>
//             </Form>
//             </div>
//     ))
//   };

//   return (
//     <>
//       <Modal show={showModal} onHide={handleCloseModal} backdrop={false}>
//           <Modal.Header closeButton>
//               <Modal.Title>Update My Profile</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <>
//           {workouts.map((workout, index) => (
//           <div key={index+1}>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="title">
//                 <Form.Label>Title:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="title"
//                   value={workout.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group controlId="note">
//                 <Form.Label>Note:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="note"
//                   value={workout.note}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="sets">
//                 <Form.Label>Sets:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="sets"
//                   value={workout.sets}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="reps">
//                 <Form.Label>Reps:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="reps"
//                   value={workout.reps}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="percentage">
//                 <Form.Label>Percentage:</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="percentage"
//                   value={workout.percentage}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Button className="mt-3" type="submit">
//                 Update Workout
//               </Button>
//             </Form>
//             </div>
//     ))} </>
//           </Modal.Body>
//           <Modal.Footer>
//         <div className="textaligncenter">
//         <Button variant="primary" onClick={handleSubmit} type="submit">Save Changes</Button>
//         </div>
//         </Modal.Footer>
//     </Modal>
//     </>
//   );
// };
// }

// export default UpdateWorkoutForm;
