import "../CSS/Profile.css";
import { useEffect, useState } from "react";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import Dummyuser from "../Images/Dummyuser.avif";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import CodeIcon from "@mui/icons-material/Code";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setEditProfileDialogOpen } from "../redux/slices/profileSlice";
import { getChatList } from "../redux/actions/chatAction";
import { toast } from "react-toastify";
import SEO from "../Components/SEO";
import TooltipWrapper from "../utils/TooltipWrapper";
import type { Project } from "../types/userData";
import {
  experienceLabel,
  availabilityLabel,
  memberSinceLabel,
} from "../utils/developerCardHelpers";

// Cycled per project — purely decorative, not tied to any real category.
const projectIconColors = ["#6D3DF5", "#22C55E", "#F97316", "#2E78C7"];

// Small, honest chip-decoration map for known interest labels — cosmetic
// only, never invents interests that aren't in the user's real data.
const interestEmoji: Record<string, string> = {
  startups: "🚀",
  ai: "🤖",
  "open source": "🌐",
  "developer tools": "🛠️",
  "tech communities": "👥",
  "web3": "⛓️",
  gaming: "🎮",
  design: "🎨",
  music: "🎵",
  writing: "✍️",
};

const Profile = () => {
  const userprofile = useAppSelector(
    (store) => store.profile.userProfile.userProfileData,
  );
  const connectionsCount = useAppSelector(
    (store) => store.chat.ChatList?.length || 0,
  );

  const dispatch = useDispatch<AppDispatch>();
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    dispatch(getChatList());
  }, [dispatch]);

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
    createdAt,
  } = userprofile;

  const handleEditProfile = () => {
    dispatch(setEditProfileDialogOpen(true));
  };

  const handleViewPublicProfile = () => {
    toast.info("Public profile preview is coming soon");
  };

  const availabilityText = availability
    ? availabilityLabel[availability] || availability
    : null;
  const memberSince = memberSinceLabel(createdAt);

  const featuredProject = projects?.[0];
  const restProjects = projects?.slice(1) || [];

  return (
    <>
      <SEO
        title="Your Profile - Devmate"
        description="Manage your Devmate profile and developer identity."
      />

      <div className="ProfilePage">
        <div className="ProfileGrid">
          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="ProfileLeftCol">
            {/* Hero card */}
            <div
              className="ProfileHeroCard card-enter"
              style={{ "--card-index": 0 } as React.CSSProperties}
            >
              <div className="ProfileHeroBanner" />
              <div className="ProfileHeroBody">
                <div className="ProfileAvatarWrap">
                  <img
                    className="ProfileAvatar"
                    src={profilePhoto || Dummyuser}
                    alt="user profile"
                  />
                  <span className="ProfileOnlineDot" />
                  <button
                    type="button"
                    className="ProfileAvatarEdit"
                    onClick={handleEditProfile}
                    aria-label="Edit profile"
                  >
                    <EditIcon sx={{ fontSize: 15 }} />
                  </button>
                </div>

                <h1 className="ProfileName">
                  {name}
                  {age ? <span className="ProfileAge">, {age}</span> : null}
                </h1>
                {currentRole && <p className="ProfileRole">{currentRole}</p>}
                {location && (
                  <div className="ProfileLocation">
                    <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />
                    {location}
                  </div>
                )}
                {tagline && (
                  <span className="ProfileBadge">
                    <WorkIcon sx={{ fontSize: 13 }} />
                    {tagline}
                  </span>
                )}

                <div className="ProfileHeroActions">
                  <button
                    type="button"
                    className="ProfileBtn ProfileBtn--solid"
                    onClick={handleEditProfile}
                  >
                    <EditIcon sx={{ fontSize: 15 }} /> Edit Profile
                  </button>
                  <TooltipWrapper title="Coming soon" arrow>
                    <button
                      type="button"
                      className="ProfileBtn ProfileBtn--ghost"
                      onClick={handleViewPublicProfile}
                    >
                      View Public Profile
                    </button>
                  </TooltipWrapper>
                </div>

                {(socialLinks?.github ||
                  socialLinks?.linkedin ||
                  socialLinks?.portfolio) && (
                  <div className="ProfileSocials">
                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ProfileSocialIcon"
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
                        className="ProfileSocialIcon"
                        style={{ background: "#0a66c2" }}
                      >
                        <LinkedInIcon sx={{ fontSize: 18 }} />
                      </a>
                    )}
                    {socialLinks.portfolio && (
                      <a
                        href={socialLinks.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ProfileSocialIcon"
                        style={{ background: "#6D3DF5" }}
                      >
                        <WorkIcon sx={{ fontSize: 18 }} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Profile overview */}
            <div
              className="ProfileCard card-enter"
              style={{ "--card-index": 1 } as React.CSSProperties}
            >
              <h3>Profile Overview</h3>
              <div className="ProfileStatsGrid">
                <div className="ProfileStat">
                  <span className="ProfileStatIcon">
                    <WorkOutlineIcon sx={{ fontSize: 17 }} />
                  </span>
                  <div>
                    <span className="ProfileStatValue">
                      {experienceLabel(experience)}
                    </span>
                    <span className="ProfileStatLabel">Experience</span>
                  </div>
                </div>
                <div className="ProfileStat">
                  <span className="ProfileStatIcon">
                    <FolderOpenOutlinedIcon sx={{ fontSize: 17 }} />
                  </span>
                  <div>
                    <span className="ProfileStatValue">
                      {projects?.length || 0}
                    </span>
                    <span className="ProfileStatLabel">Projects</span>
                  </div>
                </div>
                <div className="ProfileStat">
                  <span className="ProfileStatIcon">
                    <CodeIcon sx={{ fontSize: 17 }} />
                  </span>
                  <div>
                    <span className="ProfileStatValue">
                      {techStack?.length || 0}
                    </span>
                    <span className="ProfileStatLabel">Tech Skills</span>
                  </div>
                </div>
                <div className="ProfileStat">
                  <span className="ProfileStatIcon">
                    <Diversity2OutlinedIcon sx={{ fontSize: 17 }} />
                  </span>
                  <div>
                    <span className="ProfileStatValue">
                      {connectionsCount}
                    </span>
                    <span className="ProfileStatLabel">Connections</span>
                  </div>
                </div>
              </div>
              {memberSince && (
                <div className="ProfileMemberSince">
                  <CalendarTodayOutlinedIcon sx={{ fontSize: 15 }} />
                  Member since <strong>{memberSince}</strong>
                </div>
              )}
            </div>

            {/* Opportunity status */}
            <div
              className="ProfileCard card-enter"
              style={{ "--card-index": 2 } as React.CSSProperties}
            >
              <div className="ProfileOpportunityHeader">
                <span
                  className={`ProfileOpportunityDot ${
                    availabilityText ? "" : "ProfileOpportunityDot--off"
                  }`}
                />
                <p className="ProfileOpportunityTitle">
                  {availabilityText
                    ? "Open to opportunities"
                    : "Availability not set"}
                </p>
              </div>
              <p className="ProfileOpportunityDesc">
                {availabilityText
                  ? `Actively looking for ${
                      lookingForTitle || "new opportunities"
                    } and collaborations.`
                  : "Let other developers know when you're free to collaborate."}
              </p>
              <button
                type="button"
                className="ProfileBtn ProfileBtn--ghost ProfileOpportunityBtn"
                onClick={handleEditProfile}
              >
                Update Availability
              </button>
            </div>
          </div>

          {/* ── Right column ─────────────────────────────────────────────── */}
          <div className="ProfileRightCol">
            {/* About Me */}
            <div
              className="ProfileCard card-enter"
              style={{ "--card-index": 0 } as React.CSSProperties}
            >
              <div className="ProfileCardHeader">
                <h3>About Me</h3>
                <button
                  type="button"
                  className="ProfileCardEdit"
                  onClick={handleEditProfile}
                  aria-label="Edit about me"
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {availabilityText && (
                  <span className="CardTag CardTag1">
                    ⚡ Available {availabilityText}
                  </span>
                )}
                {experience != null && (
                  <span className="CardTag CardTag3">
                    ⭐ {experienceLabel(experience)} experience
                  </span>
                )}
                {lookingForTitle && (
                  <span className="CardTag CardTag2">
                    🤝 Looking for {lookingForTitle}
                  </span>
                )}
              </div>

              {bio && <p className="ProfileBio">{bio}</p>}

              {lookingForDesc && (
                <div className="card-highlight mt-3">
                  <p className="text-sm">{lookingForDesc}</p>
                </div>
              )}

              {!bio && !lookingForDesc && (
                <p className="ProfileEmpty">
                  Add a short bio so other developers know what you're about.
                </p>
              )}
            </div>

            {/* Tech Stack + Interests */}
            <div className="ProfileMidGrid">
              <div
                className="ProfileCard card-enter"
                style={{ "--card-index": 1 } as React.CSSProperties}
              >
                <h3>Tech Stack</h3>
                {techStack?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech: string, i: number) => (
                      <span key={i} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="ProfileEmpty">No tech stack added yet.</p>
                )}
              </div>

              <div
                className="ProfileCard card-enter"
                style={{ "--card-index": 1 } as React.CSSProperties}
              >
                <h3>Interests</h3>
                {interests?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {interests.map((item: string, i: number) => (
                      <span key={i} className="interest-pill">
                        {interestEmoji[item.trim().toLowerCase()] || "✨"}{" "}
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="ProfileEmpty">No interests added yet.</p>
                )}
              </div>
            </div>

            {/* Featured Projects */}
            <div
              className="ProfileCard card-enter"
              style={{ "--card-index": 2 } as React.CSSProperties}
            >
              <div className="ProfileCardHeader">
                <h3>Featured Projects</h3>
                {restProjects.length > 0 && (
                  <button
                    type="button"
                    className="ProfileViewAll"
                    onClick={() => setShowAllProjects((prev) => !prev)}
                  >
                    {showAllProjects ? "Show less" : "View All Projects"}{" "}
                    <ArrowForwardIcon sx={{ fontSize: 14 }} />
                  </button>
                )}
              </div>

              {featuredProject ? (
                <div className="space-y-3">
                  <ProjectCard
                    project={featuredProject}
                    index={0}
                    featured
                  />
                  {showAllProjects &&
                    restProjects.map((project: Project, i: number) => (
                      <ProjectCard
                        key={project._id || i}
                        project={project}
                        index={i + 1}
                      />
                    ))}
                </div>
              ) : (
                <div className="ProfileProjectsEmpty">
                  <p className="ProfileEmpty">
                    No projects added yet — showcase your work by adding one.
                  </p>
                  <button
                    type="button"
                    className="ProfileBtn ProfileBtn--ghost"
                    onClick={handleEditProfile}
                  >
                    <AddIcon sx={{ fontSize: 16 }} /> Add Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProjectCard = ({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) => (
  <div
    className={`ProfileProject card-enter ${featured ? "ProfileProject--featured" : ""}`}
    style={{ "--card-index": index } as React.CSSProperties}
  >
    <div
      className="ProfileProjectThumb"
      style={{ background: projectIconColors[index % projectIconColors.length] }}
    >
      <BoltIcon sx={{ fontSize: 22 }} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="ProfileProjectTitle">{project.title}</h4>
            {featured && <span className="ProfileFeaturedBadge">Featured</span>}
          </div>
          {project.role && (
            <p className="ProfileProjectRole">{project.role}</p>
          )}
        </div>
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ProfileProjectLink"
                aria-label="View source on GitHub"
              >
                <GitHubIcon sx={{ fontSize: 16 }} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ProfileProjectLink"
                aria-label="Open live project"
              >
                <OpenInNewIcon sx={{ fontSize: 16 }} />
              </a>
            )}
          </div>
        )}
      </div>
      {project.description && (
        <p className="ProfileProjectDesc">{project.description}</p>
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

export default Profile;
