import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../redux/store/store";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFullscreen } from "../context/FullscreenContext";
import { deleteProfile } from "../redux/actions/profileAction";
import { toast } from "react-toastify";
import PageHeader from "../Components/PageHeader";

type SettingItem = {
  label: string;
  path: string;
  type?: string;
};

const accountSettings: SettingItem[] = [
  { label: "Profile", path: "/profile" },
  { label: "Notifications", path: "/settings/notifications" },
  { label: "Subscription", path: "/premium" },
];

const legalSettings: SettingItem[] = [
  { label: "About Devmate", path: "/about" },
  { label: "Founder", path: "/founder" },
  { label: "Contact Us", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Refund & Cancellation Policy", path: "/refund-policy" },
];

const accountActions: SettingItem[] = [
  { label: "Full Screen", path: "", type: "fullScreen" },
  { label: "Logout", path: "", type: "logout" },
  { label: "Delete Account", path: "", type: "deleteAccount" },
];

const ToggleSwitch = ({
  isOn,
  onToggle,
}: {
  isOn: boolean;
  onToggle: () => void;
}) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={isOn}
      onChange={onToggle}
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#6D3DF5] transition-colors"></div>
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
  </label>
);

const Settings = () => {
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDeleteAccount = () => {
    handleOpen();
  };

  const handleOpen = () => {
    setisDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setisDeleteDialogOpen(false);
  };

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const password = formJson.password as string;

      const res = await dispatch(deleteProfile(password)).unwrap();

      toast.success(res);
      handleClose();
      dispatch(logout());
    } catch (error: any) {
      toast.error(error);
    }
  };

  const renderSection = (title: string, items: SettingItem[]) => (
    <section className="mb-8">
      <h2 className="mb-3 text-xs font-bold tracking-wider text-[#6B7691] uppercase">
        {title}
      </h2>

      <div className="rounded-2xl border border-[#E4E7EF] bg-white overflow-hidden">
        {items.map((item, index) => (
          <button
            key={item.label}
            onClick={() =>
              item.type === "logout"
                ? handleLogout()
                : item.type === "deleteAccount"
                ? handleDeleteAccount()
                : item.type === "fullScreen"
                ? toggleFullscreen()
                : navigate(item.path)
            }
            className={`w-full flex items-center justify-between px-6 py-4 text-left
              hover:bg-[#F7F4FF] transition-colors cursor-pointer
              ${index !== items.length - 1 ? "border-b border-[#E4E7EF]" : ""}
            `}
          >
            <span
              className={`text-[15px] font-medium ${
                item.type === "deleteAccount" ? "text-red-500" : "text-[#17213D]"
              } `}
            >
              {item.label}
            </span>
            {item.label === "Full Screen" ? (
              <ToggleSwitch isOn={isFullscreen} onToggle={toggleFullscreen} />
            ) : (
              <span className="text-[#6B7691] text-xl leading-none font-light">
                ›
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-2.5 pb-8">
      <PageHeader
        title="Settings"
        description="Manage your account, preferences, and app experience"
      />
      {renderSection("Account Settings", accountSettings)}
      {renderSection("Information & Legal", legalSettings)}
      {renderSection("Account Actions", accountActions)}

      <Dialog open={isDeleteDialogOpen} onClose={handleClose}>
        <DialogTitle className="font-semibold text-red-600">
          Delete Account Permanently
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            This action cannot be undone. Deleting your account will permanently
            remove all your data. Please confirm your identity by entering your
            password below.
          </DialogContentText>

          <form onSubmit={handleDelete} id="delete-account-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" form="delete-account-form" color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
