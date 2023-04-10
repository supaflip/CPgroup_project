import './App.css';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SigninPage from './pages/SigninPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AllProfilesPage from './pages/AllProfilesPage.jsx'
import StartPage from './pages/StartPage.jsx'
import Layout from './hocs/Layout';
import MyProfilePage from './pages/MyProfilePage';
import React from 'react';
import RandomWorkoutPage from './pages/RandomWorkoutPage';

function App() {

  const [USER_AUTH, setUserAuth] = React.useState({
    'TOKEN' : localStorage.getItem('token'), 
    'is_coach' : localStorage.getItem('is_coach')==='true'
  });

  return (
    <div>
      <Router> 
        <Layout USER_AUTH={USER_AUTH} setUserAuth={setUserAuth}>
          <Routes>
            <Route exact path="/app" element={<StartPage />} />
            <Route exact path="/workouts/*" element={<HomePage USER_AUTH={USER_AUTH}/>} />
            <Route exact path="/signin/" element={<SigninPage setUserAuth={setUserAuth}/>} />
            <Route exact path="/signup/" element={<SignupPage setUserAuth={setUserAuth}/>} />
            <Route exact path="/myprofile/" element={<MyProfilePage USER_AUTH={USER_AUTH}/>} />
            <Route exact path="/profile/*" element={<AllProfilesPage USER_AUTH={USER_AUTH}/>} />
            <Route exact path="/workoutgenerator/" element={<RandomWorkoutPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;