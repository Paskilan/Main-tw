import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { SettingSidebar } from "@/components/layouts/settings/SettingSidebar";
import { Navbar } from "@/components/commons/Navbar";
import ProfileSettingsUpdate from "@/components/layouts/settings/profile_settings_update-view";
import ManageGroup from "@/components/layouts/settings/manage_group-view";

export default function SettingsLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active page based on the current URL
  const activePage = location.pathname.split("/").pop() || "profile";

  // Render the layout with sidebar and routes
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SettingSidebar activePage={activePage} setActivePage={(page) => navigate(`/settings/${page}`)} />
        <div className="container p-10 w-1/2">
          <Routes>
            {/* Redirect exact /settings path to /settings/profile */}
            <Route path="/" element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileSettingsUpdate />} />
            <Route path="manage-group" element={<ManageGroup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
