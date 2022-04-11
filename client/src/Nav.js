import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";

function Nav() {
  const [user, setUser] = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {user?.user ? (
          <div>
            <li>Logout {user.user.sub}</li>
            <li>
              <Link to="agents">Show All Agents</Link> | &nbsp;{" "}
            </li>
            <li>
              <Link to="add">Add New Agent</Link> | &nbsp;{" "}
            </li>
            <li>
              <Link to="edit-form">Update Agent</Link> &nbsp;{" "}
            </li>
          </div>
        ) : (
          <li>
            <link to="/login">Login</link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
