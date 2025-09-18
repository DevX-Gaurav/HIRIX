import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="firxed top-0 left-0 right-0  bg-white/95 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 uppercase">Hirix</span>
          </div>
          {/* navigation  hidden for mobile */}
          

          {/* Auth buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* <span className="text-gray-700 hidden md:block ">
                  Welcome {user?.name}{" "}
                </span> */}

                {user?.avatar ? (
                  <>
                    <div className="text-gray-700 hidden md:block ">Welcome, {user?.name?.split(" ")[0]}</div>

                    <img
                      src={user?.avatar}
                      alt="Avatar"
                      className="h-9 hidden md:block w-9 object-cover rounded-xl"
                    />
                  </>
                ) : (
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                <a
                  href={
                    user.role === "employeer"
                      ? "/employeer/employeer-dashboard"
                      : "/find-jobs"
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium  hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <a
                  href="login"
                  className="cursor-pointer text-gray-600  font-medium transition-colors px-6 py-2 rounded-lg hover:bg-gray-500  hover:text-white "
                >
                  Login
                </a>
                <a
                  href="signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700  hover:to-purple-700 transition-all shadow-sm hover:shadow-md duration-300 cursor-pointer"
                >
                  Signup
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
