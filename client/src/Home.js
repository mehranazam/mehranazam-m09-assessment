import { useContext } from "react";
import Agents from "./Agents";
import AuthContext from "./AuthContext";

function Home() {
  const [user, setUser] = useContext(AuthContext);
  return (
    <>
      <p>Welcome to Field Agents Admin</p>
      {user?.user ? <Agents /> : null}
    </>
  );
}

export default Home;
