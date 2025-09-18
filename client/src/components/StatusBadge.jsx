import React from "react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Applied: "bg-gray-200  text-gray-800",
    Review: "bg-yellow-100  text-yellow-800",
    Accepted: "bg-green-200  text-green-800",
    Rejected: "bg-red-200  text-red-800",
  };
  return (
    <section
      className={`px-3 py-1 cursor-not-allowed  rounded text-sm font-medium ${
        statusConfig[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </section>
  );
};

export default StatusBadge;
