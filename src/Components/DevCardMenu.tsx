import { useState } from "react";
import { IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

interface DevCardMenuProps {
  // Explore sends status "ignored" (sendConnectionReq); Liked You sends
  // "rejected" (reviewConnectionReq) — both mean "not interested", they're
  // just the two sides of the same request.
  onNotInterested: () => void;
  disabled?: boolean;
  container?: HTMLElement;
}

// The "⋯" menu in a developer card's corner.
const DevCardMenu = ({
  onNotInterested,
  disabled,
  container,
}: DevCardMenuProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton
        size="small"
        aria-label="More options"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          setAnchor(e.currentTarget);
        }}
        className="DevCardMenuBtn"
      >
        <MoreHorizIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(null)}
        container={container}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem
          onClick={() => {
            setAnchor(null);
            onNotInterested();
          }}
        >
          <ListItemIcon>
            <PersonRemoveOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Not interested
        </MenuItem>
      </Menu>
    </>
  );
};

export default DevCardMenu;
