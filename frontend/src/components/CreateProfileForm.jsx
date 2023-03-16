import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProfileForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    weights: "",
    max_snatch: "",
    max_cleanjerk: "",
    max_frontsquat: "",
    max_backsquat: "",
  });

  const [profileData, setProfileData] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const {
    user,
    weights,
    max_snatch,
    max_cleanjerk,
    max_frontsquat,
    max_backsquat,
  } = formData;

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      // const base_url = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(
        "http://127.0.0.1:8000/workouts/profile/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const userIndex = Math.max(
        ...response.data.result.map((item) => item.user)
      );
      console.log("User Index", userIndex)
      setFormData({
        ...formData,
        user: userIndex,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      // const base_url = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(
        `http://127.0.0.1:8000/workouts/profile/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const user = response.data.result.find(
        (object) => object === localStorage.getItem("object")
      );
      console.log("ID", user.id)
      setProfileData(user.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // const base_url = process.env.REACT_APP_BASE_URL
      const response = await axios.post(
        "http://127.0.0.1:8000/workouts/profile/",
        formData,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      setFormData({
        user: formData.user,
        weights: "",
        max_snatch: "",
        max_cleanjerk: "",
        max_frontsquat: "",
        max_backsquat: "",
      });

      // console.log("Handle Submit Response", response) // delete when done
      // console.log("Response", response.data.user) // delete when done
      // console.log(response.data.id)

      alert("Profile has been created");
      setSubmitted(true);
      navigate("/workouts/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  console.log("Profile Data", profileData);
  if (submitted) {
    navigate("/workouts/");
  }

  return (
    <div className="container">
      <h3>Create Your Profile</h3>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Weight Unit:</label>
          <select
            name="weights"
            value={weights}
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
            name="max_snatch"
            value={max_snatch}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Max Clean &amp; Jerk:</label>
          <input
            type="number"
            name="max_cleanjerk"
            value={max_cleanjerk}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Max Front Squat:</label>
          <input
            type="number"
            name="max_frontsquat"
            value={max_frontsquat}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Max Back Squat:</label>
          <input
            type="number"
            name="max_backsquat"
            value={max_backsquat}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <br></br>
        <br></br>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfileForm;
