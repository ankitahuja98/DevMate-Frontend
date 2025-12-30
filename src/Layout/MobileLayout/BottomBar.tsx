import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const location = useLocation();

  const menuItems = [
    { id: 0, name: "Profile", path: "/profile", icon: PersonIcon },
    { id: 1, name: "Discover", path: "/discover", icon: InterestsOutlinedIcon },
    { id: 2, name: "Explore", path: "/", icon: Diversity2Icon },
    { id: 3, name: "Liked You", path: "/likedyou", icon: FavoriteIcon },
    { id: 4, name: "Chats", path: "/matches", icon: ChatIcon },
  ];
  return (
    <div className="BottomBarContainer fixed bottom-0 left-0 right-0 bg-white flex items-center justify-between z-50">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center`}
            style={{
              color: isActive ? "#00296b" : "grey",
              backgroundColor: (isActive && "rgb(227 238 255 / 67%)") || "",
              padding: (isActive && "10px") || "",
              borderRadius: "50%",
            }}
          >
            <Icon
              style={{ fontSize: item.name === "Profile" ? "35px" : "30px" }}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;
