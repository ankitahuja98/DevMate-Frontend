import { Outlet, useLocation } from "react-router-dom";
import MobileTopbar from "./MobileTopbar";
import "./MobileLayout.css";
import BottomBar from "./BottomBar";
import EditProfile from "../../Components/EditProfile";

const index = ({ children }: { children: any }) => {
  const location = useLocation();

  const needsBottomPadding = location.pathname === "/likedyou";

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Right Section (Topbar + Page Content) */}
      <div className=" flex flex-col flex-1 overflow-hidden bg-white">
        {/* Mobile Top bar */}
        <MobileTopbar />
        {/* Page content */}
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${
            needsBottomPadding ? "pb-[60px]" : ""
          }`}
        >
          {children || <Outlet />}
          <EditProfile />
          <BottomBar />
        </div>
      </div>
    </div>
  );
};

export default index;
