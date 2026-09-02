import "../CSS/Matches.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import ConversationPanel from "../Components/ConversationPanel";
import TooltipWrapper from "../utils/TooltipWrapper";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import type { userData } from "../types/userData";
import { getAllMatches } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getChatList } from "../redux/actions/chatAction";
import LoadingThreeDotsPulse from "../Components/Loader";
import MatchesShimmer from "../Components/MatchesShimmer";
import SEO from "../Components/SEO";

const formatListTimestamp = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const Matches = () => {
  const { targetUserId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [searchChats, setSearchChats] = useState("");
  const [isConnectionsModalOpen, setIsConnectionsModalOpen] = useState(false);
  const [sortUnreadFirst, setSortUnreadFirst] = useState(false);
  const [canScrollConnectionsLeft, setCanScrollConnectionsLeft] = useState(false);
  const [canScrollConnectionsRight, setCanScrollConnectionsRight] = useState(false);
  const connectionsScrollRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const matches = useAppSelector((store) => store.user.matchesData?.data) || [];
  const { matchesDataIsloading } = useAppSelector((store) => store.user) || [];
  const isPremium = useAppSelector(
    (store) => store.profile.userProfile.userProfileData?.isPremium ?? false,
  );

  const { ChatList, isChatlistLoading } =
    useAppSelector((store) => store.chat) || [];

  useEffect(() => {
    dispatch(getAllMatches());
    dispatch(getChatList());
  }, [dispatch]);

  // Keeps the left/right fade arrows in sync with how far the strip has
  // been scrolled — hidden once there's nothing more to reveal that way.
  const updateConnectionsScrollState = () => {
    const el = connectionsScrollRef.current;
    if (!el) return;
    setCanScrollConnectionsLeft(el.scrollLeft > 4);
    setCanScrollConnectionsRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    );
  };

  useEffect(() => {
    updateConnectionsScrollState();
    window.addEventListener("resize", updateConnectionsScrollState);
    return () =>
      window.removeEventListener("resize", updateConnectionsScrollState);
  }, [matches.length]);

  const scrollConnections = (direction: "left" | "right") => {
    const el = connectionsScrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // A plain mouse wheel only has vertical delta — redirect it to horizontal
  // scroll so the strip is usable without a trackpad or click-drag.
  const handleConnectionsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = connectionsScrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  };

  // The strip shows a window of connections and folds the rest into a
  // trailing "+N More" chip, so the count is never invented.
  const CONNECTIONS_STRIP_LIMIT = 8;
  const visibleConnections = matches.slice(0, CONNECTIONS_STRIP_LIMIT);
  const hiddenConnectionsCount = Math.max(
    0,
    matches.length - CONNECTIONS_STRIP_LIMIT,
  );

  const unreadCount = useMemo(
    () => ChatList?.filter((c: any) => c.isUnread).length || 0,
    [ChatList],
  );

  const filteredChatList = useMemo(() => {
    if (!ChatList) return [];
    const search = searchChats.toLowerCase().trim();

    let list = ChatList;
    if (search) {
      list = list.filter((val: any) =>
        (val.user?.name?.toLowerCase() || "").includes(search),
      );
    }
    if (sortUnreadFirst) {
      list = [...list].sort(
        (a: any, b: any) => Number(b.isUnread) - Number(a.isUnread),
      );
    }
    return list;
  }, [searchChats, ChatList, sortUnreadFirst]);

  // location.state carries the full profile only when navigation happened
  // in-app (Explore/DeveloperProfile/Card/Matches list). A hard refresh on
  // /chat/:targetUserId loses it — fall back to the lighter chat-list entry
  // so the header still renders instead of crashing.
  const stateDetails = (state as any)?.targetUserDetails;
  const chatListEntry = ChatList?.find(
    (val: any) => val.user._id === targetUserId,
  );
  const receiverDetails = stateDetails || chatListEntry?.user || null;
  const hasFullProfile = Boolean(stateDetails);

  // Same profile experience as Explore/Liked You — a full page, not the
  // swipeable match-card overlay, since a connection is already matched.
  const handleViewProfile = (user: userData) => {
    navigate(`/developer/${user._id}`, { state: { user } });
  };

  const handleChatClick = (targetUserDetails: any) => {
    navigate(`/chat/${targetUserDetails._id}`, {
      state: { targetUserDetails },
    });
  };

  // Message shortcut on a connection row — stop the click from also
  // triggering the row's "view profile" navigation underneath it.
  const handleMessageConnection = (
    e: React.MouseEvent,
    targetUserDetails: any,
  ) => {
    e.stopPropagation();
    if (!isPremium) return;
    setIsConnectionsModalOpen(false);
    handleChatClick(targetUserDetails);
  };

  const handleBackToList = () => navigate("/matches");

  return (
    <>
      <SEO
        title={
          receiverDetails
            ? `Chat with ${receiverDetails.name} - Devmate`
            : "Chats - Devmate"
        }
        description="Chat with your matches and build developer connections."
      />

      {/* No in-page heading here: the desktop Topbar carries it (see
          topbarPageHeadings in Topbar.tsx) and on mobile MobileTopbar
          already shows "Chats" — a chat workspace has no height to spare
          for a third copy. */}
      <div className="ChatsPage">
        <div className="chatWorkspace">
        {/* ── Left panel: connections + conversation list ───────── */}
        <div
          className={`chatListPanel ${targetUserId ? "chatListPanel--hiddenOnMobile" : ""}`}
        >
          <div className="connectionsSection">
            <div className="connectionsSectionHeader">
              <div className="connectionsTitleGroup">
                <h3 className="connectionsTitle">Connections</h3>
                {matches.length > 0 && (
                  <span className="connectionsCountChip">
                    {matches.length}
                  </span>
                )}
              </div>
              {matches.length > 4 && (
                <button
                  type="button"
                  className="viewAllLink"
                  onClick={() => setIsConnectionsModalOpen(true)}
                >
                  View all
                  <ChevronRightIcon sx={{ fontSize: 14 }} />
                </button>
              )}
            </div>
            <div className="connectionsScrollWrap">
              {canScrollConnectionsLeft && (
                <button
                  type="button"
                  className="connectionsScrollBtn connectionsScrollBtn--left"
                  aria-label="Scroll connections left"
                  onClick={() => scrollConnections("left")}
                >
                  <ChevronLeftIcon sx={{ fontSize: 18 }} />
                </button>
              )}

              <div
                className="connectionsScroll"
                ref={connectionsScrollRef}
                onScroll={updateConnectionsScrollState}
                onWheel={handleConnectionsWheel}
              >
                {matchesDataIsloading ? (
                  <MatchesShimmer />
                ) : matches.length !== 0 ? (
                  <>
                    {visibleConnections.map((match: any, index: number) => (
                      <div
                        key={match._id}
                        className="connectionItem card-enter"
                        style={{ "--card-index": index } as React.CSSProperties}
                        onClick={() => handleViewProfile(match)}
                      >
                        <div className="connectionAvatarWrapper">
                          <img
                            src={match.profilePhoto}
                            alt={match.name}
                            className="connectionAvatar"
                          />
                          {match.isOnline && (
                            <span className="connectionOnlineDot" />
                          )}
                        </div>
                        <p className="connectionName">
                          {match.name.split(" ")[0]}
                        </p>
                      </div>
                    ))}

                    {/* Trailing chip for the remainder — same dialog as
                        "View all", reachable without scrolling the strip. */}
                    {hiddenConnectionsCount > 0 && (
                      <div
                        className="connectionItem"
                        onClick={() => setIsConnectionsModalOpen(true)}
                      >
                        <div className="connectionMoreAvatar">
                          +{hiddenConnectionsCount}
                        </div>
                        <p className="connectionName connectionName--muted">
                          More
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="connectionsEmpty">
                    <h3 className="connectionsEmptyTitle">
                      No connections yet
                    </h3>
                    <p className="connectionsEmptySub">
                      Explore developers to find new connections.
                    </p>
                  </div>
                )}
              </div>

              {canScrollConnectionsRight && (
                <button
                  type="button"
                  className="connectionsScrollBtn connectionsScrollBtn--right"
                  aria-label="Scroll connections right"
                  onClick={() => scrollConnections("right")}
                >
                  <ChevronRightIcon sx={{ fontSize: 18 }} />
                </button>
              )}
            </div>
          </div>

          <div className="messagesSection">
            <div className="messagesSectionHeader">
              <div className="messagesTitleRow">
                <h3 className="messagesTitle">Messages</h3>
                {unreadCount > 0 && (
                  <span className="messagesUnreadPill">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <div className="messagesHeaderActions">
                <div className="searchConvo">
                  <SearchIcon sx={{ fontSize: 18, color: "#6b7691" }} />
                  <input
                    className="searchConvoInput"
                    type="text"
                    placeholder="Search messages"
                    value={searchChats}
                    onChange={(e) => setSearchChats(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className={`sortToggleBtn ${sortUnreadFirst ? "sortToggleBtn--active" : ""}`}
                  aria-label="Sort conversations"
                  title={
                    sortUnreadFirst
                      ? "Showing unread first"
                      : "Sort: unread first"
                  }
                  onClick={() => setSortUnreadFirst((prev) => !prev)}
                >
                  <TuneIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>

            <div className="chatsList">
              {isChatlistLoading ? (
                <div className="h-full flex justify-center items-center">
                  <LoadingThreeDotsPulse />
                </div>
              ) : filteredChatList?.length !== 0 ? (
                filteredChatList?.map((val: any) => {
                  const { user, lastmessage, isUnread } = val;
                  const isActive = user._id === targetUserId;
                  return (
                    <div
                      key={user._id}
                      className={`chatItem ${isActive ? "chatItem--active" : ""}`}
                      onClick={() => handleChatClick(user)}
                    >
                      <div className="chatAvatarWrapper">
                        <img
                          src={user.profilePhoto}
                          alt={user.name}
                          className="chatAvatar"
                        />
                        {user.isOnline && (
                          <span className="chatAvatarOnlineDot" />
                        )}
                      </div>
                      <div className="chatContent">
                        <div className="chatHeader">
                          <h3 className="chatUserName">{user.name}</h3>
                          <span className="chatTimestamp">
                            {formatListTimestamp(lastmessage?.createdAt)}
                          </span>
                        </div>
                        <div className="chatFooter">
                          <p
                            className={`chatLastMessage ${isUnread ? "chatUnreadText" : ""}`}
                          >
                            {lastmessage?.message}
                          </p>
                          {isUnread && <span className="chatUnreadDot" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] px-6 text-center">
                  <div className="text-4xl mb-3 opacity-80">💬</div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    No conversations yet
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 mb-3 max-w-xs">
                    Start chatting with developers from the Explore page.
                  </p>
                  <button
                    onClick={() => navigate("/explore")}
                    className="mt-4 rounded-lg bg-[#6D3DF5] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B2FE0] transition cursor-pointer"
                  >
                    Explore Developers
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right panel: active conversation ───────────────────── */}
        <div
          className={`conversationPanelWrapper ${!targetUserId ? "conversationPanelWrapper--hiddenOnMobile" : ""}`}
        >
          {targetUserId ? (
            <ConversationPanel
              key={targetUserId}
              targetUserId={targetUserId}
              receiverDetails={receiverDetails}
              hasFullProfile={hasFullProfile}
              onBack={handleBackToList}
              onOpenProfile={() => handleViewProfile(receiverDetails)}
              onConversationDeleted={handleBackToList}
            />
          ) : (
            <div className="conversationEmpty">
              <div className="conversationEmptyIcon">
                <ChatBubbleOutlineIcon sx={{ fontSize: 30 }} />
              </div>
              <h3 className="conversationEmptyTitle">
                Select a conversation
              </h3>
              <p className="conversationEmptySub">
                Choose a message from the list to start collaborating.
              </p>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* "View all" connections dialog — full list, click through to a profile preview */}
      {isConnectionsModalOpen && (
        <div
          className="connectionsModalOverlay"
          onClick={() => setIsConnectionsModalOpen(false)}
        >
          <div
            className="connectionsModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="connectionsModalHeader">
              <h3 className="connectionsModalTitle">
                All connections
                <span className="connectionsModalCount">
                  {matches.length}
                </span>
              </h3>
              <button
                type="button"
                className="connectionsModalClose"
                aria-label="Close"
                onClick={() => setIsConnectionsModalOpen(false)}
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
            <div className="connectionsModalGrid">
              {matches.map((match: any, index: number) => (
                <div
                  key={match._id}
                  className="connectionModalItem card-enter"
                  style={{ "--card-index": index } as React.CSSProperties}
                  onClick={() => {
                    setIsConnectionsModalOpen(false);
                    handleViewProfile(match);
                  }}
                >
                  <img
                    src={match.profilePhoto}
                    alt={match.name}
                    className="connectionModalAvatar"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="connectionModalName">{match.name}</p>
                    {match.currentRole && (
                      <p className="connectionModalRole">
                        {match.currentRole}
                      </p>
                    )}
                  </div>
                  <TooltipWrapper
                    title={
                      isPremium ? "" : "Upgrade to Premium to message"
                    }
                    arrow
                  >
                    <button
                      type="button"
                      className="connectionModalMessageBtn"
                      aria-label={`Message ${match.name}`}
                      disabled={!isPremium}
                      onClick={(e) => handleMessageConnection(e, match)}
                    >
                      <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                    </button>
                  </TooltipWrapper>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Matches;
