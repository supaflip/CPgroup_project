import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function StartPage() {
  
  return (
    <div className='container'>
      <div className='jumbotron mt-5'>
          <h1 className='display-4'>Welcome to the Bar Path Program!</h1>
          <p className='lead'>This is an application built to ensure you get maximum GAINZ!</p>
          <hr className='my-4' />
          <p>Login with the button below:</p>
          <Link className='btn btn-primary btn-lg' to='/signin' role='button'>Login</Link>
      </div>
    </div>
)
}

export default StartPage