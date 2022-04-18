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
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        {user?.user ? (
          <div>
            <li className="nav-item">
              <button onClick={handleLogout}>Logout {user.user.sub}</button>
            </li>

            <li className="nav-item">
              <Link to="/agent/add" className="nav-link">
                Add New Agent
              </Link>{" "}
              | &nbsp;{" "}
            </li>
          </div>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
