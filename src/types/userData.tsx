export interface Project {
  // Mongoose subdocuments get one automatically; present in practice even
  // though older code paths didn't type it.
  _id?: string;
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
  // Already returned by the /feed API, just not previously typed here.
  lastSeen?: string | null;
  isVerified?: boolean;
  // Mongoose `timestamps: true` puts this on every user document already —
  // just not previously typed here. Used for "Member since" on the profile.
  createdAt?: string;
}

export interface userDataProps {
  userData: userData;
  errors: any;
  setUserData: React.Dispatch<React.SetStateAction<userData>>;
}
