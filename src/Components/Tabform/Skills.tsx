import React, { useState } from "react";
import type { userDataProps } from "../../types/userData";
import { Chip } from "@mui/material";

const Skills = ({ userData, setUserData, errors }: userDataProps) => {
  const [techInput, setTechInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  // Suggested tech stack
  const suggestedTech = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Next.js",
    "Vue.js",
    "Angular",
    "GraphQL",
    "Redis",
  ];

  // Suggested interests
  const suggestedInterests = [
    "AI/ML",
    "Web3",
    "Mobile Development",
    "Game Development",
    "DevOps",
    "Cybersecurity",
    "Data Science",
    "IoT",
    "AR/VR",
    "Open Source",
  ];

  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      if (!userData.techStack.includes(techInput.trim())) {
        setUserData({
          ...userData,
          techStack: [...userData.techStack, techInput.trim()],
        });
      }
      setTechInput("");
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setUserData({
      ...userData,
      techStack: userData.techStack.filter((val) => val != techToRemove),
    });
  };

  const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && interestInput.trim()) {
      e.preventDefault();
      if (!userData.interests.includes(interestInput.trim()))
        setUserData({
          ...userData,
          interests: [...userData.interests, interestInput.trim()],
        });
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setUserData({
      ...userData,
      interests: userData.interests.filter((val) => val != interestToRemove),
    });
  };

  const handleSuggestedTechClick = (tech: string) => {
    if (!userData.techStack.includes(tech)) {
      setUserData({
        ...userData,
        techStack: [...userData.techStack, tech],
      });
    }
  };

  const handleSuggestedInterestClick = (interest: string) => {
    if (!userData.interests.includes(interest)) {
      setUserData({
        ...userData,
        interests: [...userData.interests, interest],
      });
    }
  };

  // Helper component for error display
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <p style={{ fontSize: "11px", color: "red" }}>{error}</p>;
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <span className="text-xl">💻</span> Tech Stack & Skills
      </h3>

      {/* Tech Stack Section */}
      <div>
        <label className="form-label">
          <span className="text-base">Tech Stack</span>
          <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          className="form-input"
          placeholder="Type a technology and press Enter..."
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={handleAddTech}
        />
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to add. Click suggestions below to add quickly.
        </p>

        {/* Display Added Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-3 min-h-[60px] p-3 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
          {userData.techStack.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No technologies added yet. Start typing above!
            </p>
          ) : (
            userData.techStack.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                onDelete={() => handleRemoveTech(tech)}
                size="small"
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  fontWeight: 600,
                  height: "28px",
                  "& .MuiChip-deleteIcon": {
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "18px",
                    "&:hover": {
                      color: "white",
                    },
                  },
                }}
              />
            ))
          )}
        </div>
        <ErrorMessage error={errors.techStack} />

        {/* Suggested Tech Stack */}
        <div className="mt-3">
          <p className="text-xs text-gray-600 font-semibold mb-2">
            💡 Popular technologies:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedTech
              .filter((tech) => !userData.techStack.includes(tech))
              .map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  onClick={() => handleSuggestedTechClick(tech)}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "#d1d5db",
                    height: "28px",
                    fontSize: "13px",
                    "&:hover": {
                      backgroundColor: "#f3f4f6",
                      borderColor: "#6366f1",
                      cursor: "pointer",
                    },
                  }}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Interests Section */}
      <div className="pt-2">
        <label className="form-label">
          <span className="text-base">Interests & Focus Areas</span>
          <span className="text-red-500">*</span>
          <span className="interesthelpertxt">
            What areas of tech excite you? (e.g., AI/ML, Web3, Mobile
            Development)
          </span>
        </label>

        <input
          type="text"
          className="form-input"
          placeholder="Type an interest and press Enter..."
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          onKeyDown={handleAddInterest}
        />
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to add. Click suggestions below to add quickly.
        </p>

        {/* Display Added Interests */}
        <div className="flex flex-wrap gap-2 mt-3 min-h-[60px] p-3 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
          {userData.interests.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No interests added yet. Start typing above!
            </p>
          ) : (
            userData.interests.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                onDelete={() => handleRemoveInterest(interest)}
                size="small"
                sx={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  fontWeight: 600,
                  height: "28px",
                  "& .MuiChip-deleteIcon": {
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "18px",
                    "&:hover": {
                      color: "white",
                    },
                  },
                }}
              />
            ))
          )}
        </div>
        <ErrorMessage error={errors.interests} />

        {/* Suggested Interests */}
        <div className="mt-3">
          <p className="text-xs text-gray-600 font-semibold mb-2">
            💡 Popular interests:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedInterests
              .filter((interest) => !userData.interests.includes(interest))
              .map((interest, index) => (
                <Chip
                  key={index}
                  label={interest}
                  onClick={() => handleSuggestedInterestClick(interest)}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "#d1d5db",
                    height: "28px",
                    fontSize: "13px",
                    "&:hover": {
                      backgroundColor: "#f3f4f6",
                      borderColor: "#10b981",
                      cursor: "pointer",
                    },
                  }}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md mt-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Add at least 3 technologies and 3 interests
          to help us match you with the right developers!
        </p>
      </div>
    </div>
  );
};

export default Skills;
