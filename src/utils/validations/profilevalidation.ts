import type { userData } from "../../types/userData";

export type ValidationErrors = {
  [key: string]: any;
};

export const validateBasicInfo = (userData: userData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!userData.name || userData.name.trim().split(" ").length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!userData.age) {
    errors.age = "Age is required";
  }

  if (!userData.location) {
    errors.location = "Location is required";
  }

  if (!userData.profilePhoto || userData.profilePhoto.trim() === "") {
    errors.profilePhoto = "Profile photo is required";
  }

  if (!userData.tagline || userData.tagline.trim().split(" ").length < 5) {
    errors.tagline = "Tagline must be at least 5 characters";
  }

  if (!userData.bio || userData.bio.trim().split(" ").length < 10) {
    errors.bio = "Bio must be at least 10 characters";
  }

  if (!userData.currentRole) {
    errors.currentRole = "Current Role is required";
  }

  if (!userData.experience) {
    errors.experience = "Experience is required";
  }

  return errors;
};

export const validateSkills = (userData: userData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!Array.isArray(userData.techStack) || userData.techStack.length === 0) {
    errors.techStack = "Select at least one technology";
  }

  if (!Array.isArray(userData.interests) || userData.interests.length === 0) {
    errors.interests = "Select at least one interest";
  }

  return errors;
};

export const validateGoals = (userData: userData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!userData.lookingForTitle) {
    errors.lookingForTitle = "Looking For is required";
  }

  if (
    !userData.lookingForDesc ||
    userData.lookingForDesc.trim().split(" ").length < 10
  ) {
    errors.lookingForDesc = "This field must be at least 10 characters";
  }

  if (!userData.availability) {
    errors.availability = "Availability is required";
  }

  return errors;
};

export const validateProjects = (userData: userData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!Array.isArray(userData.projects)) return errors;

  const projectsErrors: ValidationErrors[] = [];

  userData.projects.forEach((project, index) => {
    const projectError: ValidationErrors = {};

    if (!project.title || project.title.trim() === "") {
      projectError.title = "Project title is required";
    }

    if (!project.role || project.role.trim() === "") {
      projectError.role = "Project role is required";
    }

    if (
      !project.description ||
      project.description.trim().split(" ").length <= 10
    ) {
      projectError.description =
        "Project description must be at least 10 characters";
    }

    if (Object.keys(projectError).length > 0) {
      projectsErrors[index] = projectError;
    }
  });

  if (projectsErrors.length > 0) {
    errors.projects = projectsErrors;
  }

  return errors;
};

export const validateStep = (
  step: number,
  userData: userData
): ValidationErrors => {
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

export const validateAll = (userData: userData): ValidationErrors => {
  return {
    ...validateBasicInfo(userData),
    ...validateSkills(userData),
    ...validateGoals(userData),
    ...validateProjects(userData),
  };
};
