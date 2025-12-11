import "../CSS/Explore.css";
import users from "../utils/dummyuser.json";
import Card from "../Components/Card";

const Explore = () => {
  return (
    <div className="ExploreContainer">
      {users.map((val) => {
        return <Card key={val.id} val={val} />;
      })}
    </div>
  );
};

export default Explore;
