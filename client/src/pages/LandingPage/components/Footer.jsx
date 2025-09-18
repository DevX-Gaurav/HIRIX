import { Briefcase } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative  text-gray-900 overflow-hidden">
      <div className="relative  px-6 py-16 z-10">
        <div className="max-w-6xl mx-auto">
          {/* main footer content */}
          <div className="text-center space-y-8">
            {/* logo */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold uppercase text-gray-800">
                  hirix
                </h3>
              </div>
              <p className={`text-sm text-gray-600 max-w-md mx-auto`}>
                Connecting talented professionals with innovative companies
                worldwide.Your career success is our mission.
              </p>
            </div>
            {/* copywrite */}
            <div className="space-y-2">
              <p className={`text-sm text-gray-600`}>
                ©{new Date().getFullYear()} Time to Join Us.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
