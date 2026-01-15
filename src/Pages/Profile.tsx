import "../CSS/Profile.css";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import Dummyuser from "../Images/Dummyuser.avif";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { setEditProfileDialogOpen } from "../redux/slices/profileSlice";

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

  const dispatch = useDispatch<AppDispatch>();

  const handleEditProfile = () => {
    dispatch(setEditProfileDialogOpen(true));
  };

  return (
    <div className="profileContainer">
      <div className="leftSection">
        <div className="flex flex-row md:flex-col items-center">
          <div className="profileImageWrapper">
            <img
              className="userImage"
              src={profilePhoto || Dummyuser}
              alt="user profile"
            />
            <div className="EditProfile" onClick={handleEditProfile}>
              <EditIcon
                sx={{
                  fontSize: {
                    xs: 18, // <600px
                    sm: 20, // ≥600px
                    md: 22, // ≥900px
                  },
                }}
              />
            </div>
          </div>
          <div className="pl-3 md:p-0 flex md:items-center flex-col">
            <p className="text-2xl font-bold md:mt-4">
              {name}, {age}
            </p>
            <p className="text-md"> {location}</p>
            <p className="text-sm italic md:mt-1">{currentRole}</p>
          </div>
        </div>
        <p className="text-md font-semibold mt-5">{tagline}</p>
        {/* BIO */}
        {bio && (
          <div className="mt-3 ">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
              My Bio
            </h3>
            <div className="card-box">
              <p className="text-sm text-gray-700 leading-relaxed">{bio}</p>
            </div>
          </div>
        )}

        {/* Social Links  */}
        <div className="mt-3 w-full overflow-hidden">
          {/* <h3 className="font-semibold text-md mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
            Social Links
          </h3> */}
          <div className="flex gap-3 flex-wrap mt-3 justify-center">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:scale-110 transition-transform shadow-lg"
              >
                <GitHubIcon sx={{ fontSize: 22 }} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:scale-110 transition-transform shadow-lg"
              >
                <LinkedInIcon sx={{ fontSize: 22 }} />
              </a>
            )}
            {socialLinks.portfolio && (
              <a
                href={socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:scale-110 transition-transform shadow-lg"
              >
                <WorkIcon sx={{ fontSize: 22 }} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="RightSection space-y-7">
        {/* ABOUT */}
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
            About Me
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="CardTag CardTag1">
              ⚡ Available {availability}
            </span>
            <span className="CardTag CardTag3">
              ⭐ {experience} yrs experience
            </span>
            <span className="CardTag CardTag2">
              🤝 Looking for {lookingForTitle}
            </span>
          </div>

          {lookingForDesc && (
            <div className="card-highlight mt-3">
              <p className="text-sm text-gray-700">{lookingForDesc}</p>
            </div>
          )}
        </div>

        {/* TECH STACK */}
        {techStack?.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech: string, i: number) => (
                <span key={i} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* INTERESTS */}
        {interests?.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((item: string, i: number) => (
                <span key={i} className="interest-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects - Premium Cards */}
        {projects && projects.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
              Featured Projects
            </h3>
            <div className="space-y-3">
              {projects.map((project: any, index: number) => (
                <div
                  key={project._id || index}
                  className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm hover:border-purple-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-900 mb-1">
                        {project.title || project.name}
                      </h4>
                      {project.role && (
                        <p className="text-xs text-gray-600 italic mb-2">
                          {project.role}
                        </p>
                      )}
                    </div>
                    {(project.githubUrl || project.liveUrl) && (
                      <div className="flex gap-2 ml-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
                          >
                            <GitHubIcon sx={{ fontSize: 16 }} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
                          >
                            <OpenInNewIcon sx={{ fontSize: 16 }} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  {project.techUsed && project.techUsed.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.techUsed.map(
                        (tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-100 font-medium"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
