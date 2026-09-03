import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/* React Router preserves scroll position across navigations, so opening a
   new page from halfway down the old one drops you in at that same offset.
   This resets every scroll container on each pathname change.

   The app scrolls in three different places depending on the route, and
   they all have to be reset:
     • `#root`          — public / marketing routes (see App.css)
     • [data-scroll-root] — the content pane inside MainLayout and
                            MobileLayout, which survives navigation between
                            authenticated pages and so keeps its offset
     • the window        — fallback for anything outside those shells

   Page-internal scrollers (the Explore results list, the chat transcript)
   are deliberately left alone: they own their own scroll behaviour. */
const scrollContainersToTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const root = document.getElementById("root");
  if (root) root.scrollTop = 0;

  document
    .querySelectorAll<HTMLElement>("[data-scroll-root]")
    .forEach((pane) => {
      pane.scrollTop = 0;
    });
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // An anchored link (/#how-it-works) is asking for a specific position —
    // don't fight it.
    if (hash) return;

    // Before paint, so the new page never flashes at the old offset.
    scrollContainersToTop();

    // Every page in this app is lazy-loaded, so at this point the route is
    // usually still showing its Suspense fallback and the real scroll pane
    // may not exist yet. One more pass after the incoming page has
    // rendered catches those.
    const frame = requestAnimationFrame(scrollContainersToTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
