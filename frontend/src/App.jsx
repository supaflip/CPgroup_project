import './App.css';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreateProfilePage from './pages/CreateProfilePage.jsx'
// import UpdateProfilePage from './pages/UpdateProfilePage.js'
import SigninPage from './pages/SigninPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AllProfilesPage from './pages/AllProfilesPage.jsx'
import StartPage from './pages/StartPage.jsx'
import Layout from './hocs/Layout';
import AppNav from './components/AppNav';
import { Provider } from 'react-redux';
import MyProfilePage from './pages/MyProfilePage';
import React from 'react';

function App() {
  const [loggedin, setLoggedin] = React.useState(localStorage.getItem('token'));
  //initial value should be 
  return (
    <div>
      <Router> 
        <Layout loggedin={loggedin} setLoggedin={setLoggedin}>
          <Routes>
            <Route exact path="/app" element={<StartPage />} />
            <Route exact path="/workouts/*" element={<HomePage />} />
            <Route exact path="/signin/" element={<SigninPage setLoggedin={setLoggedin}/>} />
            <Route exact path="/signup/" element={<SignupPage setLoggedin={setLoggedin}/>} />
            <Route exact path="/create/" element={<CreateProfilePage />} />
            <Route exact path="/myprofile/" element={<MyProfilePage />} />
            <Route exact path="/profile/*" element={<AllProfilesPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;