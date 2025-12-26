import { useEffect, useState } from "react";
import MobileLayout from "../MobileLayout/index";
import MainLayout from "../MainLayout/index";

const ResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile ? <MobileLayout /> : <MainLayout />;
};

export default ResponsiveLayout;
