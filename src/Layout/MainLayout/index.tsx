import { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/index";
import Topbar from "../Topbar/index";
import { Outlet } from "react-router-dom";
import EditProfile from "../../Components/EditProfile";

// Below this, the full 264px sidebar eats too much of a tablet's width —
// collapse it to the icon rail by default. Below 650px MobileLayout takes
// over entirely (see ResponsiveLayout.tsx), so this only ever applies to
// the tablet band between 650px and ~1100px.
const SIDEBAR_AUTO_COLLAPSE_WIDTH = 1100;

const MainLayout = ({
  children,
  editorRef,
}: {
  children: any;
  editorRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isOpen, setIsOpen] = useState(
    () => window.innerWidth >= SIDEBAR_AUTO_COLLAPSE_WIDTH,
  );

  // Auto-collapse once when the window shrinks past the tablet threshold
  // (e.g. resizing the browser, or rotating a tablet) — but never force it
  // back open on the way back up, and never fight a manual toggle: this
  // only fires on the wide→narrow crossing itself, not on every resize
  // tick while already narrow.
  const prevWidthRef = useRef(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const prevWidth = prevWidthRef.current;
      if (
        prevWidth >= SIDEBAR_AUTO_COLLAPSE_WIDTH &&
        width < SIDEBAR_AUTO_COLLAPSE_WIDTH
      ) {
        setIsOpen(false);
      }
      prevWidthRef.current = width;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={editorRef} className="flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} editorRef={editorRef} />

      {/* Right Section (Topbar + Page Content) */}
      <div className="mainContent flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <Topbar editorRef={editorRef} />

        {/* Page content. `data-scroll-root` marks this as a scroll
            container that ScrollToTop resets on navigation — it outlives
            the route change, so it would otherwise keep its offset. */}
        <div
          data-scroll-root
          className="flex-1 overflow-y-auto overflow-x-hidden"
        >
          {children || <Outlet />}
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
