import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };

    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };
      const res = await fetch("http://127.0.0.1:8000/accounts/signup/", config);
      const data = await res.json();
      console.log(data);
      // Navigate to the profile page
      navigate("/signin/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <br></br>
      <h2>Bar Path Program</h2>
      <hr />
      <br></br>
      <h3>Create An Account</h3>
      <br></br>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
        />
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <br></br>
        <br></br>
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default SignupPage;
