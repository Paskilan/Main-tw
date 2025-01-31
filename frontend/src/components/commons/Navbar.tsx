// src/components/commons/Navbar.tsx
import { useState } from 'react';
import { FiBell, FiHelpCircle, FiSettings, FiSearch } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { HiMenu } from 'react-icons/hi';
import { Input } from '@/components/ui/input';
import NavbarTexture from '@/assets/navbar_texture.png';
import PaskilanCircle from '@/assets/paskilan_circle.png';
import { useUser } from '@/contexts/UserContext';


export function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { profile, loading } = useUser();

  return (
    <div
      className="relative w-full h-16 text-gray-300"
      style={{
        backgroundImage: `url(${NavbarTexture})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0px 14px 14.1px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            className="block md:hidden p-2 rounded-md hover:bg-gray-800"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <HiMenu size={24} />
          </button>

          <Link to="/home" className="cursor-pointer">
            <img
              src={PaskilanCircle}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>

          <div className="flex items-center bg-white rounded-lg px-[20px] py-1 space-x-2 w-full md:w-[80%]">
            <FiSearch size={18} className="text-gray-500" />
            <Input
              id="search"
              type="text"
              placeholder="Search"
              className="w-full border-none bg-transparent outline-none text-gray-700 placeholder-gray-500 placeholder:text-lg3 focus:outline-none p1-1"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 gap-2 p-4">
          
        {/* User Profile Picture */}
        {!loading && profile && (
          <Link to="/settings/profile">
            <img
              src={profile.profilePicture}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
            />
          </Link>
        )}

          <Link to="/settings" className="cursor-pointer hover:text-white">
            <FiSettings size={24} />
          </Link>
        </div>
      </div>

      {/* Sidebar (Mobile View) */}
      {isSidebarOpen && (
        <div className="absolute top-16 left-0 w-64 bg-gray-800 h-screen shadow-lg md:hidden">
          <div className="p-4">
            <div className="text-lg font-medium">Menu</div>
          </div>
        </div>
      )}
    </div>
  );
}