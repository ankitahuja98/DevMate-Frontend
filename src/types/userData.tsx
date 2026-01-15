interface Project {
  title: string;
  description: string;
  techUsed: string[];
  role: string;
  githubUrl: string;
  liveUrl: string; // empty string allowed
}

interface SocialLinks {
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface userData {
  _id: string;
  name: string;
  age: number | null;
  profilePhoto: string;
  tagline: string;
  bio: string;
  location: string;
  interests: string[];
  currentRole: string;
  experience: number | null;
  lookingForTitle: string;
  lookingForDesc: string;
  availability: string;
  techStack: string[];
  projects: Project[];
  socialLinks: SocialLinks;
  isNewUser: boolean;
  isUserProfileCompleted: boolean | null;
}

export interface userDataProps {
  userData: userData;
  errors: any;
  setUserData: React.Dispatch<React.SetStateAction<userData>>;
}
