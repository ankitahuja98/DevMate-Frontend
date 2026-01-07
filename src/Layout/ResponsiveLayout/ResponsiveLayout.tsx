import { useEffect, useState } from "react";
import MobileLayout from "../MobileLayout/index";
import MainLayout from "../MainLayout/index";

type Props = {
  children?: React.ReactNode;
};

const ResponsiveLayout = ({ children }: Props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default ResponsiveLayout;
