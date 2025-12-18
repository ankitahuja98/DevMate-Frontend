import React from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import type { userDataProps } from "../../types/userData";
import { Avatar, IconButton } from "@mui/material";

const BasicInfo = ({ userData, setUserData, errors }: userDataProps) => {
  const handleChange = (name: string, value: any) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setUserData({
      ...userData,
      socialLinks: {
        ...userData.socialLinks,
        [platform]: value,
      },
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper component for error display
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <p style={{ fontSize: "11px", color: "red" }}>{error}</p>;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-0">
        <span className="text-xl">ℹ️</span> Basic Information
      </h3>

      {/* Profile Photo Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <Avatar
            src={userData.profilePhoto || ""}
            sx={{
              width: 130,
              height: 130,
              border: "3px solid #e5e7eb",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              marginTop: "5px",
            }}
          />
          <input
            accept="image/*"
            id="profile-photo-upload"
            type="file"
            hidden
            onChange={handlePhotoUpload}
          />
          <label htmlFor="profile-photo-upload">
            <IconButton
              component="span"
              size="small"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#6366f1",
                color: "white",
                width: 32,
                height: 32,
                "&:hover": {
                  backgroundColor: "#4f46e5",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s",
              }}
            >
              <PhotoCameraIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </label>
        </div>
      </div>
      <div className="flex justify-center">
        <ErrorMessage error={errors.profilePhoto} />
      </div>

      {/* form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="form-label">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={userData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Full Name"
            required
          />
          <ErrorMessage error={errors.name} />
        </div>

        <div className="form-group">
          <label className="form-label">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="form-input"
            value={userData.age || ""}
            onChange={(e) =>
              handleChange("age", parseInt(e.target.value) || null)
            }
            placeholder="25"
            required
          />
          <ErrorMessage error={errors.age} />
        </div>

        <div className="form-group">
          <label className="form-label">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={userData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="New Delhi, IN"
            required
          />
          <ErrorMessage error={errors.location} />
        </div>
      </div>

      {/* Current Role and Experience Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="form-label">
            Professional Tagline <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={userData.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
            placeholder="Full-stack Developer | React & Node.js Enthusiast"
            maxLength={100}
            required
          />
          <ErrorMessage error={errors.tagline} />
        </div>

        <div className="form-group">
          <label className="form-label">
            Current Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={userData.currentRole}
            onChange={(e) => handleChange("currentRole", e.target.value)}
            placeholder="Full-stack Developer"
            required
          />
          <ErrorMessage error={errors.currentRole} />
        </div>

        <div className="form-group">
          <label className="form-label">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <select
            className="form-input"
            value={userData.experience || ""}
            onChange={(e) =>
              handleChange("experience", parseInt(e.target.value) || null)
            }
            required
          >
            <option value="">Select experience</option>
            <option value="1">Less than 1 year</option>
            <option value="2">1-2 years</option>
            <option value="3">3-5 years</option>
            <option value="6">6-10 years</option>
            <option value="10">10+ years</option>
          </select>
          <ErrorMessage error={errors.experience} />
        </div>
      </div>

      {/* Bio */}
      <div className="form-group">
        <label className="form-label">
          About You <span className="text-red-500">*</span>
        </label>
        <textarea
          className="form-input resize-none"
          value={userData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Tell us about yourself, your passion for development, and what drives you..."
          maxLength={500}
          rows={1}
          required
        />
        <div className="flex justify-between">
          <ErrorMessage error={errors.bio} />
          <p className="text-xs text-gray-500 text-right">
            {userData.bio.length} / 500
          </p>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="pt-4 border-t border-gray-200 mt-4">
        <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">🔗</span> Social Links
        </h3>

        <div className="space-y-3">
          <div className="form-group">
            <label className="form-label">GitHub Profile</label>
            <input
              type="url"
              className="form-input"
              value={userData.socialLinks.github}
              onChange={(e) => handleSocialLinkChange("github", e.target.value)}
              placeholder="https://github.com/yourusername"
            />
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn Profile</label>
            <input
              type="url"
              className="form-input"
              value={userData.socialLinks.linkedin}
              onChange={(e) =>
                handleSocialLinkChange("linkedin", e.target.value)
              }
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Portfolio Website</label>
            <input
              type="url"
              className="form-input"
              value={userData.socialLinks.portfolio}
              onChange={(e) =>
                handleSocialLinkChange("portfolio", e.target.value)
              }
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md mt-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Complete all required fields to increase your
          chances of finding the perfect dev partner!
        </p>
      </div>
    </div>
  );
};

export default BasicInfo;
