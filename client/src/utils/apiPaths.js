export const BASE_URI = import.meta.env.VITE_API_URL;

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register" /* signup */,
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/user/profile",
    DELETE_RESUME: "/api/user/resume",
  },
  DASHBOARD: {
    OVERVIEW: "/api/analytics/overview",
  },
  JOBS: {
    GET_ALL_JOBS: "/api/jobs",
    POST_JOB: "/api/jobs",
    GET_JOBS_EMPLOYEER: "/api/jobs/get-jobs-employeer",
    GET_JOB_BY_ID: (id) => `/api/jobs/${id}`,
    UPDATE_JOB: (id) => `/api/jobs/${id}`,
    TOGGLE_CLOSE: (id) => `/api/jobs/${id}/toggle-close`,
    DELETE_JOB: (id) => `/api/jobs/${id}`,

    SAVE_JOB: (id) => `/api/save-jobs/${id}`,
    UNSAVE_JOB: (id) => `/api/save-jobs/${id}`,
    GET_SAVED_JOBS: "/api/save-jobs/my",
  },

  APPLICATIONS: {
    APPLY_TO_JOB: (id) => `/api/applications/${id}`,
    GET_ALL_APPLICATIONS: (id) => `/api/applications/job/${id}`,
    UPDATE_STATUS: (id) => `/api/applications/${id}/status`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};
