import { motion, useMotionValue, useTransform } from "framer-motion";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MessageIcon from "@mui/icons-material/Message";
import { useState } from "react";
import { reviewConnectionReq } from "../redux/actions/connectionAction";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LikedYouUserCard = ({
  val,
  filterRequestData,
  requestId,
  isMatched,
}: {
  val: any;
  filterRequestData?: any;
  requestId?: string;
  isMatched?: boolean;
}) => {
  const {
    _id,
    name,
    age,
    bio,
    profilePhoto,
    location,
    experience,
    socialLinks,
    techStack,
    interests,
    lookingForTitle,
    lookingForDesc,
    availability,
    projects,
  } = val;

  const [activeCard, setActiveCard] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    if (x.get() > 50) {
      dispatch(
        reviewConnectionReq({ status: "accepted", requestId: `${requestId}` })
      )
        .unwrap()
        .then(() => {
          filterRequestData?.(requestId);
          toast.success(`You accepted ${name}`);
        });
    } else if (x.get() < -50) {
      dispatch(
        reviewConnectionReq({ status: "rejected", requestId: `${requestId}` })
      )
        .unwrap()
        .then(() => {
          filterRequestData?.(requestId);
          toast.warning(`You rejected ${name}`);
        });
    }
  };

  const handleOpenChat = () => {
    navigate("/chat");
  };

  return (
    <motion.div
      className={`LikedYouCard ${
        activeCard === _id ? "active border-2 border-gray-400" : ""
      }`}
      onClick={() => setActiveCard(activeCard === _id ? null : _id)}
      drag="x"
      onDragEnd={handleDragEnd}
      style={{ x, opacity, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
    >
      {/* ================= IMAGE SECTION ================= */}
      <div className="LikedCardImageWrapper">
        <img
          src={profilePhoto}
          alt={name}
          draggable={false}
          className="cardProfilePic"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <div className="flex justify-between backdrop-blur-md bg-white/10 border border-white/10 rounded-lg p-2">
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg sm:text-2xl font-bold text-white truncate">
                  {name}
                </h2>
                {age && (
                  <span className="text-sm sm:text-xl text-white/90">
                    {age}
                  </span>
                )}
              </div>

              {location && (
                <div className="flex items-center gap-1 text-white/80">
                  <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />
                  <span className="text-xs sm:text-sm truncate">
                    {location}
                  </span>
                </div>
              )}
            </div>
            {isMatched && (
              <div className="flex items-center justify-center">
                <div className="chatIcon" onClick={handleOpenChat}>
                  <MessageIcon sx={{ fontSize: "20px" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 px-4 py-5 space-y-5">
        {/* BIO */}
        {bio && (
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
              My Bio
            </h3>
            <div className="card-box">
              <p className="text-sm text-gray-700 leading-relaxed">{bio}</p>
            </div>
          </div>
        )}

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

        {/* PROJECTS */}
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

        {/* SOCIAL */}
        {socialLinks && (
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
              Social Links
            </h3>
            <div className="flex justify-center gap-4">
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
        )}
      </div>
    </motion.div>
  );
};

export default LikedYouUserCard;
