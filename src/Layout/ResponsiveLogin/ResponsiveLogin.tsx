import { useEffect, useState } from "react";
import MobileLogin from "../MobileLogin/index";
import MainLogin from "../MainLogin/index";

const ResponsiveLogin = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile ? <MobileLogin /> : <MainLogin />;
};

export default ResponsiveLogin;
