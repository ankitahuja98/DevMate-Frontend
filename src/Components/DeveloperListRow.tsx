import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import type { userData } from "../types/userData";
import {
  experienceLabel,
  availabilityLabel,
  isRecentlyActive,
} from "../utils/developerCardHelpers";

interface DeveloperListRowProps {
  user: userData;
  onViewProfile: (user: userData) => void;
  onConnect: (user: userData) => void;
  isConnecting?: boolean;
  isConnected?: boolean;
  index?: number;
}

// The compact horizontal row used in Explore's "list" view — same data,
// same actions as DeveloperCard, just laid out as one row instead of a
// vertical tile (toggled via the grid/list switch above the results). No
// "⋯" hide menu here (unlike DeveloperCard) — the row is too short for it
// to sit anywhere that doesn't collide with the action buttons.
const DeveloperListRow = ({
  user,
  onViewProfile,
  onConnect,
  isConnecting,
  isConnected,
  index = 0,
}: DeveloperListRowProps) => {
  const {
    name,
    profilePhoto,
    currentRole,
    location,
    techStack,
    experience,
    availability,
    isVerified,
    lastSeen,
  } = user;

  const visibleSkills = techStack?.slice(0, 3) || [];
  const extraSkills = (techStack?.length || 0) - visibleSkills.length;

  return (
    <div
      className="DevListRow card-enter"
      style={{ "--card-index": index } as React.CSSProperties}
    >
      <div className="DevListAvatarWrap">
        <img src={profilePhoto} alt={name} className="DevListAvatar" />
        {isRecentlyActive(lastSeen) && <span className="DevListOnlineDot" />}
      </div>

      <div className="DevListIdentity min-w-0">
        <div className="flex items-center gap-1">
          <p className="DevListName">{name}</p>
          {isVerified && <VerifiedIcon sx={{ fontSize: 15, color: "#6D3DF5" }} />}
        </div>
        <div className="DevListMeta">
          {currentRole && <span>{currentRole}</span>}
          {location && (
            <span>
              <LocationOnOutlinedIcon sx={{ fontSize: 13 }} />
              {location}
            </span>
          )}
        </div>
      </div>

      {visibleSkills.length > 0 && (
        <div className="DevListSkills">
          {visibleSkills.map((s, i) => (
            <span key={i} className="DevCardSkillPill">
              {s}
            </span>
          ))}
          {extraSkills > 0 && (
            <span className="DevCardSkillPill DevCardSkillPill--more">
              +{extraSkills}
            </span>
          )}
        </div>
      )}

      <div className="DevListStats">
        <span>
          <CalendarTodayOutlinedIcon sx={{ fontSize: 13 }} />
          {experienceLabel(experience)}
        </span>
        {availability && (
          <span>
            <AccessTimeOutlinedIcon sx={{ fontSize: 13 }} />
            {availabilityLabel[availability] || availability}
          </span>
        )}
      </div>

      <div className="DevListActions">
        <button
          type="button"
          className="DevCardBtn DevCardBtn--ghost"
          onClick={() => onViewProfile(user)}
        >
          View Profile
        </button>
        <button
          type="button"
          className="DevCardBtn DevCardBtn--solid"
          disabled={isConnecting || isConnected}
          onClick={() => onConnect(user)}
        >
          {isConnected ? (
            <>
              <HourglassTopIcon sx={{ fontSize: 16 }} /> Requested
            </>
          ) : (
            <>
              <PersonAddAlt1Icon sx={{ fontSize: 16 }} /> Connect
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeveloperListRow;
