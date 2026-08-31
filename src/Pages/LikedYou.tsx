import { useAppSelector, type AppDispatch } from "../redux/store/store";
import "../CSS/LikedYou.css";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRequests } from "../redux/actions/userAction";
import { reviewConnectionReq } from "../redux/actions/connectionAction";
import LoadingThreeDotsPulse from "../Components/Loader";
import { Button } from "@mui/material";
import AllReqSwipe from "../Images/AllReqSwipe.avif";
import SEO from "../Components/SEO";
import { toast } from "react-toastify";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import CodeIcon from "@mui/icons-material/Code";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CheckIcon from "@mui/icons-material/Check";
import {
  experienceLabel,
  isRecentlyActive,
  isRecentlyCreated,
} from "../utils/developerCardHelpers";
import getDate from "../utils/getDate";
import { useSearch } from "../context/SearchContext";
import SearchEmptyState from "../Components/SearchEmptyState";

interface Request {
  _id: string;
  fromUserId: any;
  createdAt?: string;
}

const LikedYou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    query,
    setQuery,
    filters,
    clearFilters: clearAdvancedFilters,
    setScope,
    setRoleOptions,
    setSkillOptions,
  } = useSearch();
  const {
    role: roleFilter,
    skill: skillFilter,
    experience: experienceFilter,
    availability: availabilityFilter,
  } = filters;
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "name">("recent");

  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectedIds, setConnectedIds] = useState<Set<string>>(new Set());

  const AllRequests: Request[] =
    useAppSelector((store) => store.user.requestData?.data) || [];
  const getallRequestsisLoading = useAppSelector(
    (store) => store.user.requestDataIsloading,
  );

  useEffect(() => {
    dispatch(getAllRequests());
  }, [dispatch]);

  const handleRefresh = () => dispatch(getAllRequests());

  const handleConnect = (request: Request, e: React.MouseEvent) => {
    e.stopPropagation();
    if (connectedIds.has(request._id) || connectingId === request._id) return;
    setConnectingId(request._id);
    dispatch(
      reviewConnectionReq({ status: "accepted", requestId: request._id }),
    )
      .unwrap()
      .then(() => {
        setConnectedIds((prev) => new Set(prev).add(request._id));
        toast.success(`You're now connected with ${request.fromUserId.name}!`);
      })
      .catch((err: any) => {
        toast.error(err?.message || "Something went wrong");
      })
      .finally(() => setConnectingId(null));
  };

  const handleViewProfile = (request: Request) => {
    navigate(`/developer/${request.fromUserId._id}`, {
      state: { user: request.fromUserId, requestId: request._id },
    });
  };

  // This page owns the topbar search while it's mounted.
  useEffect(() => {
    setScope("likedyou");
    return () => setScope(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roleOptions = useMemo(
    () =>
      Array.from(
        new Set(
          AllRequests.map((r) => r.fromUserId?.currentRole).filter(Boolean),
        ),
      ).sort(),
    [AllRequests],
  );

  const skillOptions = useMemo(
    () =>
      Array.from(
        new Set(AllRequests.flatMap((r) => r.fromUserId?.techStack || [])),
      ).sort(),
    [AllRequests],
  );

  useEffect(() => {
    setRoleOptions(roleOptions);
  }, [roleOptions, setRoleOptions]);

  useEffect(() => {
    setSkillOptions(skillOptions);
  }, [skillOptions, setSkillOptions]);

  const visibleRequests = useMemo(() => {
    let list = AllRequests;

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((r) => {
        const u = r.fromUserId;
        return [u?.name, u?.currentRole, ...(u?.techStack || [])]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(q));
      });
    }

    if (roleFilter) {
      list = list.filter((r) => r.fromUserId?.currentRole === roleFilter);
    }
    if (skillFilter) {
      list = list.filter((r) => r.fromUserId?.techStack?.includes(skillFilter));
    }
    if (experienceFilter) {
      list = list.filter(
        (r) => r.fromUserId?.experience === Number(experienceFilter),
      );
    }
    if (availabilityFilter) {
      list = list.filter(
        (r) => r.fromUserId?.availability === availabilityFilter,
      );
    }

    const sorted = [...list];
    if (sortBy === "recent") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      );
    } else if (sortBy === "oldest") {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime(),
      );
    } else {
      sorted.sort((a, b) =>
        (a.fromUserId?.name || "").localeCompare(b.fromUserId?.name || ""),
      );
    }
    return sorted;
  }, [
    AllRequests,
    query,
    roleFilter,
    skillFilter,
    experienceFilter,
    availabilityFilter,
    sortBy,
  ]);

  const hasActiveFilters =
    !!roleFilter || !!skillFilter || !!experienceFilter || !!availabilityFilter;
  const hasActiveSearch = hasActiveFilters || !!query;

  const clearSearch = () => {
    clearAdvancedFilters();
    setQuery("");
  };

  const totalLikes = AllRequests.length;
  const connectedCount = connectedIds.size;
  const pendingCount = totalLikes - connectedCount;

  // ── Loading ────────────────────────────────────────────────────────────────
  if (getallRequestsisLoading) {
    return (
      <div className="LikedyouContainer">
        <div className="loader-wrapper">
          <LoadingThreeDotsPulse />
        </div>
      </div>
    );
  }

  // ── Empty ──────────────────────────────────────────────────────────────────
  if (AllRequests.length === 0) {
    return (
      <div className="LikedyouContainer">
        <div className="flex justify-center items-center flex-col gap-4 pt-10">
          <img
            className="w-10/12 md:w-6/12 h-auto"
            src={AllReqSwipe}
            alt="All done"
          />
          <Button
            variant="contained"
            onClick={handleRefresh}
            sx={{
              backgroundColor: "#6D3DF5",
              boxShadow: "0 8px 20px rgba(109, 61, 245, 0.3)",
              "&:hover": { backgroundColor: "#5B2FE0" },
            }}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Liked You - Devmate"
        description="Developers who liked your profile."
      />

      <div className="LikedyouContainer">
        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="LikedYouTopRow">
          <div>
            <h1 className="LikedYouTitle">People who liked you</h1>
          </div>

          <div className="LikedYouTopActions">
            {hasActiveSearch && (
              <button
                type="button"
                className="LikedYouFilterBtn"
                onClick={clearSearch}
              >
                Clear filters
              </button>
            )}
            <select
              className="LikedYouSortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="recent">Sort: Most Recent</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <div className="LikedYouStats">
          <div
            className="LikedYouStatCard LikedYouStatCard--violet card-enter"
            style={{ "--card-index": 0 } as React.CSSProperties}
          >
            <span className="LikedYouStatIcon">
              <PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />
            </span>
            <div>
              <div className="LikedYouStatTop">
                <span className="LikedYouStatValue">{totalLikes}</span>
                <span className="LikedYouStatLabel">Total Likes</span>
              </div>
              <span className="LikedYouStatDesc">Developers liked you</span>
            </div>
          </div>
          <div
            className="LikedYouStatCard LikedYouStatCard--green card-enter"
            style={{ "--card-index": 1 } as React.CSSProperties}
          >
            <span className="LikedYouStatIcon">
              <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
            </span>
            <div>
              <div className="LikedYouStatTop">
                <span className="LikedYouStatValue">{connectedCount}</span>
                <span className="LikedYouStatLabel">Connected</span>
              </div>
              <span className="LikedYouStatDesc">
                People you connected with
              </span>
            </div>
          </div>
          <div
            className="LikedYouStatCard LikedYouStatCard--amber card-enter"
            style={{ "--card-index": 2 } as React.CSSProperties}
          >
            <span className="LikedYouStatIcon">
              <HourglassTopIcon sx={{ fontSize: 20 }} />
            </span>
            <div>
              <div className="LikedYouStatTop">
                <span className="LikedYouStatValue">{pendingCount}</span>
                <span className="LikedYouStatLabel">Pending</span>
              </div>
              <span className="LikedYouStatDesc">Awaiting your response</span>
            </div>
          </div>
        </div>

        {/* ── Card grid ────────────────────────────────────────────────────── */}
        {visibleRequests.length === 0 ? (
          <SearchEmptyState
            query={query}
            entityLabel="people"
            onClear={clearSearch}
          />
        ) : (
        <div className="LikedYouGrid">
          {visibleRequests.map((request, index) => {
            const u = request.fromUserId;
            const isNew = isRecentlyCreated(request.createdAt);
            const visibleSkills = u.techStack?.slice(0, 4) || [];
            const extraSkills = (u.techStack?.length || 0) - visibleSkills.length;
            const isConnected = connectedIds.has(request._id);
            const isConnecting = connectingId === request._id;

            return (
              <div
                key={request._id}
                className="LikedYouCard2 card-enter"
                style={{ "--card-index": index } as React.CSSProperties}
                onClick={() => handleViewProfile(request)}
              >
                <div className="LikedYouCard2Top">
                  {isNew && <span className="LikedYouNewBadge">NEW</span>}

                  <div className="LikedYouCard2Header">
                    <div className="LikedYouCard2AvatarWrap">
                      <img src={u.profilePhoto} alt={u.name} />
                      {isRecentlyActive(u.lastSeen) && (
                        <span className="LikedYouCard2OnlineDot" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <p className="LikedYouCard2Name">
                          {u.name}
                          {u.age ? `, ${u.age}` : ""}
                        </p>
                        {u.isVerified && (
                          <VerifiedIcon sx={{ fontSize: 15, color: "#6D3DF5" }} />
                        )}
                      </div>
                      {u.currentRole && (
                        <p className="LikedYouCard2Role">{u.currentRole}</p>
                      )}
                      <div className="LikedYouCard2Meta">
                        {u.location && (
                          <span>
                            <LocationOnOutlinedIcon sx={{ fontSize: 13 }} />
                            {u.location}
                          </span>
                        )}
                        <span>
                          Active{" "}
                          {getDate(u.lastSeen).toLowerCase() === "online"
                            ? "now"
                            : getDate(u.lastSeen)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {u.bio && <p className="LikedYouCard2Bio">{u.bio}</p>}
                </div>

                {visibleSkills.length > 0 && (
                  <div className="LikedYouCard2Skills">
                    {visibleSkills.map((s: string, i: number) => (
                      <span key={i}>{s}</span>
                    ))}
                    {extraSkills > 0 && (
                      <span className="more">+{extraSkills}</span>
                    )}
                  </div>
                )}

                <div className="LikedYouCard2Metrics">
                  <div>
                    <WorkOutlineIcon sx={{ fontSize: 15 }} />
                    <strong>{experienceLabel(u.experience)}</strong>
                    <span>Experience</span>
                  </div>
                  <div>
                    <FolderOpenOutlinedIcon sx={{ fontSize: 15 }} />
                    <strong>{u.projects?.length || 0}</strong>
                    <span>Projects</span>
                  </div>
                  <div>
                    <CodeIcon sx={{ fontSize: 15 }} />
                    <strong>{u.techStack?.length || 0}</strong>
                    <span>Skills</span>
                  </div>
                </div>

                <div className="LikedYouCard2Actions">
                  <button
                    type="button"
                    className="LikedYouCard2Btn LikedYouCard2Btn--ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProfile(request);
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    type="button"
                    className="LikedYouCard2Btn LikedYouCard2Btn--solid"
                    disabled={isConnecting || isConnected}
                    onClick={(e) => handleConnect(request, e)}
                  >
                    {isConnected ? (
                      <>
                        <CheckIcon sx={{ fontSize: 15 }} /> Connected
                      </>
                    ) : (
                      <>
                        <PersonAddAlt1Icon sx={{ fontSize: 15 }} /> Connect
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </>
  );
};

export default LikedYou;
