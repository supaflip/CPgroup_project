import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UpdateProfileForm from "../components/UpdateProfileForm";

function ProfilePage({ profiles }) {
  const params = useParams();

  const athlete = profiles.find(
    (profile) => profile.id === Number(params.profileID)
  );

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleButtonClick = () => {
    setShowUpdateForm(true);
  };

  return (
    <div>
      <br></br>
      <h2>Bar Path Program</h2>
      <hr />
      <br></br>
      <h4>Hello Athlete # {athlete.id}!</h4>
      <br></br>
      <p>These are your current 1 rep maxes:</p>
      <div className="profile_breakdown">
        <p>
          Snatch:{" "}
          {athlete.weights === 1
            ? `${athlete.max_snatch} LB`
            : `${athlete.max_snatch} KG`}
        </p>
        <p>
          Clean & Jerk:{" "}
          {athlete.weights === 1
            ? `${athlete.max_cleanjerk} LB`
            : `${athlete.max_cleanjerk} KG`}
        </p>
        <p>
          Front Squat:{" "}
          {athlete.weights === 1
            ? `${athlete.max_frontsquat} LB`
            : `${athlete.max_frontsquat} KG`}
        </p>
        <p>
          Back Squat:{" "}
          {athlete.weights === 1
            ? `${athlete.max_backsquat} LB`
            : `${athlete.max_backsquat} KG`}
        </p>
      </div>
      <div>
        <br></br>
        <Link to="/workouts">
          <button className="btn btn-primary btn-sm">Go to Workouts</button>
          <br></br>
          <br></br>
        </Link>
      </div>
      <div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleButtonClick}
        >
          Update Profile
        </button>
        {showUpdateForm && <UpdateProfileForm profile={athlete} />}
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

export default ProfilePage;
