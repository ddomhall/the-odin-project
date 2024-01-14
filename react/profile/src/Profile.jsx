import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DefaultProfile from "./DefaultProfile";
import Spinach from "./Spinach";
import Popeye from "./Popeye";
import Test1 from "./Test1";
import Test2 from "./Test2";

export default function Profile() {
  const { name } = useParams();

  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <Link to="/profile">profile</Link>
      <hr />
      <Link to="/profile/spinach">spinach</Link>
      <hr />
      <Link to="/profile/popeye">popeye</Link>
      <hr />
      <Link to="/profile/test1">test1</Link>
      <hr />
      <Link to="/profile/test2">test2</Link>
      <hr />
      <h2>The profile visited is here:</h2>
      {name === "popeye" ? (
        <Popeye />
      ) : name === "spinach" ? (
        <Spinach />
      ) : name === "test1" ? (
        <Test1 />
      ) : name === "test2" ? (
        <Test2 />
      ) : (
        <DefaultProfile />
      )}
    </div>
  );
};
