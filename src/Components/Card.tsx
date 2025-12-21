import { motion, useMotionValue, useTransform } from "framer-motion";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Card = ({ val }: { val: any }) => {
  const { name, age, about, profilePhoto, location } = val;
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    if (x.get() > 50) {
      console.log("swipe right");
    } else if (x.get() < -50) {
      console.log("swipe left");
    } else {
      console.log("back to center");
    }
  };

  return (
    <motion.div
      className="ExploreCard"
      drag="x"
      onDragEnd={handleDragEnd}
      style={{
        x,
        opacity,
        rotate,
      }}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
    >
      <img
        src={profilePhoto}
        alt="user photo"
        draggable="false"
        width="100%"
        height="100%"
        style={{
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      <div className="UserTopContaienr">
        <span className="font-bold text-2xl text-white">{name}</span>
        <span className="font-semibold text-xl text-white pl-2">{age}</span>
        <p className="font-base text-lg text-white mt-1">
          <LocationOnOutlinedIcon sx={{ fontSize: 22 }} />
          {location}
        </p>
      </div>
      {/* <p>{about}</p> */}
    </motion.div>
  );
};

export default Card;
