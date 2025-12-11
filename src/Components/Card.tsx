import { motion, useMotionValue, useTransform } from "framer-motion";

const Card = ({ val }: { val: any }) => {
  const { name, age, about, photo } = val;
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
        src={photo}
        alt="user photo"
        draggable="false"
        style={{
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      <p className="username">{name}</p>
      <p>{age}</p>
      <p>{about}</p>
    </motion.div>
  );
};

export default Card;
