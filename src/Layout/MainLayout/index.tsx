import { useRef, useState } from "react";
import Sidebar from "../Sidebar/index";
import Topbar from "../Topbar/index";
import { Outlet } from "react-router-dom";
import EditProfile from "../../Components/EditProfile";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [NotificationIsOpen, setNotificationIsOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} editorRef={editorRef} />

      {/* Right Section (Topbar + Page Content) */}
      <div className="flex flex-col flex-1 overflow-hidden rounded-tl-3xl bg-white">
        {/* Top bar */}
        <Topbar
          NotificationIsOpen={NotificationIsOpen}
          setNotificationIsOpen={setNotificationIsOpen}
          editorRef={editorRef}
        />

        {/* Page content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default index;
