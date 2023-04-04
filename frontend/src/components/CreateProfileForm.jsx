import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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
        "https://d3tr9iv1x8so5z.cloudfront.net/workouts/profile/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const userIndex = Math.max(
        ...response.data.result.map((item) => item.user)
      );
      //console.log('USER IDX : ', userIndex);
      setFormData({
        ...formData,
        user: userIndex,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
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
        "https://d3tr9iv1x8so5z.cloudfront.net/workouts/profile/",
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

      // console.log(response.data.id)
      alert("Profile has been created");
      navigate("/myprofile/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="container">
      {!localStorage.getItem('token') && <Navigate to="/app" />}
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
