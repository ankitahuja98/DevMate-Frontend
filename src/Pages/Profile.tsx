import "../CSS/Profile.css";
import { useAppSelector } from "../redux/store/store";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import Dummyuser from "../Images/Dummyuser.png";

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
    experience,
    lookingForTitle,
    lookingForDesc,
    availability,
    techStack,
    projects,
    socialLinks,
  } = userprofile;

  const { github, linkedin, portfolio } = socialLinks;

  const handleSocialLinks = (name: string) => {
    if (name === "github") {
      window.open(github, "_blank", "noopener,noreferrer");
    } else if (name === "linkedin") {
      window.open(linkedin, "_blank", "noopener,noreferrer");
    } else if (name === "portfolio") {
      window.open(portfolio, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div className="profileContainer">
      <div className="leftSection">
        <img
          className="userImage"
          src={profilePhoto || Dummyuser}
          alt="user profile"
        />
        <p className="text-2xl font-bold mt-4">
          {name}, {age}
        </p>
        <p className="text-md font-semibold ">{tagline}</p>
        <p className="text-md mt-3">📍 {location}</p>
        {/* TechStack  */}
        <div className="mt-5 w-full overflow-hidden">
          <p className="text-md font-semibold ">💻 Tech Stack</p>
          <div className="flex gap-3 flex-wrap mt-2">
            {techStack.length !== 0 &&
              techStack.map((val: string) => {
                return <div className="techstackItem">{val}</div>;
              })}
          </div>
        </div>

        {/* Social Links  */}
        <div className="social-links">
          <div
            className="social-icon"
            onClick={() => handleSocialLinks("github")}
          >
            <GitHubIcon />
          </div>
          <div
            className="social-icon"
            onClick={() => handleSocialLinks("linkedin")}
          >
            <LinkedInIcon />
          </div>
          <div
            className="social-icon"
            onClick={() => handleSocialLinks("portfolio")}
          >
            <WorkIcon />
          </div>
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
          <p className="SectionTitle">👋 About Me</p>
          <p className="text-md mt-2 text-white">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
