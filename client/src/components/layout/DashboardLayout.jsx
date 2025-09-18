import { Briefcase, Building2, LogOut, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NAVIGATION_MENU } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const NavigationItem = ({ item, isActive, onClick, isCollapsed }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full cursor-pointer flex items-center px-3 py-2.5 text-md font-medium rounded-lg transition-all duration-300 group ${
        isActive
          ? "bg-blue-100 text-blue-700 shadow-sm shadow-blue-50 "
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:font-medium"
      }`}
    >
      <Icon
        className={`h-5 w-5 flex-shrink-0 ${
          isActive ? "text-blue-600 " : "text-gray-500"
        }`}
      />
      {!isCollapsed && <span className="ml-3 ">{item.name}</span>}
    </button>
  );
};

const DashboardLayout = ({ activeMenu, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(activeMenu || "dashboard");
  const [profileDropdownopen, setProfileDropdownopen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* close dropdown when clicking outside */
  useEffect(() => {
    const handlClickOutside = () => {
      if (profileDropdownopen) {
        setProfileDropdownopen(false);
      }
    };
    document.addEventListener("click", handlClickOutside);
    return () => document.removeEventListener("click", handlClickOutside);
  }, [profileDropdownopen]);

  const handleNavigation = (itemId) => {
    setActiveNavItem(itemId);
    navigate(`/employeer/${itemId}`);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const sidebarCollapsed = !isMobile && false;

  return (
    <section className="flex h-screen bg-gray-50">
      {/* sidebar */}
      {/*  */}
      <div
        className={`fixed z-50  inset-y-0 transition-transform duration-300 transform ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        } ${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white border-r border-gray-200 `}
      >
        {/* company logo */}
        <div className="flex items-center h-16 border-b border-gray-200 pl-6">
          {!sidebarCollapsed ? (
            <Link className="flex items-center space-x-3" to="/">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 font-bold uppercase text-xl">Hirix</span>
            </Link>
          ) : (
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        {/* navigation */}
        <nav className="p-4 space-y-2">
          {NAVIGATION_MENU.map((item) => {
            return (
              <NavigationItem
                key={item.id}
                item={item}
                isActive={activeNavItem === item.id}
                onClick={handleNavigation}
                isCollapsed={sidebarCollapsed}
              />
            );
          })}
        </nav>

        {/* logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 "
            onClick={logout}
          >
            <LogOut className="h-5 w-5 flex-shrink-0  text-gray-500" />
            {!sidebarCollapsed && (
              <span className="ml-3 font-semibold">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40  backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}{/* */}

      {/* main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* top navbar */}
        <header className="bg-white/80 background-blur-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30 ">{/* */}
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600" />
                )}
              </button>
            )}
            <div>
              <h1 className="text-base font-semibold text-gray-900">
                Welcome back!
              </h1>
              <p className="text-sm hidden sm:block text-gray-500 ">
                Here's what's happening with your jobs today.
              </p>
            </div>
          </div>

          <div className="flex items-center space-y-3">
            {/* profile dropdown */}

            <ProfileDropdown
              isOpen={profileDropdownopen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownopen(!profileDropdownopen);
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              role={user?.role || ""}
              email={user?.email || ""}
              onLogout={logout}
            />
          </div>
        </header>

        {/* main content area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </section>
  );
};

export default DashboardLayout;
