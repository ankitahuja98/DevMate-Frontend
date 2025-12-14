import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { useDispatch } from "react-redux";
import { setEditProfileDialogOpen } from "../redux/slices/profileSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import BasicInfo from "./Tabform/BasicInfo";
import Skills from "./Tabform/Skills";
import Goals from "./Tabform/Goals";
import Projects from "./Tabform/Projects";
import type { userData } from "../types/userData";
import "../CSS/EditProfile.css";

const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [activetabs, setactivetabs] = useState(0);

  const [userData, setUserData] = useState<userData>({
    name: "", // basic info
    age: null, // basic info
    profilePhoto: "", // basic info
    tagline: "", // basic info
    bio: "", // basic info
    location: "", // basic info
    currentRole: "", // basic info
    experience: null, // basic info
    socialLinks: {
      // basic info
      github: "",
      linkedin: "",
      portfolio: "",
    },

    techStack: [], // skills
    interests: [], // skills

    lookingForTitle: "", // Goals
    lookingForDesc: "", // Goals
    availability: "", // Goals
    projects: [], // Projects
  });

  const Tabs = [
    {
      name: "Basic Info",
      component: BasicInfo,
    },
    {
      name: "Skills",
      component: Skills,
    },
    {
      name: "Goals",
      component: Goals,
    },
    {
      name: "Projects",
      component: Projects,
    },
  ];

  // const tabslen = Tabs.length;
  const ActiveComponent = Tabs[activetabs].component;

  const isEditProfileDialogOpen = useAppSelector(
    (store) => store.profile.isEditProfileDialogOpen
  );

  const handleClose = () => {
    setactivetabs(0);
    dispatch(setEditProfileDialogOpen(false));
  };

  const handleNext = () => {
    if (activetabs < Tabs.length - 1) {
      setactivetabs(activetabs + 1);
    }
  };

  const handleBack = () => {
    if (activetabs > 0) {
      setactivetabs(activetabs - 1);
    }
  };

  return (
    <>
      {isEditProfileDialogOpen && (
        <Dialog
          open={isEditProfileDialogOpen}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "15px",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "8px 16px",
            }}
          >
            <div>
              <p className="font-bold">🚀 Complete Your DevMate Profile</p>
              <p className="text-sm italic">
                Let's set up your profile to help you find the perfect dev
                partner
              </p>
            </div>
            <IconButton sx={{ color: "#000" }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Content */}
          <DialogContent dividers>
            {/* STEPPER - FIXED VERSION */}
            <div className="stepper">
              {Tabs.map((tab, index) => {
                const isActive = index === activetabs;
                const isCompleted = index < activetabs;

                return (
                  <div
                    key={index}
                    className={`step ${isActive ? "active" : ""} ${
                      isCompleted ? "completed" : ""
                    }`}
                  >
                    <div className="step-circle">
                      {isCompleted ? "✓" : index + 1}
                    </div>
                    <div className="step-label">{tab.name}</div>
                  </div>
                );
              })}
            </div>

            {/* Form Content */}
            <div style={{ padding: "30px" }}>
              <ActiveComponent userData={userData} setUserData={setUserData} />
            </div>
          </DialogContent>

          {/* Actions */}
          <DialogActions
            sx={{
              padding: "16px 24px",
              justifyContent: "space-between",
            }}
          >
            <div>
              {activetabs === Tabs.length - 1 && (
                <Button onClick={handleClose} color="inherit" variant="text">
                  Skip for now
                </Button>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              {activetabs > 0 && (
                <Button onClick={handleBack} color="inherit" variant="outlined">
                  ← Back
                </Button>
              )}

              {activetabs < Tabs.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5568d3 0%, #6941a5 100%)",
                    },
                  }}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5568d3 0%, #6941a5 100%)",
                    },
                  }}
                >
                  Complete Profile ✓
                </Button>
              )}
            </div>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default EditProfile;
