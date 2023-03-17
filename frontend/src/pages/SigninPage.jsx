import React, { useState } from "react";
import axios from "axios";
// import { Routes, Route } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

const SigninPage = ({setLoggedin}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(user);
      const res = await axios.post(
        "http://127.0.0.1:8000/accounts/signin/",
        body,
        config
      );
      localStorage.setItem("token", res.data.token);
      console.log(res.data); //  delete when done
      setRedirect(true);
      setLoggedin(true);
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  if (redirect) {
    return (
      <Navigate to="/workouts/" replace={true} username={formData.username} />
    ); // change navigation to /profile/ for adding data based on Profile model fields
  }

  return (
    <div className="container mt-5">
      <h1 className="textalignleft">Sign In</h1>
      <p className="textalignleft">Sign into your Bar Path Account</p>
      <form className="textalignleft" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <button className="btnbtn-primary" type="submit">
          Login
        </button>
      </form>
      <br></br>
      <p className="textalignleft">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <p className="textalignleft">
        Forgot Your Password? <Link to="/reset-password">Reset Password</Link>
      </p>
    </div>
  );
};

export default SigninPage;





// import React, { useState } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// const SigninPage = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const { username, password } = formData;
//   const [redirect, setRedirect] = useState(false);
//   const [error, setError] = useState(null);

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const user = {
//       username,
//       password,
//     };

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const body = JSON.stringify(user);
//       const res = await axios.post(
//         "http://127.0.0.1:8000/accounts/signin/",
//         body,
//         config
//       );
//       localStorage.setItem("token", res.data.token);
//       console.log(res.data); //  delete when done
//       setRedirect(true);
//     } catch (err) {
//       console.error(err);
//       setError("Invalid credentials");
//     }
//   };

//   if (redirect) {
//     return <Navigate to="/create/" replace={true} />; // change navigation to /profile/ for adding data based on Profile model fields
//   }

//   return (
//     <div>
//       <br></br>
//       <h2>Bar Path Program</h2>
//       <hr />
//       <br></br>
//       <h3>Please Sign In</h3>
//       {error && <p>{error}</p>}
//       <br></br>
//       <form onSubmit={(e) => onSubmit(e)}>
//         <input
//           type="text"
//           placeholder="Username"
//           name="username"
//           value={username}
//           onChange={(e) => onChange(e)}
//         />
//         <br></br>
//         <br></br>
//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={password}
//           onChange={(e) => onChange(e)}
//         />
//         <br></br>
//         <br></br>
//         <input type="submit" value="Signin" />
//       </form>
//     </div>
//   );
// };

// export default SigninPage;
