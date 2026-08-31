import "../CSS/Explore.css";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";
import TuneIcon from "@mui/icons-material/Tune";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { getAllUsers } from "../redux/actions/userAction";
import { resetUsers, removeUser } from "../redux/slices/userSlice";
import { sendConnectionReq } from "../redux/actions/connectionAction";
import { toast } from "react-toastify";
import AllSwipe from "../Images/AllSwipe.avif";
import { Button } from "@mui/material";
import type { userData } from "../types/userData";
import LoadingThreeDotsPulse from "../Components/Loader";
import SEO from "../Components/SEO";
import DeveloperCard from "../Components/DeveloperCard";
import SearchEmptyState from "../Components/SearchEmptyState";
import { useSearch } from "../context/SearchContext";

// Keep these in sync with the `.ExploreGrid` / mobile breakpoint rules in
// Explore.css — the grid there is `repeat(auto-fill, minmax(300px, 1fr))`
// with a 20px gap, and forces a single column under 768px. We can't rely on
// the browser to do that math for us anymore because the grid is now
// virtualized: only a handful of rows are ever mounted, so each row needs
// to know up front exactly how many cards it holds.
const GRID_GAP = 20;
const MIN_CARD_WIDTH = 300;
const MOBILE_BREAKPOINT = 768;
const ROW_HEIGHT_ESTIMATE = 300;

const Explore = () => {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState<string | null>(null);

  const {
    query,
    setQuery,
    filters,
    clearFilters: clearAdvancedFilters,
    setScope,
    setRoleOptions,
    setSkillOptions,
  } = useSearch();
  const { role: roleFilter, skill: skillFilter, experience: experienceFilter, availability: availabilityFilter } = filters;

  const [sortBy, setSortBy] = useState<"recommended" | "experience">(
    "recommended",
  );

  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectedIds, setConnectedIds] = useState<Set<string>>(new Set());

  // ── Virtualized grid — the scroll area is its own bounded box (see
  // .ExploreScrollArea) rather than the whole document, so react-virtual
  // only ever mounts the rows near the viewport instead of every card
  // that's been paged in. Column count is measured off the container
  // (not just window width) so it tracks sidebar collapse/expand too.
  //
  // The container is only rendered once results exist (it's behind the
  // `AllUsers.length !== 0` branch below), so it can mount well after this
  // component's first render — a plain ref + mount-only effect would miss
  // it. A state-backed callback ref re-attaches the ResizeObserver
  // whenever the node actually shows up (or goes away, e.g. on refresh).
  const [scrollAreaNode, setScrollAreaNode] = useState<HTMLDivElement | null>(
    null,
  );
  // Kept alongside the state above purely for the imperative scrollTo calls
  // below (fetchFeed / handleRefresh) — reading a ref doesn't need to be a
  // hook dependency, so this avoids re-running those effects/callbacks
  // every time the grid mounts/unmounts.
  const scrollAreaImperativeRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useCallback((node: HTMLDivElement | null) => {
    scrollAreaImperativeRef.current = node;
    setScrollAreaNode(node);
  }, []);
  const [columnCount, setColumnCount] = useState(1);

  useLayoutEffect(() => {
    if (!scrollAreaNode) return;

    const computeColumns = (width: number) => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) return 1;
      return Math.max(
        1,
        Math.floor((width + GRID_GAP) / (MIN_CARD_WIDTH + GRID_GAP)),
      );
    };

    setColumnCount(computeColumns(scrollAreaNode.clientWidth));

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? scrollAreaNode.clientWidth;
      setColumnCount(computeColumns(width));
    });
    observer.observe(scrollAreaNode);
    return () => observer.disconnect();
  }, [scrollAreaNode]);

  const AllUsers: userData[] =
    useAppSelector((store) => store.user.userData?.data) || [];
  const hasMoreUsers = useAppSelector((store) => store.user.userData?.hasMore);
  const nextCursor =
    useAppSelector((store) => store.user.userData?.nextCursor) || null;
  const getallUsersisLoading = useAppSelector(
    (store) => store.user.userDataIsloading,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (nextCursor) setCursor(nextCursor);
  }, [nextCursor]);

  const hasActiveFilters =
    !!roleFilter || !!skillFilter || !!experienceFilter || !!availabilityFilter;
  const hasActiveSearch = hasActiveFilters || !!query;

  // ── Search + filters run server-side (see the /feed route) so a match
  // that hasn't been paged into the browser yet still shows up, instead of
  // only searching whatever's already loaded. Debounced so typing doesn't
  // fire a request per keystroke; the very first mount fetches immediately.
  const isFirstRun = useRef(true);
  useEffect(() => {
    const fetchFeed = () => {
      setCursor(null);
      dispatch(resetUsers());
      scrollAreaImperativeRef.current?.scrollTo({ top: 0 });
      dispatch(
        getAllUsers({
          cursor: null,
          search: query,
          role: roleFilter,
          skill: skillFilter,
          experience: experienceFilter,
          availability: availabilityFilter,
        }),
      );
    };

    if (isFirstRun.current) {
      isFirstRun.current = false;
      fetchFeed();
      return;
    }

    const timer = setTimeout(fetchFeed, 350);
    return () => clearTimeout(timer);
  }, [dispatch, query, roleFilter, skillFilter, experienceFilter, availabilityFilter]);

  const handleRefresh = () => {
    setCursor(null);
    dispatch(resetUsers());
    scrollAreaImperativeRef.current?.scrollTo({ top: 0 });
    dispatch(
      getAllUsers({
        cursor: null,
        search: query,
        role: roleFilter,
        skill: skillFilter,
        experience: experienceFilter,
        availability: availabilityFilter,
      }),
    );
  };

  const handleLoadMore = () => {
    dispatch(
      getAllUsers({
        cursor,
        search: query,
        role: roleFilter,
        skill: skillFilter,
        experience: experienceFilter,
        availability: availabilityFilter,
      }),
    );
  };

  // This page owns the topbar search while it's mounted — register the
  // scope once, hand off when we unmount so Liked You (or nothing) takes
  // over instead of Explore's stale filters lingering.
  useEffect(() => {
    setScope("explore");
    return () => setScope(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Filter option lists — accumulated (never shrunk) across whatever's
  // been loaded so far, so picking a role/skill filter doesn't make the
  // *other* options vanish from the dropdown once the server narrows
  // AllUsers down to the active filters. Pushed into the shared search
  // context so the topbar's advanced-search panel can offer them. ────────
  const roleOptionsRef = useRef<Set<string>>(new Set());
  const skillOptionsRef = useRef<Set<string>>(new Set());
  const [roleOptions, setRoleOptionsState] = useState<string[]>([]);
  const [skillOptions, setSkillOptionsState] = useState<string[]>([]);

  useEffect(() => {
    let changed = false;
    AllUsers.forEach((u) => {
      if (u.currentRole && !roleOptionsRef.current.has(u.currentRole)) {
        roleOptionsRef.current.add(u.currentRole);
        changed = true;
      }
      (u.techStack || []).forEach((s) => {
        if (!skillOptionsRef.current.has(s)) {
          skillOptionsRef.current.add(s);
          changed = true;
        }
      });
    });
    if (changed) {
      setRoleOptionsState(Array.from(roleOptionsRef.current).sort());
      setSkillOptionsState(Array.from(skillOptionsRef.current).sort());
    }
  }, [AllUsers]);

  useEffect(() => {
    setRoleOptions(roleOptions);
  }, [roleOptions, setRoleOptions]);

  useEffect(() => {
    setSkillOptions(skillOptions);
  }, [skillOptions, setSkillOptions]);

  // Search + filters are already applied server-side — this just sorts
  // whatever the server returned (sort stays a client-only concern, same
  // as before).
  const sortedUsers = useMemo(() => {
    if (sortBy !== "experience") return AllUsers;
    return [...AllUsers].sort((a, b) => (b.experience || 0) - (a.experience || 0));
  }, [AllUsers, sortBy]);

  // Chunk the flat list into fixed-width rows so each virtual row is a
  // simple `repeat(columnCount, 1fr)` grid — this is the standard pattern
  // for virtualizing a responsive grid whose column count isn't fixed.
  const rows = useMemo(() => {
    const chunked: userData[][] = [];
    for (let i = 0; i < sortedUsers.length; i += columnCount) {
      chunked.push(sortedUsers.slice(i, i + columnCount));
    }
    return chunked;
  }, [sortedUsers, columnCount]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollAreaNode,
    estimateSize: () => ROW_HEIGHT_ESTIMATE,
    overscan: 4,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  // Infinite scroll: once the last mounted row is at (or near) the end of
  // the list, page in the next batch — same getAllUsers/cursor flow the
  // old "Load More" button used, just triggered by scroll position instead
  // of a click.
  useEffect(() => {
    const lastRow = virtualRows[virtualRows.length - 1];
    if (!lastRow) return;
    if (lastRow.index >= rows.length - 1 && hasMoreUsers && !getallUsersisLoading) {
      handleLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [virtualRows, rows.length, hasMoreUsers, getallUsersisLoading]);

  const clearSearch = () => {
    clearAdvancedFilters();
    setQuery("");
  };

  const handleViewProfile = (user: userData) => {
    navigate(`/developer/${user._id}`, { state: { user } });
  };

  // ── Connect — same sendConnectionReq the old swipe card used, just
  // triggered from a grid card instead. ──────────────────────────────────
  const handleConnect = (user: userData) => {
    if (connectedIds.has(user._id) || connectingId === user._id) return;
    setConnectingId(user._id);
    dispatch(sendConnectionReq({ status: "interested", toUserId: user._id }))
      .unwrap()
      .then(() => {
        setConnectedIds((prev) => new Set(prev).add(user._id));
        toast.success(`Connection request sent to ${user.name}`);
        // Same as the old swipe card: drop this user from the feed now that
        // a request is out, so they don't keep showing up in Explore.
        setTimeout(() => dispatch(removeUser(user._id)), 500);
      })
      .catch((err: any) => {
        toast.error(err?.message || "Something went wrong");
      })
      .finally(() => setConnectingId(null));
  };

  return (
    <>
      <SEO
        title="Explore Developers - Devmate"
        description="Explore and discover developers that match your interests."
      />

      <div className="ExplorePage">
        <div className="ExploreTopRow">
          <div className="ExplorePageHeader">
            <div>
              <h1>Explore Developers</h1>
              <p>Find and connect with talented developers</p>
            </div>
          </div>

          {(AllUsers.length > 0 || hasActiveSearch) && (
            <div className="ExploreFilterBar">
              {hasActiveSearch && (
                <button
                  type="button"
                  className="ExploreClearFilters"
                  onClick={clearSearch}
                >
                  <TuneIcon sx={{ fontSize: 16 }} />
                  Clear filters
                </button>
              )}

              <div className="ExploreFilterItem ExploreFilterItem--sort">
                <TuneIcon className="ExploreFilterIcon" sx={{ fontSize: 16 }} />
                <select
                  className="ExploreFilterSelect"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="experience">Sort: Most Experienced</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {!getallUsersisLoading || AllUsers.length > 0 ? (
          AllUsers.length !== 0 ? (
            <div className="ExploreScrollArea" ref={scrollAreaRef}>
              <div
                style={{
                  position: "relative",
                  height: rowVirtualizer.getTotalSize(),
                  width: "100%",
                }}
              >
                {virtualRows.map((virtualRow) => {
                  const rowUsers = rows[virtualRow.index];
                  const isLastRow = virtualRow.index === rows.length - 1;

                  return (
                    <div
                      key={virtualRow.key}
                      data-index={virtualRow.index}
                      ref={rowVirtualizer.measureElement}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${virtualRow.start}px)`,
                        paddingBottom: isLastRow ? 0 : GRID_GAP,
                      }}
                    >
                      <div
                        className="ExploreGrid"
                        style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
                      >
                        {rowUsers.map((user, colIndex) => (
                          <DeveloperCard
                            key={user._id}
                            user={user}
                            onViewProfile={handleViewProfile}
                            onConnect={handleConnect}
                            isConnecting={connectingId === user._id}
                            isConnected={connectedIds.has(user._id)}
                            index={colIndex}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {hasMoreUsers && getallUsersisLoading && (
                <div className="ExploreInfiniteLoading">
                  <LoadingThreeDotsPulse />
                </div>
              )}
            </div>
          ) : hasActiveSearch ? (
            <SearchEmptyState
              query={query}
              entityLabel="developers"
              onClear={clearSearch}
            />
          ) : (
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                className="w-10/12 md:w-6/12 h-auto"
                src={AllSwipe}
                alt="All done"
              />
              <Button
                variant="contained"
                onClick={handleRefresh}
                sx={{
                  backgroundColor: "#6D3DF5",
                  boxShadow: "0 8px 20px rgba(109, 61, 245, 0.3)",
                  "&:hover": {
                    backgroundColor: "#5B2FE0",
                  },
                }}
              >
                Refresh
              </Button>
            </div>
          )
        ) : (
          <div className="flex justify-center pt-10">
            <LoadingThreeDotsPulse />
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
