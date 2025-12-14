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
}

export interface userDataProps {
  userData: userData;
  setUserData: React.Dispatch<React.SetStateAction<userData>>;
}
