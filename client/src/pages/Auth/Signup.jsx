import { motion } from "framer-motion";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  CheckCircle,
  User,
  Upload,
  UserCheck,
  Building2,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  validateAvatar,
  validateEmail,
  validatePassword,
} from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import uploadImage from "../../utils/uploadImage";

const Signup = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    error: {},
    showPassword: false,
    success: false,
    avatarPreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formState.error[name]) {
      setFormState((prev) => ({
        ...prev,
        error: { ...prev.error, [name]: "" },
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    if (formState.error.role) {
      setFormState((prev) => ({
        ...prev,
        error: { ...prev.error, role: "" },
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateAvatar(file);
      if (error) {
        setFormState((prev) => ({
          ...prev,
          error: { ...prev.error, avatar: error },
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, avatar: file }));
      /* create preview */
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormState((prev) => ({
          ...prev,
          avatarPreview: e.target.result,
          error: { ...prev.error, avatat: "" },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const error = {
      name: !formData.name ? "Enter full name" : "",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      role: !formData.role ? "Please select a role" : "",
      avatar: "",
    };
    /* remove empty error */
    Object.keys(error).forEach((key) => {
      if (!error[key]) delete error[key];
    });
    setFormState((prev) => ({ ...prev, error }));
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormState((prev) => ({ ...prev, loading: true }));
    try {
      let avatarUrl = "";
      if (formData.avatar) {
        const imgUploadRes = await uploadImage(formData.avatar);
        avatarUrl = imgUploadRes.imageUrl || "";/* imageUrl */
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        avatar: avatarUrl || "",
      });
      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        error: {},
      }));

      const { token } = response.data;
      if (token) {
        login(response.data, token);
        setTimeout(() => {
          window.location.href =
            formData.role === "employeer"
              ? "/employeer/employeer-dashboard"
              : "/find-jobs";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: {
          submit:
            error.response?.data?.message ||
            "Registration failed. Please try again.",
        },
      }));
    }
  };

  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-200 p-8 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Account Created!
          </h2>
          <p className=" text-gray-600 mb-4">
            Welcome to JobPortal! Your account has been successfully created.
          </p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to your dashboard...
          </p>
        </motion.div>
      </div>
    );
  }
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full "
      >
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm">
            Join Thousands of professionals finding thier dream jobs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name <span className="text-red-500 text-md ">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                vlaue={formData.name}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.error.name ? "border-red-500 " : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors `}
                placeholder="Enter full name"
              />
            </div>
            {formState.error.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center ">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.error.name}
              </p>
            )}
          </div>

          {/* email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address <span className="text-red-500 text-md ">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.error.email ? "border-red-500 " : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors `}
                placeholder="Enter Email"
              />
            </div>
            {formState.error.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center  ">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.error.email}
              </p>
            )}
          </div>

          {/* password */}
          <div className="">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password <span className="text-red-500 text-md ">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                  formState.error.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus-border-transparent transition-colors `}
                placeholder="Create a strong Password"
              />
              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {formState.showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formState.error.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.error.password}
              </p>
            )}
          </div>

          {/* avatar */}
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Profile Picture (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-500  mx-auto mt-3.5  " />
                )}
              </div>
              <div className="flex-1">
                {" "}
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-color flex items-center space-x-2 "
                >
                  <Upload className="w-4 h-4 " />
                  <span>Upload Photo</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG upto 5 MB</p>
              </div>
            </div>
            {formState.error.avatar && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.error.avatar}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray700 mb-3"
            >
              I am a *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  formData.role == "jobseeker"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200  hover:border-gray-300"
                } `}
              >
                <UserCheck className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Job Seeker</div>
                <div className="text-xs text-gray-500">
                  Looking for opportunities
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("employeer")}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  formData.role == "employeer"
                    ? "border-purple-500 bg-purple-100 text-purple-700"
                    : "border-gray-200  hover:border-gray-300"
                } `}
              >
                <Building2 className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Employeer</div>
                <div className="text-xs text-gray-500">Hiring new talent</div>
              </button>
            </div>
            {formState.error.role && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.error.role}
              </p>
            )}
          </div>

          {/* submit error */}
          {formState.error.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {formState.error.submit}
              </p>
            </div>
          )}

          {/* submit button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 to-hover:purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
          >
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account? {""}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Signup;
