import React, { useState } from "react"
import { BrowserRouter, Link, Navigate, useNavigate } from "react-router-dom"
// import ProfileForm from "../components/ProfileForm"
import axios from 'axios'
import SignUpErrorUI from "../components/SignUpErrorUI";
import { confirmAlert } from 'react-confirm-alert';

const SignupPage = ({setUserAuth}) => {

  /* State Variables */
  const [redirect, setRedirect] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

   /* Variables */
   const { username, password } = formData;

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true); 


  /* Form Handlers */
  const onChange = e => {
    setIsCoach(e.target.checked);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(e.target.value);
    //console.log(e.target.checked);
  };

  const handleUI= () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <BrowserRouter>
            <SignUpErrorUI onClose={onClose}/>   
          </BrowserRouter>       
        );
      }
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };

      let res, data;

      if(isCoach) {
        res = await fetch('http://localhost:8000/accounts/coach_signup/', config);
        data = await res.json();

      } else {
        res = await fetch('http://127.0.0.1:8000/accounts/signup/', config);
        data = await res.json();
      }

      if (data.username == 'A user with that username already exists.') {
        handleUI()
      } else {
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
          localStorage.setItem("is_coach", res.data.is_coach);
          setUserAuth({ 'TOKEN': res.data.token, 'is_coach': res.data.is_coach })
          console.log(res.data); //  delete when done
          setRedirect(true);
        } catch (err) {
          console.error(err)
        }
      }
    } catch (err) {
      console.error(err);
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
            <div className="form-group">
              <input
                  type='checkbox'
                  checked={isCoach}
                  onChange={e => onChange(e)}
              />
              <label>coach</label>
            </div>
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
