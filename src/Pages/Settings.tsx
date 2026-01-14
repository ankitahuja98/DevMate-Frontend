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
  { label: "Logout", path: "", type: "logout" },
  { label: "Delete Account", path: "", type: "deleteAccount" },
];

const Settings = () => {
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);

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

  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  const renderSection = (title: string, items: SettingItem[]) => (
    <section className="mb-7 ">
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase">
        {title}
      </h2>

      <div className="rounded-xl border border-gray-200 overflow-hidden">
        {items.map((item, index) => (
          <button
            key={item.label}
            onClick={() =>
              item.type === "logout"
                ? handleLogout()
                : item.type === "deleteAccount"
                ? handleDeleteAccount()
                : navigate(item.path)
            }
            className={`w-full flex items-center justify-between px-6 py-4 text-left
              hover:bg-gray-50 transition cursor-pointer
              ${index !== items.length - 1 ? "border-b border-gray-200" : ""}
            `}
          >
            <span
              className={`text-base font-medium ${
                item.type === "deleteAccount" ? "text-red-500" : "text-gray-800"
              } `}
            >
              {item.label}
            </span>

            <span className="text-gray-400 text-xl leading-none">›</span>
          </button>
        ))}
      </div>
    </section>
  );

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
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
