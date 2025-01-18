import { LogOut, User, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

interface SettingItem {
  name: string;
  slug: string;
  icon: JSX.Element;
}

const settings: SettingItem[] = [
  { name: "Profile", slug: "profile", icon: <User /> },
  { name: "Manage Group", slug: "manage-group", icon: <UserPlus /> },
  { name: "Logout", slug: "logout", icon: <LogOut /> },
];

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export function SettingSidebar({ activePage, setActivePage }: SidebarProps) {
  const navigate = useNavigate();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {
    setShowLogoutAlert(true);
    setTimeout(() => {
      setShowLogoutAlert(false);
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <div className="w-[250px] bg-pup-maroon1 dark:bg-pup-maroon2 p-5 flex flex-col gap-6">
        {settings.map((setting, index) => (
          <div
            key={index}
            onClick={() => 
              setting.slug === "logout"
                ? handleLogout()
                : setActivePage(setting.slug)
            }
            className="text-white text-lg flex items-center font-poppins
                      gap-3 p-2 rounded 
                      hover:bg-pup-maroon2 cursor-pointer"
          >
            {setting.icon}
            <span className={`${activePage === setting.slug ? "font-bold" : ""}`}>
              {setting.name}
            </span>
          </div>
        ))}
      </div>

      {showLogoutAlert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert className="bg-white w-64">
            <AlertTitle>Logging out...</AlertTitle>
            <AlertDescription>
              Redirecting to landing page
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
