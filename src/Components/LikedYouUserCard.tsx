import { motion, useMotionValue, useTransform } from "framer-motion";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import { Chip } from "@mui/material";

const LikedYouUserCard = ({ val }: { val: any }) => {
  const {
    name,
    age,
    bio,
    profilePhoto,
    location,
    currentRole,
    experience,
    socialLinks,
    techStack,
    interests,
    lookingForTitle,
    lookingForDesc,
    availability,
    projects,
  } = val;
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    if (x.get() > 50) {
      console.log("swipe right");
    } else if (x.get() < -50) {
      console.log("swipe left");
    } else {
      console.log("back to center");
    }
  };

  return (
    <motion.div
      className="LikedYouCard"
      drag="x"
      onDragEnd={handleDragEnd}
      style={{
        x,
        opacity,
        rotate,
        border: "2px solid black",
      }}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
    >
      <img
        src={profilePhoto}
        alt="user photo"
        draggable="false"
        className="w-full h-[550px] object-cover"
        style={{
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      <div className="absolute bottom-0 left-0 right-0 p-0">
        <div className="backdrop-blur-md bg-white/10 p-2 border border-white/10">
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            {age && (
              <span className="text-xl font-medium text-white/90">{age}</span>
            )}
          </div>
          {location && (
            <div className="flex items-center gap-1 text-white/80">
              <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
              <span className="text-sm">{location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 px-5 py-6 space-y-5">
        <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
          My Bio
        </h3>
        {/* Bio */}
        {bio && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-purple-100 shadow-sm">
            <p className="text-sm text-gray-700 leading-relaxed">{bio}</p>
          </div>
        )}

        <h3 className="font-bold text-gray-900 text-sm mb-2 flex  gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
          About Me
        </h3>
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2 flex-wrap">
            <div className="CardTag CardTag1">⚡ Available {availability}</div>
            <div className="CardTag CardTag2">
              🤝 Looking for {lookingForTitle}
            </div>
            <div className="CardTag CardTag3">
              ⭐ {experience} Years Experience
            </div>
          </div>

          {/* Looking For Description */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-xl p-4 shadow-sm">
            {lookingForDesc && (
              <p className="text-xs text-gray-700 leading-relaxed">
                {lookingForDesc}
              </p>
            )}
          </div>
        </div>

        {/* Tech Stack - Glassmorphism Pills */}
        {techStack && techStack.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-white/60 backdrop-blur-sm text-purple-700 text-xs font-semibold rounded-lg border border-purple-200 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests - Gradient Cards */}
        {interests && interests.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold rounded-lg shadow-md"
                >
                  {interest}
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
                            <LanguageIcon sx={{ fontSize: 16 }} />
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

        {/* Social Links - Premium Buttons */}
        {socialLinks &&
          (socialLinks.github ||
            socialLinks.linkedin ||
            socialLinks.portfolio) && (
            <div className="pt-4 border-t border-purple-200">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
                CONNECT
              </h3>
              <div className="flex gap-3 justify-center">
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
                    <LanguageIcon sx={{ fontSize: 22 }} />
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
