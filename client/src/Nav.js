import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function Nav() {
  const [user, setUser] = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {user?.user ? (
          <div>
            <li>
              <button onClick={handleLogout}>Logout {user.user.sub}</button>
            </li>

            <li>
              <Link to="/agent/add">Add New Agent</Link> | &nbsp;{" "}
            </li>
          </div>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
