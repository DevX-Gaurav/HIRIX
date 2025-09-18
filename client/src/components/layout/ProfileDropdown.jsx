import { ChevronDown, ChevronUp, LogOut, User, UserRound } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
  role,
  userRole,
}) => {
  const navigate = useNavigate();

  return (
    <section className="relative">
      <button
        onClick={onToggle}
        className="flex cursor-pointer items-center space-x-3 p-2 rounded-lg transition-all   hover:shadow-sm  duration-200"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="h-9 w-9 object-cover rounded-xl"
          />
        ) : (
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {companyName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">{companyName}</p>
          <p className="text-xs text-gray-500 capitalize">{role}</p>
          <p className="text-xs text-gray-500 capitalize">{userRole}</p>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div>
          <div className="bg-white   absolute right-0 mt-4 w-56  rounded-xl shadow-lg border border-gray-200  z-50">{/*  */}
            <p className="text-sm pt-4 px-4  font-medium text-gray-900">
              {companyName}
            </p>
            <p className="text-sm px-4 pb-2 text-gray-500">{email}</p>

            <div className="border-t cursor-pointer border-gray-200 ">
              <a
                className="block p-2 px-4  cursor-pointer text-gray-700 hover:bg-gray-200 transition-colors rounded-md duration-200"
                onClick={() =>
                  navigate(
                    userRole === "jobseeker"
                      ? "/profile"
                      : "/employeer/company-profile"
                  )
                }
              >
                View Profile
              </a>
            </div>

            <div
              onClick={onLogout}
              className="border-t flex relative rounded-md   hover:bg-gray-200 cursor-pointer border-gray-200 "
            >
              <a
                href="#"
                className="block p-2 px-4 text-md text-red-500  transition-colors duration-200"
              >
                Logout
              </a>
              <LogOut className=" absolute left-18 top-3.5  h-4 w-4 flex-shrink-0  text-gray-500" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileDropdown;
