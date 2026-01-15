import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/index";
import Topbar from "../Topbar/index";
import { Outlet } from "react-router-dom";
import EditProfile from "../../Components/EditProfile";

const index = ({
  children,
  editorRef,
}: {
  children: any;
  editorRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [NotificationIsOpen, setNotificationIsOpen] = useState(false);

  return (
    <div ref={editorRef} className="flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} editorRef={editorRef} />

      {/* Right Section (Topbar + Page Content) */}
      <div className="mainContent flex flex-col flex-1 overflow-hidden rounded-tl-3xl">
        {/* Top bar */}
        <Topbar
          NotificationIsOpen={NotificationIsOpen}
          setNotificationIsOpen={setNotificationIsOpen}
          editorRef={editorRef}
        />

        {/* Page content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children || <Outlet />}
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default index;
