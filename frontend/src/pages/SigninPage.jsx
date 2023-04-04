import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate, BrowserRouter } from 'react-router-dom'
import SignInErrorUI from '../components/SignInErrorUI'
import { confirmAlert } from 'react-confirm-alert';


const SigninPage = ({setUserAuth}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const [redirect, setRedirect] = useState(false);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUI = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <BrowserRouter>
            <SignInErrorUI onClose={onClose}/>   
          </BrowserRouter>       
        );
      }
    });
  };

  const onSubmit = async e => {
    e.preventDefault()
    const user = {
      username,
      password
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(user);
      const res = await axios.post(
        "https://d3tr9iv1x8so5z.cloudfront.net/accounts/signin/",
        body,
        config
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("is_coach", res.data.is_coach);
      setRedirect(true);
      setUserAuth({'TOKEN' : res.data.token, 'is_coach' : res.data.is_coach});
    } catch (err) {
      console.log(err)
      console.error(err)
      handleUI()
    }
  }

  if (redirect) {
    return <Navigate to="/workouts/" replace={true} username={formData.username}/>  // change navigation to /profile/ for adding data based on Profile model fields
  }

  return (
    <div className="container mt-5">
      <h1 className="textalignleft">Sign In</h1>
      <p className="textalignleft">Sign into your Bar Path Account</p>
      <form className="textalignleft" onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input 
            className="form-control"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={e => onChange(e)}
            />

        </div>
        <div className='form-group'>
          <input 
            className="form-control"
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
            required
            />
        </div>
        <button className="btnbtn-primary" type='submit'>Login</button>
      </form>
      <br></br>
      <p className='textalignleft'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </p>
      <p className='textalignleft'>
        Forgot Your Password? <Link to='/reset-password'>Reset Password</Link>
      </p>
    </div>
);
}

export default SigninPage