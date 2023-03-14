import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import CreateProfilePage from './pages/CreateProfilePage.js'
import SigninPage from './pages/SigninPage.js'
import SignupPage from './pages/SignupPage.js'
import AllProfilesPage from './pages/AllProfilesPage.js'
import StartPage from './pages/StartPage.js'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path="/app/" element={<StartPage />} />
          <Route exact path="/workouts/*" element={<HomePage />} />
          <Route exact path="/signin/" element={<SigninPage />} />
          <Route exact path="/signup/" element={<SignupPage />} />
          <Route exact path="/create/" element={<CreateProfilePage />} />
          <Route exact path="/profile/*" element={<AllProfilesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
