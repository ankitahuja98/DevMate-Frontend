import React from "react";
import DevMateLogo from "../../Images/devmateLogo.png";

const MobileTopbar = () => {
  return (
    <div className="MobileTopbarContainer">
      <img className="AppLogo" src={DevMateLogo} alt="DevMate" />
    </div>
  );
};

export default MobileTopbar;
