import "../CSS/Explore.css";
import users from "../utils/dummyuser.json";

const Explore = () => {
  console.log(users);
  return (
    <div className="ExploreContainer">
      <div className="ExploreCard">
        {users.map((val) => {
          const { id, name, age, about, photo } = val;
          return <div>{name}</div>;
        })}
      </div>
    </div>
  );
};

export default Explore;
