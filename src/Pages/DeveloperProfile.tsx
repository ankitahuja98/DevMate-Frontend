import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckIcon from "@mui/icons-material/Check";
import BoltIcon from "@mui/icons-material/Bolt";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import TooltipWrapper from "../utils/TooltipWrapper";
import {
  sendConnectionReq,
  reviewConnectionReq,
} from "../redux/actions/connectionAction";
import type { userData } from "../types/userData";
import SEO from "../Components/SEO";
import {
  experienceLabel,
  availabilityLabel,
  isRecentlyActive,
} from "../utils/developerCardHelpers";
import "../CSS/DeveloperProfile.css";

type TabKey = "about" | "skills" | "projects" | "interests";

const tabs: { key: TabKey; label: string; icon: typeof CodeIcon }[] = [
  { key: "about", label: "About", icon: AutoAwesomeOutlinedIcon },
  { key: "skills", label: "Skills", icon: CodeIcon },
  { key: "projects", label: "Projects", icon: FolderOpenOutlinedIcon },
  { key: "interests", label: "Interests", icon: FavoriteBorderIcon },
];

// Cycled per project card — purely decorative, not tied to any real category
const projectIconColors = ["#8B5CF6", "#22C55E", "#F97316", "#2E78C7"];

const DeveloperProfile = () => {
  const { userId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user: userData | undefined = state?.user;
  // Present when this profile was opened from Liked You — that request
  // already exists in the other direction, so "Connect" here means accept
  // it (reviewConnectionReq), not send a brand new one (sendConnectionReq).
  const incomingRequestId: string | undefined = state?.requestId;

  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const isPremium = useAppSelector(
    (store) => store.profile.userProfile.userProfileData?.isPremium ?? false,
  );

  // Arrived here directly (refresh / shared link) with no data passed along
  // — same limitation Chat.tsx already has. Send them back rather than show
  // a broken page.
  if (!user) {
    return (
      <div className="DevProfileNotFound">
        <p>We couldn't load this profile.</p>
        <button
          type="button"
          className="DevCardBtn DevCardBtn--solid"
          onClick={() => navigate("/explore")}
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const {
    name,
    age,
    bio,
    profilePhoto,
    location,
    currentRole,
    experience,
    lookingForTitle,
    lookingForDesc,
    availability,
    techStack,
    interests,
    projects,
    socialLinks,
    isVerified,
    lastSeen,
  } = user;

  const handleConnect = () => {
    if (isConnected || isConnecting) return;
    setIsConnecting(true);

    const action = incomingRequestId
      ? reviewConnectionReq({ status: "accepted", requestId: incomingRequestId })
      : sendConnectionReq({ status: "interested", toUserId: user._id });

    dispatch(action)
      .unwrap()
      .then(() => {
        setIsConnected(true);
        toast.success(
          incomingRequestId
            ? `You're now connected with ${name}!`
            : `Connection request sent to ${name}`,
        );
      })
      .catch((err: any) => {
        toast.error(err?.message || "Something went wrong");
      })
      .finally(() => setIsConnecting(false));
  };

  const handleMessage = () => {
    if (!isPremium) return;
    navigate(`/chat/${user._id}`, { state: { targetUserDetails: user } });
  };

  return (
    <div className="DevProfilePage">
      <SEO
        title={`${name} - Devmate`}
        description={bio || `${name}'s developer profile on Devmate.`}
        canonical={`https://devmate.co.in/developer/${userId}`}
      />

      <button
        type="button"
        className="DevProfileBack"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon sx={{ fontSize: 18 }} /> Back
      </button>

      <div className="DevProfileLayout">
        <div className="DevProfileMain">
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <div className="DevProfileHero">
            <div className="DevProfileHeroTop">
              <div className="DevProfileAvatarWrap">
                <img src={profilePhoto} alt={name} className="DevProfileAvatar" />
                {isRecentlyActive(lastSeen) && (
                  <span className="DevProfileOnlineDot" />
                )}
              </div>

              <div className="DevProfileIdentity">
                <div className="flex items-center gap-2">
                  <h1>{name}</h1>
                  {isVerified && (
                    <VerifiedIcon sx={{ fontSize: 20, color: "#6D3DF5" }} />
                  )}
                  {age ? <span className="DevProfileAge">{age}</span> : null}
                </div>
                {currentRole && (
                  <p className="DevProfileRole">{currentRole}</p>
                )}
                {location && (
                  <div className="DevProfileLocation">
                    <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
                    {location}
                  </div>
                )}
                {bio && <p className="DevProfileBio">{bio}</p>}

                <div className="DevProfileTags">
                  {isRecentlyActive(lastSeen) && (
                    <span className="CardTag CardTag2">Open to Work</span>
                  )}
                  {lookingForTitle && (
                    <span className="CardTag CardTag1">
                      Open to {lookingForTitle}
                    </span>
                  )}
                  {availability && (
                    <span className="CardTag CardTag3">
                      Available {availabilityLabel[availability] || availability}
                    </span>
                  )}
                </div>
              </div>

              <div className="DevProfileActions">
                <button
                  type="button"
                  className="DevCardBtn DevCardBtn--solid"
                  disabled={isConnecting || isConnected}
                  onClick={handleConnect}
                >
                  {isConnected ? (
                    <>
                      {incomingRequestId ? (
                        <CheckIcon sx={{ fontSize: 16 }} />
                      ) : (
                        <HourglassTopIcon sx={{ fontSize: 16 }} />
                      )}{" "}
                      {incomingRequestId ? "Connected" : "Requested"}
                    </>
                  ) : (
                    <>
                      <PersonAddAlt1Icon sx={{ fontSize: 16 }} /> Connect
                    </>
                  )}
                </button>
                <TooltipWrapper
                  title={isPremium ? "" : "Upgrade to Premium to message"}
                  arrow
                >
                  <button
                    type="button"
                    className="DevCardBtn DevCardBtn--ghost"
                    disabled={!isPremium}
                    onClick={handleMessage}
                  >
                    <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} /> Message
                  </button>
                </TooltipWrapper>
              </div>
            </div>
          </div>

          {/* ── Stats row — only real fields ─────────────────────────────── */}
          <div className="DevProfileStats">
            <div>
              <WorkOutlineIcon sx={{ fontSize: 18, color: "#6B7691" }} />
              <div>
                <span className="DevProfileStatLabel">Experience</span>
                <span className="DevProfileStatValue">
                  {experienceLabel(experience)}
                </span>
              </div>
            </div>
            <div>
              <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: "#6B7691" }} />
              <div>
                <span className="DevProfileStatLabel">Availability</span>
                <span className="DevProfileStatValue">
                  {availability ? availabilityLabel[availability] || availability : "—"}
                </span>
              </div>
            </div>
            <div>
              <Diversity2OutlinedIcon sx={{ fontSize: 18, color: "#6B7691" }} />
              <div>
                <span className="DevProfileStatLabel">Looking For</span>
                <span className="DevProfileStatValue">
                  {lookingForTitle || "—"}
                </span>
              </div>
            </div>
            <div>
              <CodeIcon sx={{ fontSize: 18, color: "#6B7691" }} />
              <div>
                <span className="DevProfileStatLabel">Skills</span>
                <span className="DevProfileStatValue">
                  {techStack?.length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* ── Tabs ─────────────────────────────────────────────────────── */}
          <div className="DevProfileTabsNav">
            {tabs.map((t) => {
              const TabIcon = t.icon;
              return (
                <button
                  key={t.key}
                  type="button"
                  className={`DevProfileTabBtn ${activeTab === t.key ? "active" : ""}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  <TabIcon sx={{ fontSize: 17 }} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {activeTab === "about" && (
            <div className="DevProfileAboutGrid">
              <div
                className="DevProfileCard card-enter"
                style={{ "--card-index": 0 } as React.CSSProperties}
              >
                <h3>About Me</h3>
                {bio ? (
                  <p className="DevProfileParagraph">{bio}</p>
                ) : (
                  <p className="DevProfileEmpty">No bio added yet.</p>
                )}
                {lookingForDesc && (
                  <div className="card-highlight mt-3">
                    <p className="text-sm text-gray-700">{lookingForDesc}</p>
                  </div>
                )}

                <div className="mt-1">
                  <div className="DevProfileMetaRow">
                    <WorkOutlineIcon sx={{ fontSize: 16 }} />
                    Experience: <strong>{experienceLabel(experience)}</strong>
                  </div>
                  {availability && (
                    <div className="DevProfileMetaRow">
                      <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />
                      Availability:{" "}
                      <strong>
                        {availabilityLabel[availability] || availability}
                      </strong>
                    </div>
                  )}
                </div>

                {(socialLinks?.github ||
                  socialLinks?.linkedin ||
                  socialLinks?.portfolio) && (
                  <div className="DevProfileSocials">
                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="DevProfileSocialIcon"
                        style={{ background: "#111827" }}
                      >
                        <GitHubIcon sx={{ fontSize: 18 }} />
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="DevProfileSocialIcon"
                        style={{ background: "#2563eb" }}
                      >
                        <LinkedInIcon sx={{ fontSize: 18 }} />
                      </a>
                    )}
                    {socialLinks.portfolio && (
                      <a
                        href={socialLinks.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="DevProfileSocialIcon"
                        style={{ background: "#6D3DF5" }}
                      >
                        <WorkIcon sx={{ fontSize: 18 }} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div
                className="DevProfileCard card-enter"
                style={{ "--card-index": 1 } as React.CSSProperties}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="mb-0!">Featured Projects</h3>
                  {projects?.length > 1 && (
                    <button
                      type="button"
                      className="DevProfileViewAll"
                      onClick={() => setActiveTab("projects")}
                    >
                      View all
                    </button>
                  )}
                </div>
                {projects?.length > 0 ? (
                  <div className="space-y-3">
                    {projects.slice(0, 3).map((project: any, i: number) => (
                      <ProjectRow key={project._id || i} project={project} index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="DevProfileEmpty">No projects added yet.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div
              className="DevProfileCard card-enter"
              style={{ "--card-index": 0 } as React.CSSProperties}
            >
              <h3>All Skills</h3>
              {techStack?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {techStack.map((t, i) => (
                    <span key={i} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="DevProfileEmpty">No skills added yet.</p>
              )}
            </div>
          )}

          {activeTab === "projects" && (
            <div
              className="DevProfileCard card-enter"
              style={{ "--card-index": 0 } as React.CSSProperties}
            >
              <h3>Projects</h3>
              {projects?.length > 0 ? (
                <div className="space-y-3">
                  {projects.map((project: any, i: number) => (
                    <ProjectRow key={project._id || i} project={project} index={i} />
                  ))}
                </div>
              ) : (
                <p className="DevProfileEmpty">No projects added yet.</p>
              )}
            </div>
          )}

          {activeTab === "interests" && (
            <div
              className="DevProfileCard card-enter"
              style={{ "--card-index": 0 } as React.CSSProperties}
            >
              <h3>Interests</h3>
              {interests?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {interests.map((item, i) => (
                    <span key={i} className="interest-pill">
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="DevProfileEmpty">No interests added yet.</p>
              )}
            </div>
          )}
        </div>

        {/* ── Right column ───────────────────────────────────────────────── */}
        <aside className="DevProfileSide">
          {techStack?.length > 0 && (
            <div
              className="DevProfileCard card-enter"
              style={{ "--card-index": 0 } as React.CSSProperties}
            >
              <h3>Top Skills</h3>
              <div className="DevProfileSkillsGrid">
                {techStack.slice(0, 6).map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>
              {techStack.length > 6 && (
                <button
                  type="button"
                  className="DevProfileViewAllBtn"
                  onClick={() => setActiveTab("skills")}
                >
                  View all skills
                </button>
              )}
            </div>
          )}

          <div
            className="DevProfileCard card-enter"
            style={{ "--card-index": 1 } as React.CSSProperties}
          >
            <h3>Connect with {name.split(" ")[0]}</h3>
            {lookingForTitle && (
              <div className="DevProfilePrefRow">
                <span className="DevProfilePrefIcon">
                  <Diversity2OutlinedIcon sx={{ fontSize: 17 }} />
                </span>
                <span>Looking for {lookingForTitle}</span>
                <span className="DevProfileCheck">
                  <CheckIcon sx={{ fontSize: 14 }} />
                </span>
              </div>
            )}
            {availability && (
              <div className="DevProfilePrefRow">
                <span className="DevProfilePrefIcon">
                  <AccessTimeOutlinedIcon sx={{ fontSize: 17 }} />
                </span>
                <span>
                  Available {availabilityLabel[availability] || availability}
                </span>
                <span className="DevProfileCheck">
                  <CheckIcon sx={{ fontSize: 14 }} />
                </span>
              </div>
            )}
            {isVerified && (
              <div className="DevProfilePrefRow">
                <span className="DevProfilePrefIcon">
                  <VerifiedIcon sx={{ fontSize: 17 }} />
                </span>
                <span>Verified account</span>
                <span className="DevProfileCheck">
                  <CheckIcon sx={{ fontSize: 14 }} />
                </span>
              </div>
            )}
            {!lookingForTitle && !availability && !isVerified && (
              <p className="DevProfileEmpty">
                No preferences shared yet.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

const ProjectRow = ({
  project,
  index = 0,
}: {
  project: any;
  index?: number;
}) => (
  <div
    className="DevProfileProject card-enter"
    style={{ "--card-index": index } as React.CSSProperties}
  >
    <div
      className="DevProfileProjectIcon"
      style={{
        background: projectIconColors[index % projectIconColors.length],
      }}
    >
      <BoltIcon sx={{ fontSize: 20 }} />
    </div>
    <div className="flex-1 min-w-0">
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
                className="DevProfileProjectLink"
              >
                <GitHubIcon sx={{ fontSize: 16 }} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="DevProfileProjectLink"
              >
                <OpenInNewIcon sx={{ fontSize: 16 }} />
              </a>
            )}
          </div>
        )}
      </div>
      {project.description && (
        <p className="text-xs text-gray-600 leading-relaxed mb-2">
          {project.description}
        </p>
      )}
      {project.techUsed?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.techUsed.map((tech: string, i: number) => (
            <span key={i} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default DeveloperProfile;
