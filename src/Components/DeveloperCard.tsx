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

interface DeveloperCardProps {
  user: userData;
  onViewProfile: (user: userData) => void;
  onConnect: (user: userData) => void;
  isConnecting?: boolean;
  isConnected?: boolean;
  // Position in the list — drives the staggered entrance animation (see
  // .card-enter in index.css). Optional so the component still works
  // wherever it's used without a known position.
  index?: number;
}

const DeveloperCard = ({
  user,
  onViewProfile,
  onConnect,
  isConnecting,
  isConnected,
  index = 0,
}: DeveloperCardProps) => {
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
      className="DevCard card-enter"
      style={{ "--card-index": index } as React.CSSProperties}
    >
      <div className="DevCardHeader">
        <div className="DevCardAvatarWrap">
          <img src={profilePhoto} alt={name} className="DevCardAvatar" />
          {isRecentlyActive(lastSeen) && <span className="DevCardOnlineDot" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="DevCardName">{name}</p>
            {isVerified && (
              <VerifiedIcon sx={{ fontSize: 16, color: "#6D3DF5" }} />
            )}
          </div>
          {currentRole && <p className="DevCardRole">{currentRole}</p>}
          {location && (
            <div className="DevCardLocation">
              <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>

      {visibleSkills.length > 0 && (
        <div className="DevCardSkills">
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

      <div className="DevCardStats">
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

      <div className="DevCardActions">
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

export default DeveloperCard;
