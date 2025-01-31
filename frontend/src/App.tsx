// App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
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
import "./App.css";

// Add ProtectedRoute component
const ProtectedRoute = () => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <UserProvider>
<<<<<<< HEAD
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
=======
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="/org/StudentView" element={<OrgPageStudent />} />
            <Route path="/org/AdminView" element={<OrgPageAdmin />} />
            <Route path="/temporary-event" element={<TemporaryEventPage />} />
            <Route path="/*" element={<HomePage />} />
          </Route>
        </Routes>
>>>>>>> 6237f2916df997d12f0380e8b1b3e1da0c09b50c
      </UserProvider>
    </Router>
  );
}

export default App;