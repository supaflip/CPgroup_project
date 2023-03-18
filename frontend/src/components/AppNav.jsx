import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import axios from "axios";

function AppNav({loggedin}) {

  const [redirect, setRedirect] = useState(false);

  const handleSignout = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      await axios.post('http://127.0.0.1:8000/accounts/signout/', null, config);
      localStorage.removeItem('token');
    } catch (err) {
      console.error(err);
    }
  };

  const guestLinks = () => (
      <Fragment>
          <li className='nav-item active'>
              <Nav.Link className='ex2' href='/signin'>Login</Nav.Link>
          </li>
          <br></br>
          <li className='nav-item active'>
              <Nav.Link href='/signup'>Signup</Nav.Link >
          </li>
      </Fragment>
  );
    
  const authLinks = () => (
      <Fragment>
          <li className='nav-item active'>
              <Nav.Link className='ex2' href='/workouts/'>Workouts</Nav.Link>
          </li>
          <br></br>
          <li className='nav-item active'>
              <Nav.Link className='ex2' href='/myprofile/'>My Profile</Nav.Link>
          </li>
          <br></br>
          <li className='nav-item active'>
              <Nav.Link className='ex2' href='/profile/'>See All Profiles</Nav.Link>
          </li>
          <br></br>
          <li className='nav-item active'>
              <Nav.Link className='ex2' href='https://blog.nasm.org/'>NASM Fitness Blog</Nav.Link>
          </li>
          <br></br>
          <li className='nav-item active'>
              <Nav.Link className='ex2' href='/app' onClick={handleSignout} text="signout">Signout</Nav.Link>
          </li>
      </Fragment>
  );


    
  return(
      <div>
          <Navbar bg="light" expand="lg"> 
          <a className='navbar-brand'>
          <img src="https://cdn.shopify.com/s/files/1/2534/2440/products/istockphoto-1203011520-612x612_b31d7ede-8f0f-4e7f-8dff-ac75febcfc4f_480x480.jpg?v=1657655237" alt="securestruximage" width="60"/> Bar Path Program
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">{loggedin ? authLinks() : guestLinks()}</Nav>
              </Navbar.Collapse>
          </Navbar>
          {redirect ? <Navigate to='/app' /> : <Fragment></Fragment>}
      </div>
    )
}


export default AppNav;
