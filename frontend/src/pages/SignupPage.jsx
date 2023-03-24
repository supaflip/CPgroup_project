import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
// import ProfileForm from "../components/ProfileForm"
import axios from 'axios'

const SignupPage = ({setLoggedin}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [redirect, setRedirect] = useState(false)

  const { username, password } = formData;
  
  const [error, setError] = useState(null)

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      username,
      password
    };

    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      const res = await fetch('http://127.0.0.1:8000/accounts/signup/', config);
      const data = await res.json();
      console.log(data.username);
      if (data.username == 'A user with that username already exists.') {
        alert('A user with that username already exists.')
      }

    } catch (err) {
      console.error(err);
      
    }
    if (data.username !== 'A user with that username already exists.') {
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
        console.error(err)
        setError('Invalid credentials')
      }
    }
  }


  if (redirect) {
    return <Navigate to="/create/" replace={true}/>  // change navigation to /profile/ for adding data based on Profile model fields
  }

  return (
    <div className='container mt-5'>
        <h1 className="textalignleft" >Sign Up</h1>
        <p className="textalignleft">Create your Bar Path Account</p>
        <form className="textalignleft" onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Username*'
                    name='username'
                    value={username}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            {/* <div className='form-group'>
                <input
                    className='form-control'
                    type='email'
                    placeholder='Email*'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                />
            </div> */}
            <div className='form-group'>
                <input
                    className='form-control'
                    type='password'
                    placeholder='Password*'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    minLength='6'
                    required
                />
            </div>
            {/* <div className='form-group'>
                <input
                    className='form-control'
                    type='password'
                    placeholder='Confirm Password*'
                    name='re_password'
                    value={re_password}
                    onChange={e => onChange(e)}
                    minLength='6'
                    required
                />
            </div> */}
            <button className='btnbtn-primary' type='submit'>Register</button>
        </form>
        <br></br>
        <p className="textalignleft">
            Already have an account? <Link to='/signin'>Sign In</Link>
        </p>
    </div>
);
}

export default SignupPage

{/* <div>
      <br></br>
      <h2>Bar Path Program</h2>
      <hr />
      <br></br>
      <h3>Create An Account</h3>
      <br></br>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={e => onChange(e)}
        />
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
        />
        <br></br>
        <br></br>
        <input type="submit" value="Signup" />
      </form>
    </div> */}