import React, { useEffect, useState } from "react";
import {
  Plus,
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import JobDashboardCard from "../../components/Cards/JobDashboardCard";
import ApplicationDashboardCard from "../../components/Cards/ApplicationDashboardCard";

const Card = ({ title, headerAction, subtitle, className, children }) => {
  return (
    <div
      className={`bg-white/80 rounded-xl border border-gray-100 shadow-sm hobver:shadow-md transition-shadow duration-200 ${className}`}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction}
        </div>
      )}

      <div className={title ? "px-6 pb-6" : "p-6"}>{children}</div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-500 to-emerald-600",
    purple: "from-violet-500 to-violet-600",
    orange: "from-orange-500 to-orange-600",
  };
  return (
    <Card
      className={`bg-gradient-to-br ${colorClasses[color]} text-white border-0`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 mr-1 " />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-white/15 p-3 rounded-xl">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

const EmployeerDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardOverview = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.OVERVIEW);
      console.log("response", response);

      if (response.status === 200) {
        setDashboardData(response.data);
        console.log("response", response);
        console.log("responseData", response.data);
        console.log("dashboard data", dashboardData);
      }
    } catch (error) {
      console.log("error from employer dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDashboardOverview();
    return () => {};
  }, []);
  return (
    <div>
      <DashboardLayout activeMenu="employeer/employeer-dashboard">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="max-w-7xl mx-auto space-y-8">
            {/* dashboard stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6   ">
              {" "}
              {/* mb-96 */}
              <StatCard
                title="Active Jobs"
                trend={true}
                value={dashboardData?.counts?.totalActiveJobs || 0}
                icon={Briefcase}
                trendValue={`${
                  dashboardData?.counts?.trends?.activeJobs || 0
                }%`}
                color="blue"
              />
              <StatCard
                title="Total Applicants"
                trend={true}
                value={dashboardData?.counts?.totalApplications || 0}
                icon={Users}
                trendValue={`${
                  dashboardData?.counts?.trends?.totalApplicants || 0
                }%`}
                color="green"
              />
              <StatCard
                title="Hired"
                trend={true}
                value={dashboardData?.counts?.totalHired || 0}
                icon={CheckCircle2}
                trendValue={`${
                  dashboardData?.counts?.trends?.totalHired || 0
                }%`}
                color="purple"
              />
            </div>

            {/* recent activity */}
            <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
              <Card
                title="Recent Job Posts"
                subtitle="Your latest job postings"
                headerAction={
                  <button
                    className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                    onClick={() => navigate("/employeer/manage-jobs")}
                  >
                    View all
                  </button>
                }
              >
                <div className="space-y-3">
                  {dashboardData?.data?.recentJobs
                    ?.slice(0, 3)
                    ?.map((job, idx) => (
                      <JobDashboardCard key={idx} job={job} />
                    ))}
                </div>
              </Card>

              <Card
                title="Recent Applications"
                subtitle="Latest candidate applications"
                headerAction={
                  <button
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => navigate("/employeer/manage-jobs")}
                  >
                    View all
                  </button>
                }
              >
                <div className="space-y-3">
                  {dashboardData?.data?.recentApplications
                    ?.slice(0, 3)
                    ?.map((data, index) => (
                      <ApplicationDashboardCard
                        key={index}
                        applicant={data?.applicant || ""}
                        position={data?.job?.title || ""}
                        time={moment(data?.updatedAt).fromNow()}
                      />
                    ))}

                  
                </div>
              </Card>
            </div>

            {/* Quick actions */}
            <Card
              title="Quick Actions"
              subtitle="Common tasks to get you started"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Post New Job",
                    icon: Plus,
                    color: "bg-blue-100 text-blue-700",
                    path: "/employeer/post-jobs",
                  },
                  {
                    title: "Review Applications",
                    icon: Users,
                    color: "bg-green-100 text-green-700",
                    path: "/employeer/manage-jobs",
                  },
                  {
                    title: "Company Settings",
                    icon: Building2,
                    color: "bg-orange-100 text-orange-700",
                    path: "/employeer/company-profile",
                  },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="flex itemx-center space-x-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 text-left"
                    onClick={() => navigate(action.path)}
                  >
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-900">
                      {action.title}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default EmployeerDashboard;
