export const validateBasicInfo = (userData) => {
  const errors = {};

  if (!userData.name || userData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!userData.age || userData.age < 13 || userData.age > 100) {
    errors.age = "Age must be between 13 and 100";
  }

  if (!userData.profilePhoto || userData.profilePhoto.trim() === "") {
    errors.profilePhoto = "Profile photo is required";
  }

  if (!userData.tagline || userData.tagline.trim().length < 5) {
    errors.tagline = "Tagline must be at least 5 characters";
  }

  if (userData.bio && userData.bio.length > 300) {
    errors.bio = "Bio must be under 300 characters";
  }

  if (userData.experience !== null && userData.experience < 0) {
    errors.experience = "Experience cannot be negative";
  }

  return errors;
};

export const validateSkills = (userData) => {
  const errors = {};

  if (!Array.isArray(userData.techStack) || userData.techStack.length === 0) {
    errors.techStack = "Select at least one technology";
  }

  if (!Array.isArray(userData.interests) || userData.interests.length === 0) {
    errors.interests = "Select at least one interest";
  }

  return errors;
};

export const validateGoals = (userData) => {
  const errors = {};

  if (!userData.lookingForTitle || userData.lookingForTitle.trim().length < 3) {
    errors.lookingForTitle = "Title must be at least 3 characters";
  }

  if (userData.lookingForDesc && userData.lookingForDesc.length > 500) {
    errors.lookingForDesc = "Description must be under 500 characters";
  }

  if (!userData.availability || userData.availability.trim() === "") {
    errors.availability = "Availability is required";
  }

  return errors;
};

export const validateProjects = (userData) => {
  const errors = {};

  if (!Array.isArray(userData.projects)) return errors;
  const projectsErrors = [];
  userData.projects.forEach((project, ind) => {
    const projectError = {};

    if (!project.title || project.title.trim() === "") {
      projectError.title = "Project title is required";
    }
    if (!project.description || project.description.trim() === "") {
      projectError.description = "Project description is required";
    }

    if (Object.keys(projectError).length > 0) {
      projectsErrors[ind] = projectError;
    }
  });

  if (projectsErrors.length > 0) {
    errors.projects = projectsErrors;
  }
  return errors;
};

export const validateStep = (step, userData) => {
  switch (step) {
    case 0:
      return validateBasicInfo(userData);
    case 1:
      return validateSkills(userData);
    case 2:
      return validateGoals(userData);
    case 3:
      return validateProjects(userData);
    default:
      return {};
  }
};

export const validateAll = (userData) => {
  return {
    ...validateBasicInfo(userData),
    ...validateSkills(userData),
    ...validateGoals(userData),
    ...validateProjects(userData),
  };
};
