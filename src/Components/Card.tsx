import { motion, useMotionValue, useTransform } from "framer-motion";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import type { AppDispatch } from "../redux/store/store";
import { useDispatch } from "react-redux";
import { sendConnectionReq } from "../redux/actions/connectionAction";
import { toast } from "react-toastify";

const Card = ({ val, filterUserData }: { val: any; filterUserData: any }) => {
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

  const dispatch = useDispatch<AppDispatch>();

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    if (x.get() > 50) {
      dispatch(sendConnectionReq({ status: "interested", toUserId: _id }))
        .unwrap()
        .then(() => {
          filterUserData(_id);
          toast.success(`You liked ${name}`);
        });
    } else if (x.get() < -50) {
      dispatch(sendConnectionReq({ status: "ignored", toUserId: _id }))
        .unwrap()
        .then(() => {
          filterUserData(_id);
          toast.warning(`You passed ${name}`);
        });
    }
  };

  return (
    <motion.div
      className="ExploreCard"
      drag="x"
      onDragEnd={handleDragEnd}
      style={{ x, opacity, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
    >
      <div className="CardImageWrapper">
        <img
          src={profilePhoto}
          alt={name}
          className="cardProfilePic"
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-lg p-2">
            <div className="flex items-baseline gap-2">
              <h2 className="text-lg sm:text-2xl font-bold text-white truncate">
                {name}
              </h2>
              {age && (
                <span className="text-sm sm:text-xl text-white/90">{age}</span>
              )}
            </div>

            {location && (
              <div className="flex items-center gap-1 text-white/80">
                <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />
                <span className="text-xs sm:text-sm truncate">{location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= DETAILS SECTION ================= */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 px-4 pt-5 pb-15 space-y-5">
        {/* BIO */}
        {bio && (
          <div>
            <h3 className="section-title">My Bio</h3>
            <div className="card-box">
              <p className="text-sm text-gray-700 leading-relaxed">{bio}</p>
            </div>
          </div>
        )}

        {/* ABOUT */}
        <div>
          <h3 className="section-title">About Me</h3>
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
              <p className="text-xs text-gray-700">{lookingForDesc}</p>
            </div>
          )}
        </div>

        {/* TECH STACK */}
        {techStack?.length > 0 && (
          <div>
            <h3 className="section-title">Tech Stack</h3>
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
            <h3 className="section-title">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((item: string, i: number) => (
                <span key={i} className="interest-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* SOCIAL */}
        {socialLinks && (
          <div className="pt-4 border-t">
            <h3 className="section-title">Connect</h3>
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

export default Card;
