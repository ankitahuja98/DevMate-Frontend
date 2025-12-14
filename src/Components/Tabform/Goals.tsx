import type { userDataProps } from "../../types/userData";

const Goals = ({ userData, setUserData }: userDataProps) => {
  const handleChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const lookingForOptions = [
    {
      value: "cofounder",
      label: "Co-founder",
    },
    {
      value: "collaborator",
      label: "Collaborator",
    },
    {
      value: "mentor",
      label: "Mentor",
    },
    {
      value: "team-member",
      label: "Team Member",
    },
    {
      value: "freelance-partner",
      label: "Freelance Partner",
    },
  ];

  const availabilityOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "weekends", label: "Weekends Only" },
    { value: "flexible", label: "Flexible" },
  ];

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <span className="text-xl">🎯</span> Goals & Availability
      </h3>

      {/* Looking For and Availability Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="form-label">
            Looking For <span className="text-red-500">*</span>
          </label>
          <select
            className="form-input"
            value={userData.lookingForTitle}
            onChange={(e) => handleChange("lookingForTitle", e.target.value)}
            required
          >
            <option value="">Select type of collaboration</option>
            {lookingForOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            Availability <span className="text-red-500">*</span>
          </label>
          <select
            className="form-input"
            value={userData.availability}
            onChange={(e) => handleChange("availability", e.target.value)}
            required
          >
            <option value="">Select availability</option>
            {availabilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description Textarea */}
      <div className="form-group">
        <label className="form-label">
          What are you looking for? <span className="text-red-500">*</span>
        </label>
        <textarea
          className="form-input resize-none"
          value={userData.lookingForDesc}
          onChange={(e) => handleChange("lookingForDesc", e.target.value)}
          placeholder="Describe what you're looking for in a partner or collaborator. Be specific about your goals, project ideas, or what kind of team you want to build..."
          maxLength={500}
          required
        />
        <p className="text-xs text-gray-500 text-right mt-1">
          {userData.lookingForDesc.length} / 500
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md">
        <p className="text-sm text-yellow-800">
          <strong>💡 Tip:</strong> Be specific about what you're looking for!
          Mention your project ideas, preferred tech stack, and what you can
          bring to the collaboration.
        </p>
      </div>
    </div>
  );
};

export default Goals;
