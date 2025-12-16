import "../CSS/Profile.css";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import Dummyuser from "../Images/Dummyuser.png";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { setEditProfileDialogOpen } from "../redux/slices/profileSlice";

interface Projects {
  title: string;
  description: string;
  techUsed: string[];
  role: string;
  githubUrl: string;
  liveUrl: string;
}

const Profile = () => {
  const userprofile = useAppSelector(
    (store) => store.profile.userProfile.userProfileData
  );
  const {
    name,
    age,
    profilePhoto,
    tagline,
    bio,
    location,
    currentRole,
    interests,
    experience,
    lookingForTitle,
    lookingForDesc,
    availability,
    techStack,
    projects,
    socialLinks,
  } = userprofile;

  const { github, linkedin, portfolio } = socialLinks;
  const dispatch = useDispatch<AppDispatch>();

  const handleSocialLinks = (name: string) => {
    if (name === "github") {
      window.open(github, "_blank", "noopener,noreferrer");
    } else if (name === "linkedin") {
      window.open(linkedin, "_blank", "noopener,noreferrer");
    } else if (name === "portfolio") {
      window.open(portfolio, "_blank", "noopener,noreferrer");
    }
  };

  const handleProjectLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleEditProfile = () => {
    dispatch(setEditProfileDialogOpen(true));
  };

  return (
    <div className="profileContainer">
      <div className="leftSection">
        <div className="profileImageWrapper">
          <img
            className="userImage"
            src={profilePhoto || Dummyuser}
            alt="user profile"
          />
          <div className="EditProfile" onClick={handleEditProfile}>
            <EditIcon />
          </div>
        </div>

        <p className="text-2xl font-bold mt-4">
          {name}, {age}
        </p>
        <p className="text-sm italic">{currentRole}</p>
        <p className="text-md font-semibold mt-5">{tagline}</p>
        <p className="text-md mt-3">📍 {location}</p>
        {/* TechStack  */}
        <div className="mt-5 w-full overflow-hidden">
          <p className="text-md font-semibold ">Tech Stack</p>
          <div className="flex gap-3 flex-wrap mt-2">
            {techStack.length !== 0 &&
              techStack.map((val: string) => {
                return <div className="techstackItem">{val}</div>;
              })}
          </div>
        </div>

        {/* Social Links  */}
        <div className="social-links">
          {socialLinks.github && (
            <div
              className="social-icon"
              onClick={() => handleSocialLinks("github")}
            >
              <GitHubIcon />
            </div>
          )}

          {socialLinks.linkedin && (
            <div
              className="social-icon"
              onClick={() => handleSocialLinks("linkedin")}
            >
              <LinkedInIcon />
            </div>
          )}

          {socialLinks.portfolio && (
            <div
              className="social-icon"
              onClick={() => handleSocialLinks("portfolio")}
            >
              <WorkIcon />
            </div>
          )}
        </div>
      </div>
      <div className="RightSection">
        {/* Profile Tags */}
        <div className="flex gap-5">
          <div className="userTag userTag1">⚡ Available {availability}</div>
          <div className="userTag userTag2">
            🤝 Looking for {lookingForTitle}
          </div>
          <div className="userTag userTag3">
            ⭐ {experience} Years Experience
          </div>
        </div>
        <div className="looking-for">
          <div className="looking-for-title">🎯 Currently Looking For</div>
          <div className="looking-for-text">{lookingForDesc}</div>
        </div>
        <div className="ProfileSection">
          <p className="SectionTitle">About Me</p>
          <p className="userBio">{bio}</p>
        </div>
        <div className="ProfileSection">
          <p className="SectionTitle">Interests</p>
          <div className="interestsContent">
            {interests.length !== 0 &&
              interests.map((val: String, id: any) => {
                return (
                  <div key={id} className="interest-card ">
                    {val}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="ProfileSection">
          <p className="SectionTitle">Featured Projects</p>
          <div className="projects-grid">
            {projects.length !== 0 &&
              projects.map((val: Projects) => {
                const {
                  title,
                  description,
                  techUsed,
                  role,
                  githubUrl,
                  liveUrl,
                } = val;
                return (
                  <div className="project-card">
                    <div className="project-header">
                      <div>
                        <div className="project-title">{title}</div>
                        <div className="project-role">{role}</div>
                      </div>

                      <div className="project-links">
                        {githubUrl && (
                          <div
                            className="project-link"
                            onClick={() => handleProjectLink(githubUrl)}
                          >
                            <GitHubIcon />
                          </div>
                        )}
                        {liveUrl && (
                          <div
                            className="project-link"
                            onClick={() => handleProjectLink(liveUrl)}
                          >
                            <OpenInNewIcon />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="project-desc">{description}</div>
                    <div className="project-tech">
                      {techUsed.length !== 0 &&
                        techUsed.map((val: string) => {
                          return (
                            <span className="project-tech-tag">{val}</span>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
