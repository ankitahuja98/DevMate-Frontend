import { useEffect, useRef, useState } from "react";
import MobileLayout from "../MobileLayout/index";
import MainLayout from "../MainLayout/index";
import { Outlet } from "react-router-dom";
import { useFullscreen } from "../../context/FullscreenContext";

const ResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);
  const editorRef = useRef<HTMLDivElement>(null);
  const { setEditorRef } = useFullscreen();

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
      <MobileLayout editorRef={editorRef}>
        <Outlet />
      </MobileLayout>
    );
  }

  return (
    <MainLayout editorRef={editorRef}>
      <Outlet />
    </MainLayout>
  );
};

export default ResponsiveLayout;
