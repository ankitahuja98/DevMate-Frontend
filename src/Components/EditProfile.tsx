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
import { useEffect, useState } from "react";
import BasicInfo from "./Tabform/BasicInfo";
import Skills from "./Tabform/Skills";
import Goals from "./Tabform/Goals";
import Projects from "./Tabform/Projects";
import type { userData } from "../types/userData";
import "../CSS/EditProfile.css";
import { validateStep } from "../utils/validations/profilevalidation";
import { editprofile, fetchUserProfile } from "../redux/actions/profileAction";
import { allowedProps } from "../utils/allowedProps";
import { toast } from "react-toastify";

const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [activetabs, setactivetabs] = useState(0);

  const [userData, setUserData] = useState<userData>({
    _id: "",
    name: "", // basic info  - required
    age: null, // basic info - required
    profilePhoto: "", // basic info - required
    tagline: "", // basic info - required
    bio: "", // basic info - required
    location: "", // basic info
    currentRole: "", // basic info
    experience: null, // basic info
    socialLinks: {
      // basic info
      github: "",
      linkedin: "",
      portfolio: "",
    },

    techStack: [], // skills - required
    interests: [], // skills - required

    lookingForTitle: "", // Goals - required
    lookingForDesc: "", // Goals
    availability: "", // Goals - required
    projects: [], // Projects
    isNewUser: true,
  });
  const userprofile = useAppSelector(
    (store) => store.profile.userProfile.userProfileData
  );

  // console.log("userData", userData);
  // console.log("userprofile", userprofile);

  useEffect(() => {
    if (userprofile) {
      const filteredData: Partial<userData> = {};

      allowedProps.forEach((key) => {
        if (userprofile[key] !== undefined) {
          filteredData[key] = userprofile[key];
        }
      });
      setUserData(filteredData as userData);
    }
  }, []);

  const [errors, setErrors] = useState({});

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
    setErrors({});
    dispatch(setEditProfileDialogOpen(false));
  };

  const handleNext = () => {
    const stepErrors = validateStep(activetabs, userData);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});

    if (activetabs === 3) {
      const updatedUserData = { ...userData, isNewUser: false };
      setUserData(updatedUserData);
      dispatch(editprofile(updatedUserData))
        .unwrap()
        .then((res) => {
          dispatch(fetchUserProfile()); // refresh the profile data
          handleClose();
          dispatch(setEditProfileDialogOpen(false));
          toast.success(res?.message);
        })
        .catch((err) => toast.error(err.message));

      return;
    }

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
          disableEscapeKeyDown
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              handleClose();
            }
          }}
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
              // alignItems: "center",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "8px 16px",
            }}
          >
            <div>
              <p className="EditProfileDialogTitlte">
                Complete Your DevMate Profile
              </p>
              <p className="EditProfileDialogTitlteDesc">
                Let's set up your profile to help you find the perfect dev
                partner
              </p>
            </div>
            <div>
              {!userData.isNewUser && (
                <IconButton
                  sx={{ color: "#000", padding: "0px" }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          </DialogTitle>

          {/* Content */}
          <DialogContent dividers className="editProfileContent">
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
            <div className="ActiveComponent">
              <ActiveComponent
                userData={userData}
                setUserData={setUserData}
                errors={errors}
              />
            </div>
          </DialogContent>

          {/* Actions */}
          <DialogActions
            sx={{
              padding: "16px 24px",
              // justifyContent: "space-between",
            }}
          >
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
                  // disabled={errorLength > 0}
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
                  Submit ✓
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
