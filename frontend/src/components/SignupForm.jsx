import React, { useState } from "react"
import { BrowserRouter, Link, Navigate, useNavigate } from "react-router-dom"
import axios from 'axios'
import SignUpErrorUI from "../components/SignUpErrorUI";
import { confirmAlert } from 'react-confirm-alert';

const SignupForm = ({ setUserAuth }) => {

    const [isCoachChecked, setIsCoachChecked] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '', });
    const [redirect, setRedirect] = useState(false);

    const srcPage = window.location.pathname;
    const { username, password } = formData;

    const onChange = e => {
        setIsCoachChecked(e.target.checked);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUI = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <BrowserRouter>
                        <SignUpErrorUI onClose={onClose} />
                    </BrowserRouter>
                );
            }
        });
    };

    const onSubmit = async e => {
        e.preventDefault();

        /* Initial password when the component is used in [See All Profiles] page */
        let user = { username, password };
        if(srcPage === '/profile/')
            user.password = '123456';

        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            };

            let res, data;

            if (isCoachChecked) {
                res = await fetch('http://localhost:8000/accounts/coach_signup/', config);
                data = await res.json();

            } else {
                res = await fetch('http://localhost:8000/accounts/signup/', config);
                data = await res.json();
            }

            if (data.username == 'A user with that username already exists.') {
                handleUI()
            } else {
                if (srcPage === '/profile/') {  /* when signup acct is requested by coach; AllProfilesPage */
                    alert('The new user acct was created by coach');
                    /* user profile update */
                    window.location.reload(false);

                } else {                        /* when signup acct is requested by user; SignUpPage */
                    try {
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };
                        const body = JSON.stringify(user);
                        const res = await axios.post(
                            "http://localhost:8000/accounts/signin/",
                            body,
                            config
                        );
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("is_coach", res.data.is_coach);
                        setUserAuth({ 'TOKEN': res.data.token, 'is_coach': res.data.is_coach })
                        alert('Update your profile, please')
                        setRedirect(true);
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (redirect) {
        return (<Navigate to="/myprofile/" replace={true} />)   // change navigation to /profile/ for adding data based on Profile model fields
    }

    return (
        <div className='container mt-5'>
            <h1 className="textalignleft">
                {srcPage === '/profile/' ? 'Create New Account' : 'Sign Up'}
            </h1>
            <p className="textalignleft">
                {srcPage === '/profile/' ? 'The initial password is 123456' : 'Create your Bar Path Account'}
            </p>
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
                {(srcPage !== '/profile/') && <div className='form-group'>
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
                </div>}
                {(srcPage !== '/profile/') && <div className="form-group">
                    <label>Are you a Coach?&nbsp;</label>
                    <input
                        type='checkbox'
                        checked={isCoachChecked}
                        onChange={e => onChange(e)}
                    />
                </div>}
                <button className='btnbtn-primary' type='submit'>Register</button>
            </form>
            <br></br>
            {(srcPage !== '/profile/') && <p className="textalignleft">
                Already have an account? <Link to='/signin'>Sign In</Link>
            </p>}
        </div>
    );
}

export default SignupForm
