import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Building2, Edit3, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";
import EditProfileDetails from "./EditProfileDetails";

const EmployeerProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    companyName: user?.companyName || "",
    companyDescription: user?.companyDescription || "",
    companyLogo: user?.companyLogo || "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, logo: false });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (file, type) => {
    try {
      setUploading((prev) => ({ ...prev, [type]: true }));
      const imageUploadRes = await uploadImage(file);
      const avatarUrl = imageUploadRes.imageUrl || "";
      /* update form data with new image url */
      const field = type === "avatar" ? "avatar" : "companyLogo";
      handleInputChange(field, avatarUrl);
    } catch (error) {
      console.error("Image upload failed: ", error);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      /* create preview url */
      const previewUrl = URL.createObjectURL(file);
      const field = type === "avatar" ? "avatar" : "companyLogo";
      /* upload image */

      /* handleInputChange(file, type); */

      handleInputChange(field, previewUrl); // for preview
      handleImageUpload(file, type); // upload and update with real URL
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success("Profile details updated successfully!");
        /* update profile data and exit edit mode */
        setProfileData({ ...formData });
        const updatedData = { ...formData, email: user.email };
        updateUser(updatedData);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Profile updataion failed: ", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setEditMode(false);
  };

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
        companyName: user.companyName || "",
        companyDescription: user.companyDescription || "",
        companyLogo: user.companyLogo || "",
      });
    }
  }, [user]);

  useEffect(() => {
    setFormData({ ...profileData });
  }, [profileData]);

  if (editMode) {
    return (
      <EditProfileDetails
        formData={formData}
        handleImageChange={handleImageChange}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        saving={saving}
        uploading={uploading}
        setProfileData={setProfileData}
      />
    );
  }

  return (
    <DashboardLayout activeMenu={"company-profile"}>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 flex justify-between items-center">
              <h1 className="text-xl font-medium text-white">
                Employeer Profile{" "}
              </h1>
              <button
                onClick={() => setEditMode(true)}
                className="bg-white/10 hover:opacity-30 text-white px-4 py-2 rounded-lg transition-colors  flex items-center space-x-2 "
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* profile content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* personal information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Personal Information
                  </h2>

                  {/* avatar and name */}
                  <div className="flex items-center space-x-4">
                    
                    {profileData?.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-50"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Avatar</span>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.name}{" "}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="w-4 h-4 m-2" />
                        <span>{profileData.email} </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* company information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Company Information
                  </h2>

                  {/* companyLogo and name */}
                  <div className="flex items-center space-x-4">
                    {/* <img
                      src={profileData.companyLogo}
                      alt="Company Logo"
                      className="w-20 h-20  rounded-full object-cover border-4 border-blue-50"
                    /> */}
                    {profileData?.companyLogo ? (
                      <img
                        src={profileData.companyLogo}
                        alt="companyLogo"
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-50"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Logo</span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.companyName}{" "}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Building2 className="w-4 h-4 m-2" />
                        <span>Company</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* company description */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">
                  About Company
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg ">
                  {profileData.companyDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeerProfilePage;
