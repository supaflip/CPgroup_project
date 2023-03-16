import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProfileForm = ({ profile }) => {
  // console.log(profile, 'form propfile props')
  const [formData, setFormData] = useState({
    user: "",
    weights: "",
    max_snatch: "",
    max_cleanjerk: "",
    max_frontsquat: "",
    max_backsquat: "",
    id: profile.id,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // shows user profile
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        // const base_url = process.env.REACT_APP_BASE_URL
        const response = await axios.get(
          "http://127.0.0.1:8000/workouts/profile/" + profile.id + "/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setFormData(response.data);
      } catch (err) {
        // console.log(err.response.data)
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      user: profile.id,
      [e.target.name]: e.target.value,
    });
    // setFormData({ formData })
    console.log(formData, "SUBMITTED DATA TO BACKEND"); // delete when done, for testing only
  };

  console.log(formData, "SUBMITTED DATA TO BACKEND"); // delete when done, for testing only
  const handleUpdate = async (e) => {
    e.preventDefault();
    // validation of user-imputed data, numbers cannot be 0
    let errors = {};
    if (formData.max_snatch <= 0) {
      errors.max_snatch = "Max Snatch must be greater than 0";
    }
    if (formData.max_cleanjerk <= 0) {
      errors.max_cleanjerk = "Max Clean & Jerk must be greater than 0";
    }
    if (formData.max_frontsquat <= 0) {
      errors.max_frontsquat = "Max Front Squat must be greater than 0";
    }
    if (formData.max_backsquat <= 0) {
      errors.max_backsquat = "Max Back Squat must be greater than 0";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    // submission of the updated information
    const token = localStorage.getItem("token");
    try {
      // const base_url = process.env.REACT_APP_BASE_URL
      await axios.put(
        "http://127.0.0.1:8000/workouts/profile/" + profile.id + "/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setErrors({});
      setSubmitted(true);
      alert("Profile has been updated");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // deletion of profile
  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your profile?")) {
      const token = localStorage.getItem("token");
      try {
        // const base_url = process.env.REACT_APP_BASE_URL
        await axios.delete(
          "http://127.0.0.1:8000/workouts/profile/" + profile.id + "/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        alert("Profile has been deleted");
        setSubmitted(true);
        navigate("/app/");
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  if (submitted) {
    navigate("/workouts/");
  }

  return (
    <div className="container">
      <h1>Update Your Profile</h1>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Weight Unit:</label>
          <select
            name="weights"
            value={formData.weights}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">
              --Please choose your preferred weight system--
            </option>
            <option value="1">English -- LBs</option>
            <option value="2">Metric -- KGs</option>
          </select>
        </div>
        <div className="form-group">
          <label>Max Snatch:</label>
          <input
            type="number"
            id="max_snatch"
            name="max_snatch"
            value={formData.max_snatch}
            onChange={handleChange}
            className="form-control"
          />
          {errors.max_snatch && (
            <span className="text-danger">{errors.max_snatch}</span>
          )}
        </div>
        <div className="form-group">
          <label>Max Clean &amp; Jerk:</label>
          <input
            type="number"
            id="max_cleanjerk"
            name="max_cleanjerk"
            value={formData.max_cleanjerk}
            onChange={handleChange}
            className="form-control"
          />
          {errors.max_cleanjerk && (
            <span className="text-danger">{errors.max_cleanjerk}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="max_frontsquat">Max Front Squat:</label>
          <input
            type="number"
            id="max_frontsquat"
            name="max_frontsquat"
            value={formData.max_frontsquat}
            onChange={handleChange}
            className="form-control"
          />
          {errors.max_frontsquat && (
            <span className="text-danger">{errors.max_frontsquat}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="max_backsquat">Max Back Squat:</label>
          <input
            type="number"
            id="max_backsquat"
            name="max_backsquat"
            value={formData.max_backsquat}
            onChange={handleChange}
            className="form-control"
          />
          {errors.max_backsquat && (
            <span className="text-danger">{errors.max_backsquat}</span>
          )}
        </div>
        <br></br>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-sm">
            Submit and Go to Workouts
          </button>
          <br></br>
          <br></br>
          <br></br>
          <button onClick={handleDelete} className="btn btn-secondary btn-sm">
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateProfileForm = ({ profile }) => {
//   const [formData, setFormData] = useState({
//     user: "",
//     weights: "",
//     max_snatch: "",
//     max_cleanjerk: "",
//     max_frontsquat: "",
//     max_backsquat: "",
//     id: profile.id,
//   });

//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // shows user profile
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         // const base_url = process.env.REACT_APP_BASE_URL
//         const response = await axios.get(
//           "http://127.0.0.1:8000/workouts/profile/" + profile.id + "/",
//           {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           }
//         );
//         setFormData(response.data);
//       } catch (err) {
//         console.log(err.response.data);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       user: profile.id,
//       [e.target.name]: e.target.value,
//     });
//     setFormData({ formData });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     // validation of user-imputed data, numbers cannot be 0
//     let errors = {};
//     if (formData.max_snatch <= 0) {
//       errors.max_snatch = "Max Snatch must be greater than 0";
//     }
//     if (formData.max_cleanjerk <= 0) {
//       errors.max_cleanjerk = "Max Clean & Jerk must be greater than 0";
//     }
//     if (formData.max_frontsquat <= 0) {
//       errors.max_frontsquat = "Max Front Squat must be greater than 0";
//     }
//     if (formData.max_backsquat <= 0) {
//       errors.max_backsquat = "Max Back Squat must be greater than 0";
//     }
//     if (Object.keys(errors).length > 0) {
//       setErrors(errors);
//       return;
//     }
//     // submission of the updated information
//     const token = localStorage.getItem("token");
//     try {
//       // const base_url = process.env.REACT_APP_BASE_URL
//       await axios.put(
//         "http://127.0.0.1:8000/workouts/profile/" + profile.id + "/",
//         formData,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setErrors({});
//       setSubmitted(true);
//       alert("Profile has been updated");
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   };

//   // deletion of profile
//   const handleDelete = async (e) => {
//     e.preventDefault();
//     if (window.confirm("Are you sure you want to delete your profile?")) {
//       const token = localStorage.getItem("token");
//       try {
//         // const base_url = process.env.REACT_APP_BASE_URL
//         await axios.delete(
//           "http://127.0.0.1:8000/workouts/profile/" + profile.id + "/",
//           {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           }
//         );
//         alert("Profile has been deleted");
//         setSubmitted(true);
//         navigate("/app/");
//       } catch (err) {
//         console.log(err.response.data);
//       }
//     }
//   };

//   if (submitted) {
//     navigate("/workouts/");
//   }

//   return (
//     <div className="container">
//       <h1>Update Your Profile</h1>
//       <form onSubmit={handleUpdate}>
//         <div className="form-group">
//           <label>Weight Unit:</label>
//           <select
//             name="weights"
//             value={formData.weights}
//             onChange={handleChange}
//             className="form-control"
//           >
//             <option value="">
//               --Please choose your preferred weight system--
//             </option>
//             <option value="1">English -- LBs</option>
//             <option value="2">Metric -- KGs</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Max Snatch:</label>
//           <input
//             type="number"
//             id="max_snatch"
//             name="max_snatch"
//             value={formData.max_snatch}
//             onChange={handleChange}
//             className="form-control"
//           />
//           {errors.max_snatch && (
//             <span className="text-danger">{errors.max_snatch}</span>
//           )}
//         </div>
//         <div className="form-group">
//           <label>Max Clean &amp; Jerk:</label>
//           <input
//             type="number"
//             id="max_cleanjerk"
//             name="max_cleanjerk"
//             value={formData.max_cleanjerk}
//             onChange={handleChange}
//             className="form-control"
//           />
//           {errors.max_cleanjerk && (
//             <span className="text-danger">{errors.max_cleanjerk}</span>
//           )}
//         </div>
//         <div className="form-group">
//           <label htmlFor="max_frontsquat">Max Front Squat:</label>
//           <input
//             type="number"
//             id="max_frontsquat"
//             name="max_frontsquat"
//             value={formData.max_frontsquat}
//             onChange={handleChange}
//             className="form-control"
//           />
//           {errors.max_frontsquat && (
//             <span className="text-danger">{errors.max_frontsquat}</span>
//           )}
//         </div>
//         <div className="form-group">
//           <label htmlFor="max_backsquat">Max Back Squat:</label>
//           <input
//             type="number"
//             id="max_backsquat"
//             name="max_backsquat"
//             value={formData.max_backsquat}
//             onChange={handleChange}
//             className="form-control"
//           />
//           {errors.max_backsquat && (
//             <span className="text-danger">{errors.max_backsquat}</span>
//           )}
//         </div>
//         <br></br>
//         <div className="form-group">
//           <button type="submit" className="btn btn-primary btn-sm">
//             Submit and Go to Workouts
//           </button>
//           <br></br>
//           <br></br>
//           <br></br>
//           <button onClick={handleDelete} className="btn btn-secondary btn-sm">
//             Delete Profile
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfileForm;
