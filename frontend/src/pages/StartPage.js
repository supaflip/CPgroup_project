import React from "react";
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div>
      <br></br>
      <br></br>
      <h1>Bar Path Program</h1>
      <hr />
      <br></br>
      <div>
        <Link to="/signin">
          <button className="btn btn-primary">Sign In to Start</button>
          <br></br>
          <br></br>
        </Link>
        <Link to="/signup">
          <button className="btn btn-primary btn-sm">Create An Account</button>
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
