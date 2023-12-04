import { Link } from "react-router-dom";

export default function Users() {
  return (
    <div className="">
      <Link to={"/users/add"}>Register</Link>
    </div>
  );
}
