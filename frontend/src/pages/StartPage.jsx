import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function StartPage() {
  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <h1 className="display-4">Welcome to the Bar Path Program!</h1>
        <p className="lead">
          This is an application built to ensure you get maximum GAINZ!
        </p>
        <hr className="my-4" />
        <p>Login with the button below:</p>
        <Link className="btn btn-primary btn-lg" to="/signin" role="button">
          Login
        </Link>
      </div>
    </div>
  );
}

export default StartPage;






// import React from "react";
// import { Link } from "react-router-dom";

// function StartPage() {
//   return (
//     <div>
//       <br></br>
//       <br></br>
//       <h1>Bar Path Program</h1>
//       <hr />
//       <br></br>
//       <div>
//         <Link to="/signin">
//           <button className="btn btn-primary">Sign In to Start</button>
//           <br></br>
//           <br></br>
//         </Link>
//         <Link to="/signup">
//           <button className="btn btn-primary btn-sm">Create An Account</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default StartPage;
