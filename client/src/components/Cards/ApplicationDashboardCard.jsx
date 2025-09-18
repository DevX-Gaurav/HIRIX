import { Clock } from "lucide-react";
import React from "react";

const ApplicationDashboardCard = ({ applicant, position, time }) => {
  return (
    <section className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors hover:shadow-sm  duration-200">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-indigo-500  rounded-xl flex items-center  justify-center">
          <span className="text-white text-xl font-medium">
            {applicant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}{" "}
          </span>
        </div>

        <div>
          <h4 className="text-[15px] font-medium text-gray-900">
            {applicant.name}
          </h4>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
    </section>
  );
};

export default ApplicationDashboardCard;
