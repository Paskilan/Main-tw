import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/**pages */
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import EventPage from './pages/EventPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/**styles */
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/event" element={<EventPage/>} />
        <Route path="/settings/*" element={<SettingsPage/>} />
      </Routes>
    </Router>
  );
}

export default App