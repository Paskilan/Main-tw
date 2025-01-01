import { LogOut, User, UserPlus } from "lucide-react";

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
  return (
    <div className="w-[250px] bg-pup-maroon1 dark:bg-pup-maroon2 p-5 flex flex-col gap-6">
      {settings.map((setting, index) => (
        <div
          key={index}
          onClick={() => 
            setting.slug === "logout"
              ? alert("Logging out...") // Handle logout here
              : setActivePage(setting.slug)
          }
          className="text-white text-lg flex items-center font-poppins
                    gap-3 p-2 rounded 
                    hover:bg-pup-maroon2 cursor-pointer"
          >
          {setting.icon}
          <span className={`${activePage === setting.slug ? "font-bold" : ""}`}>{setting.name}</span>
        </div>
      ))}
    </div>
  );
}
