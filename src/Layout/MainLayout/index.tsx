import { useRef, useState } from "react";
import Sidebar from "../Sidebar/index";
import Topbar from "../Topbar/index";
import { Outlet } from "react-router-dom";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [NotificationIsOpen, setNotificationIsOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} editorRef={editorRef} />

      {/* Right Section (Topbar + Page Content) */}
      <div className="flex flex-col flex-1 overflow-hidden rounded-tl-3xl bg-white border-2">
        {/* Top bar */}
        <Topbar
          NotificationIsOpen={NotificationIsOpen}
          setNotificationIsOpen={setNotificationIsOpen}
          editorRef={editorRef}
        />

        {/* Page content */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default index;
