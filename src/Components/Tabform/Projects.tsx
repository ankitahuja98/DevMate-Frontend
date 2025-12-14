import React, { useState } from "react";
import { IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { userDataProps } from "../../types/userData";

const Projects = ({ userData, setUserData }: userDataProps) => {
  const [techInputs, setTechInputs] = useState<{ [key: number]: string }>({});

  const handleAddProject = () => {
    const newProject = {
      title: "",
      description: "",
      techUsed: [],
      role: "",
      githubUrl: "",
      liveUrl: "",
    };
    setUserData({
      ...userData,
      projects: [...userData.projects, newProject],
    });
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = userData.projects.filter((_, i) => i !== index);
    setUserData({
      ...userData,
      projects: updatedProjects,
    });
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...userData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    setUserData({
      ...userData,
      projects: updatedProjects,
    });
  };

  const handleAddTech = (
    projectIndex: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && techInputs[projectIndex]?.trim()) {
      e.preventDefault();
      const tech = techInputs[projectIndex].trim();
      const updatedProjects = [...userData.projects];

      if (!updatedProjects[projectIndex].techUsed.includes(tech)) {
        updatedProjects[projectIndex].techUsed = [
          ...updatedProjects[projectIndex].techUsed,
          tech,
        ];
        setUserData({
          ...userData,
          projects: updatedProjects,
        });
      }

      setTechInputs({ ...techInputs, [projectIndex]: "" });
    }
  };

  const handleRemoveTech = (projectIndex: number, techToRemove: string) => {
    const updatedProjects = [...userData.projects];
    updatedProjects[projectIndex].techUsed = updatedProjects[
      projectIndex
    ].techUsed.filter((tech) => tech !== techToRemove);
    setUserData({
      ...userData,
      projects: updatedProjects,
    });
  };

  const handleTechInputChange = (projectIndex: number, value: string) => {
    setTechInputs({ ...techInputs, [projectIndex]: value });
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-xl">🚀</span> Featured Projects
        </h3>
        {/* <span className="text-xs text-gray-500 font-medium">(Optional)</span> */}
      </div>

      {/* Project Cards */}
      {userData.projects.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            No projects added yet. Click the button below to add your first
            project!
          </p>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-indigo-600 hover:to-purple-700 transition-all"
            onClick={handleAddProject}
          >
            <AddIcon sx={{ fontSize: 18 }} />
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userData.projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-all"
            >
              {/* Project Header */}
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-indigo-600">
                  Project #{index + 1}
                </h4>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveProject(index)}
                  sx={{
                    color: "#ef4444",
                    "&:hover": { backgroundColor: "#fee2e2" },
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </div>

              {/* Project Fields */}
              <div className="space-y-3">
                {/* Title and Role Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Project Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={project.title}
                      onChange={(e) =>
                        handleProjectChange(index, "title", e.target.value)
                      }
                      placeholder="AI Content Generator"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Role</label>
                    <input
                      type="text"
                      className="form-input"
                      value={project.role}
                      onChange={(e) =>
                        handleProjectChange(index, "role", e.target.value)
                      }
                      placeholder="Full-stack Developer"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input resize-none"
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(index, "description", e.target.value)
                    }
                    placeholder="Brief description of the project, its purpose, and your contributions..."
                    rows={2}
                  />
                </div>

                {/* Tech Used */}
                <div className="form-group">
                  <label className="form-label">Technologies Used</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Type and press Enter..."
                    value={techInputs[index] || ""}
                    onChange={(e) =>
                      handleTechInputChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleAddTech(index, e)}
                  />

                  {/* Display Added Technologies */}
                  <div className="flex flex-wrap gap-1.5 mt-2 min-h-[40px] p-2 border-2 border-dashed border-gray-200 rounded-lg bg-white">
                    {project.techUsed.length === 0 ? (
                      <p className="text-gray-400 text-xs">
                        No technologies added
                      </p>
                    ) : (
                      project.techUsed.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          onDelete={() => handleRemoveTech(index, tech)}
                          size="small"
                          sx={{
                            backgroundColor: "#e0e7ff",
                            color: "#4f46e5",
                            fontWeight: 600,
                            height: "24px",
                            fontSize: "12px",
                            "& .MuiChip-deleteIcon": {
                              fontSize: "16px",
                            },
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* URLs Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">GitHub URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={project.githubUrl}
                      onChange={(e) =>
                        handleProjectChange(index, "githubUrl", e.target.value)
                      }
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Live URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={project.liveUrl}
                      onChange={(e) =>
                        handleProjectChange(index, "liveUrl", e.target.value)
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Another Project Button */}
          {userData.projects.length < 5 && (
            <button
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-indigo-600 font-semibold text-sm hover:border-indigo-400 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
              onClick={handleAddProject}
            >
              <AddIcon sx={{ fontSize: 18 }} />
              Add Another Project
            </button>
          )}

          {userData.projects.length >= 5 && (
            <p className="text-xs text-gray-500 text-center">
              Maximum 5 projects can be added
            </p>
          )}
        </div>
      )}
      {/* Info Box */}
      <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-md">
        <p className="text-sm text-purple-800">
          <strong>💡 Tip:</strong> Showcase 1-3 of your best projects to stand
          out! Include projects that demonstrate your skills and passion.
        </p>
      </div>
    </div>
  );
};

export default Projects;
