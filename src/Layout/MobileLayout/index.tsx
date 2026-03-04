import { Outlet, useLocation } from "react-router-dom";
import MobileTopbar from "./MobileTopbar";
import "./MobileLayout.css";
import BottomBar from "./BottomBar";
import EditProfile from "../../Components/EditProfile";

const index = ({
  children,
  editorRef,
}: {
  children: any;
  editorRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const location = useLocation();

  const needsBottomPadding = location.pathname === "/likedyou";
  return (
    <div ref={editorRef} className="flex h-dvh w-screen">
      {/* Right Section (Topbar + Page Content) */}
      <div className="flex flex-col flex-1 overflow-hidden bg-white">
        <MobileTopbar />
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${
            needsBottomPadding ? "pb-[60px]" : ""
          }`}
        >
          {children || <Outlet />}
        </div>
        <BottomBar />
      </div>
      <EditProfile />
    </div>
  );
};

export default index;
