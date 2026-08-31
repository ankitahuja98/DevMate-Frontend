import { useEffect, useRef, useState, type ReactNode } from "react";
import MobileLayout from "../MobileLayout/index";
import MainLayout from "../MainLayout/index";
import { Outlet } from "react-router-dom";
import { useFullscreen } from "../../context/FullscreenContext";
import { SearchProvider } from "../../context/SearchContext";
import useNotificationSocket from "../../hooks/useNotificationSocket";

interface ResponsiveLayoutProps {
  children?: ReactNode;
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);
  const editorRef = useRef<HTMLDivElement>(null);
  const { setEditorRef } = useFullscreen();

  // Single, long-lived socket.io connection for real-time notifications —
  // alive for the whole authenticated session, on both desktop & mobile.
  useNotificationSocket();

  useEffect(() => {
    setEditorRef(editorRef);
  }, [setEditorRef]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <SearchProvider>
        <MobileLayout editorRef={editorRef}>
          {children || <Outlet />}
        </MobileLayout>
      </SearchProvider>
    );
  }

  return (
    <SearchProvider>
      <MainLayout editorRef={editorRef}>{children || <Outlet />}</MainLayout>
    </SearchProvider>
  );
};

export default ResponsiveLayout;
