import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage/LandingPage";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import JobseekerDashboard from "../pages/Jobseeker/JobseekerDashboard";
import JobDetails from "../pages/Jobseeker/JobDetails";
import SavedJobs from "../pages/Jobseeker/SavedJobs";
import UserProfile from "../pages/Jobseeker/UserProfile";
import EmployeerDashboard from "../pages/Employeer/EmployeerDashboard";
import JobPostingForm from "../pages/Employeer/JobPostingForm";
import ManageJobs from "../pages/Employeer/ManageJobs";
import EmployeerProfilePage from "../pages/Employeer/EmployeerProfilePage";
import ApplicationViewer from "../pages/Employeer/ApplicationViewer";
import ProtectedRoute from "../protectedRouter/ProtectedRoute";
import EmployeerProtectionRoute from "../pages/Employeer/EmployeerProtectionRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "find-jobs",
        element: <JobseekerDashboard />,
      },
      {
        path: "jobs/:jobId",
        element: <JobDetails />,
      },
      {
        path: "saved-jobs",
        element: <SavedJobs />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "employeer",
        element: (
          <ProtectedRoute>
            <EmployeerProtectionRoute />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "employeer-dashboard",
            element: <EmployeerDashboard />,
          },
          {
            path: "post-jobs",
            element: <JobPostingForm />,
          },
          {
            path: "manage-jobs",
            element: <ManageJobs />,
          },
          {
            path: "company-profile",
            element: <EmployeerProfilePage />,
          },
          {
            path: "applicants",
            element: <ApplicationViewer />,
          },
        ],
      },
    ],
  },
]);

export default router;
