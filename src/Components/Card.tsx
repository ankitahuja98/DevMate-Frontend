import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatIcon from "@mui/icons-material/Chat";
import { IconButton } from "@mui/material";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { useDispatch } from "react-redux";
import { sendConnectionReq } from "../redux/actions/connectionAction";
import { reviewConnectionReq } from "../redux/actions/connectionAction";
import { removeUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import TooltipWrapper from "../utils/TooltipWrapper";

// ─── Types ────────────────────────────────────────────────────────────────────

type CardMode = "explore" | "likedYou";

interface CardProps {
  val: any;
  mode?: CardMode;
  // explore-mode props
  zIndex?: number;
  isVisible?: boolean;
  // likedYou-mode props
  requestId?: string;
  filterRequestData?: (id: string) => void;
  isMatched?: boolean;
  // When true (used inside bottom sheet): always scrollable, no click-to-activate
  sheetMode?: boolean;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

const Card = ({
  val,
  mode = "explore",
  zIndex,
  isVisible,
  requestId,
  filterRequestData,
  isMatched,
  sheetMode = false,
}: CardProps) => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [showDislikeAnimation, setShowDislikeAnimation] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  // Distinguish a real tap from a drag-release
  const wasDragged = useRef(false);

  const isPremium = useAppSelector(
    (store) => store.profile.userProfile.userProfileData?.isPremium ?? false,
  );

  const x = useMotionValue(0);
  const opacity = useTransform(
    x,
    [-200, -40, 0, 40, 200],
    mode === "explore"
      ? isDragging
        ? [0, 1, 1, 1, 0]
        : [1, 1, 1, 1, 1]
      : [0, 1, 1, 1, 0],
  );
  const rotate = useTransform(x, [-150, 0, 150], [-18, 0, 18]);

  // ── Dismiss helpers ────────────────────────────────────────────────────────

  const dismissExplore = (id: string) =>
    setTimeout(() => dispatch(removeUser(id)), 500);

  const dismissLikedYou = (id: string) =>
    setTimeout(() => filterRequestData?.(id), 500);

  // ── Drag handlers ──────────────────────────────────────────────────────────

  const handleDragStart = () => {
    setIsDragging(true);
    wasDragged.current = true;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (mode === "explore") {
      if (x.get() > 15) {
        setShowLikeAnimation(true);
        dispatch(sendConnectionReq({ status: "interested", toUserId: _id }))
          .unwrap()
          .then(() => dismissExplore(_id));
      } else if (x.get() < -15) {
        setShowDislikeAnimation(true);
        dispatch(sendConnectionReq({ status: "ignored", toUserId: _id }))
          .unwrap()
          .then(() => dismissExplore(_id));
      }
    } else {
      if (x.get() > 50) {
        dispatch(
          reviewConnectionReq({
            status: "accepted",
            requestId: `${requestId}`,
          }),
        )
          .unwrap()
          .then(() => dismissLikedYou(requestId!));
      } else if (x.get() < -50) {
        dispatch(
          reviewConnectionReq({
            status: "rejected",
            requestId: `${requestId}`,
          }),
        )
          .unwrap()
          .then(() => dismissLikedYou(requestId!));
      }
    }
  };

  // ── Button handlers ────────────────────────────────────────────────────────

  const handleLike = () => {
    setShowLikeAnimation(true);
    if (mode === "explore") {
      dispatch(sendConnectionReq({ status: "interested", toUserId: _id }))
        .unwrap()
        .then(() => dismissExplore(_id));
    } else {
      dispatch(
        reviewConnectionReq({ status: "accepted", requestId: `${requestId}` }),
      )
        .unwrap()
        .then(() => dismissLikedYou(requestId!));
    }
  };

  const handleDislike = () => {
    setShowDislikeAnimation(true);
    if (mode === "explore") {
      dispatch(sendConnectionReq({ status: "ignored", toUserId: _id }))
        .unwrap()
        .then(() => dismissExplore(_id));
    } else {
      dispatch(
        reviewConnectionReq({ status: "rejected", requestId: `${requestId}` }),
      )
        .unwrap()
        .then(() => dismissLikedYou(requestId!));
    }
  };

  const handleDirectChat = (targetUserDetails: any) => {
    navigate(`/chat/${targetUserDetails._id}`, {
      state: { targetUserDetails },
    });
  };

  // ── Shared: animation overlays ─────────────────────────────────────────────

  const likeOverlay = showLikeAnimation && (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 1.3] }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => setShowLikeAnimation(false)}
    >
      <div className="bg-green-500 rounded-full p-8 shadow-2xl">
        <ThumbUpAltIcon sx={{ fontSize: 80, color: "white" }} />
      </div>
    </motion.div>
  );

  const dislikeOverlay = showDislikeAnimation && (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 1.3],
        rotate: [0, -10, 10, 0],
      }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => setShowDislikeAnimation(false)}
    >
      <div className="bg-red-500 rounded-full p-8 shadow-2xl">
        <ThumbDownAltIcon sx={{ fontSize: 80, color: "white" }} />
      </div>
    </motion.div>
  );

  // ── Shared: profile details section ───────────────────────────────────────

  const detailsContent = (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 px-4 pt-5 pb-20 space-y-5">
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

      <div>
        <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
          About Me
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="CardTag CardTag1">⚡ Available {availability}</span>
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
                    {project.techUsed.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-100 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(socialLinks?.github ||
        socialLinks?.linkedin ||
        socialLinks?.portfolio) && (
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
  );

  // ═══════════════════════════════════════════════════════════════════════════
  //  EXPLORE MODE — stacked cards, always-scrollable inner, half-circle btns
  // ═══════════════════════════════════════════════════════════════════════════
  if (mode === "explore") {
    return (
      <motion.div
        className="ExploreCardOuter"
        drag="x"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          x,
          opacity,
          rotate,
          zIndex: zIndex ?? 0,
          visibility: isVisible === false ? "hidden" : "visible",
        }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
      >
        {likeOverlay}
        {dislikeOverlay}

        <div className="ExploreCardInner">
          <div className="CardImageWrapper">
            <div className="CardImagePlaceholder" />
            <img
              src={profilePhoto}
              alt={name}
              className="cardProfilePic"
              draggable={false}
              style={
                {
                  userSelect: "none",
                  WebkitUserSelect: "none",
                } as React.CSSProperties
              }
            />

            <button
              className="CardActionBtn CardActionBtn--dislike"
              onClick={handleDislike}
              onPointerDown={(e) => e.stopPropagation()}
              style={{ touchAction: "manipulation" }}
              aria-label="Dislike"
            >
              <ThumbDownAltIcon sx={{ fontSize: 28, color: "white" }} />
            </button>

            <button
              className="CardActionBtn CardActionBtn--like"
              onClick={handleLike}
              onPointerDown={(e) => e.stopPropagation()}
              style={{ touchAction: "manipulation" }}
              aria-label="Like"
            >
              <ThumbUpAltIcon sx={{ fontSize: 28, color: "white" }} />
            </button>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
              <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-lg p-2 flex items-center gap-3">
                <div className="flex-1 min-w-0">
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
                {isPremium && (
                  <button
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full shadow-lg active:scale-95 cursor-pointer"
                    aria-label="Chat"
                    onClick={() => handleDirectChat(val)}
                    style={{ touchAction: "manipulation" }}
                  >
                    <ChatIcon sx={{ fontSize: "25px", color: "white" }} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {detailsContent}
        </div>
      </motion.div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  LIKED-YOU MODE — grid cards, click to scroll within fixed height
  //
  //  Same two-div pattern as explore:
  //  ┌─ LikedYouCard (outer, fixed height, overflow:hidden) ──────────────┐
  //  │  ┌─ LikedYouCardInner (scrollable when .scrollable) ─────────────┐ │
  //  │  │  LikedCardImageWrapper                                          │ │
  //  │  │    ├─ img                                                       │ │
  //  │  │    ├─ CardActionBtn--dislike  (always visible, scrolls w/ img) │ │
  //  │  │    └─ CardActionBtn--like     (always visible, scrolls w/ img) │ │
  //  │  │  detailsContent                                                 │ │
  //  │  └─────────────────────────────────────────────────────────────── ┘ │
  //  └────────────────────────────────────────────────────────────────────┘
  // ═══════════════════════════════════════════════════════════════════════════
  const isChatEnabled = isPremium;
  const tooltipTitle = isPremium ? "Start Chat" : "Upgrade to Premium to chat";

  return (
    <motion.div
      className={`LikedYouCard ${sheetMode ? "LikedYouCard--sheet" : ""}`}
      drag={sheetMode ? false : "x"}
      onDragStart={sheetMode ? undefined : handleDragStart}
      onDragEnd={sheetMode ? undefined : handleDragEnd}
      style={sheetMode ? {} : { x, opacity, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
    >
      {likeOverlay}
      {dislikeOverlay}

      {/* ── Inner: always scrollable in sheetMode ──────────────────────────── */}
      <div className={`LikedYouCardInner ${sheetMode ? "scrollable" : ""}`}>
        {/* ── Image section ─────────────────────────────────────────────────── */}
        <div className="LikedCardImageWrapper">
          <img
            src={profilePhoto}
            alt={name}
            draggable={false}
            className="cardProfilePic"
          />

          {/* Same half-circle buttons as explore — always visible, travel with image on scroll */}
          {!isMatched && (
            <>
              <button
                className="CardActionBtn CardActionBtn--dislike"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDislike();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                style={{ touchAction: "manipulation" }}
                aria-label="Dislike"
              >
                <ThumbDownAltIcon sx={{ fontSize: 28, color: "white" }} />
              </button>

              <button
                className="CardActionBtn CardActionBtn--like"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                style={{ touchAction: "manipulation" }}
                aria-label="Like"
              >
                <ThumbUpAltIcon sx={{ fontSize: 28, color: "white" }} />
              </button>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
            <div className="flex justify-between backdrop-blur-md bg-white/10 border border-white/10 rounded-lg p-2">
              <div className="flex-1 min-w-0">
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

              {(isPremium || isMatched) && (
                <TooltipWrapper title={tooltipTitle} arrow>
                  <IconButton
                    className="icon-button"
                    aria-label="Chat"
                    disabled={!isChatEnabled}
                    onClick={(e) => {
                      e.stopPropagation();
                      isChatEnabled && handleDirectChat(val);
                    }}
                  >
                    <ChatIcon sx={{ fontSize: "25px", color: "white" }} />
                  </IconButton>
                </TooltipWrapper>
              )}
            </div>
          </div>
        </div>

        {/* ── Details ────────────────────────────────────────────────────────── */}
        {detailsContent}
      </div>
    </motion.div>
  );
};

export default Card;
