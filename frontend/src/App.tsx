
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/**pages */
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import EventPage from "./pages/EventPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrgPageStudent from "./pages/OrgPageStudent";
import OrgPageAdmin from "./pages/OrgPageAdmin";
import TemporaryEventPage from "./pages/TemporaryEventPage";
import { UserProvider } from './contexts/UserContext';

/**styles */
import "./App.css";

function App() {
  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/settings/*" element={<SettingsPage />} />
        <Route path="/org/StudentView" element={<OrgPageStudent />} />
        <Route path="/org/AdminView/:orgId" element={<OrgPageAdmin />} />
        <Route path="/temporary-event" element={<TemporaryEventPage />} />
      </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
