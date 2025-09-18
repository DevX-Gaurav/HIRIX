import { Bookmark, Briefcase } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  /* close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0  bg-white/95 backdrop-blur-sm border-b z-50 border-gray-100">
      {/*  */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <Link className="flex items-center space-x-3" to="/">
            {/* can be also linke to '/find-jobs' */}
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 uppercase">
              Hirix
            </span>
          </Link>

          {/* auth button */}
          <div className="flex items-center space-x-3">
            {user && (
              <button
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative"
                onClick={() => navigate("/saved-jobs")}
              >
                <Bookmark className="w-5 h-5 text-gray-500   " />
              </button>
            )}
            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                userRole={user?.role || ""}
                onLogout={logout}
              />
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-6 py-2 rounded-lg hover:bg-gray-500"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 transition-all font-medium  py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 duration-300 shadow-sm hover:shadow-md "
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
