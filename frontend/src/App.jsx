import React from 'react';
import Paskilan from './assets/Paskilan.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import { Link } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';


function LandingPage() {
    return (
        <div className="container" style={{ flexDirection:'column' }}>
            <div>
                <img className="title" src={Paskilan} alt="Paskilan Logo" />
            </div>
            <div>
                <p className="subtitle"> is a PUP web-based platform for campus event promotion and student engagement that creates a centralized online hub where campus organizations can promote their events and activities.</p>
            </div>

            <div className="container" style={{ flexDirection: 'column', gap: '10px' }}>

                <Link to="/LoginPage">
                    <button className="Primary" style={{ borderRadius: '20px' }}>Login</button>
                </Link>

                <Link to="/RegisterPage">
                    <button className="Secondary" style={{ borderRadius: '10px', padding: '7px 25px' }} alt="Click to register an account">Sign Up</button>
                </Link>
         </div>
        
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/RegisterPage" element={<RegisterPage />} />
            <Route path="/HomePage" element={<HomePage />} />
        </Routes>
    );
}

export default App;