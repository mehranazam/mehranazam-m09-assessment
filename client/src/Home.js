import { useContext } from "react";
import Agents from "./Agents";
import AuthContext from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [user, setUser] = useContext(AuthContext);
  return (
    <div className="row">
      <div className="col sidebar"></div>
      <div className="col-8 main-welcome">
        <p className="display-5">Welcome to Field Agents Admin</p>
        <FontAwesomeIcon icon={faUserSecret} className="agent-item" />
      </div>
      <div className="col sidebar"></div>

      {user?.user ? <Agents /> : null}
    </div>
  );
}

export default Home;
