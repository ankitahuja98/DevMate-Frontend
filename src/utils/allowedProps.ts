import type { userData } from "../types/userData";

export const allowedProps: (keyof userData)[] = [
  "name",
  "age",
  "profilePhoto",
  "tagline",
  "bio",
  "location",
  "currentRole",
  "experience",
  "lookingForTitle",
  "lookingForDesc",
  "interests",
  "availability",
  "techStack",
  "projects",
  "socialLinks",
];
