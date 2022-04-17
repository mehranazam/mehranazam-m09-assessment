import DeleteAgent from "./DeleteAgent";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import EditAgent from "./EditAgent";
import { Navigate, useNavigate } from "react-router-dom";

function Agent(props) {
  const { agentId, firstName, lastName, middleName, dob, heightInInches } =
    props.agentObj;

  const [user, setUser] = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEditAgent = (event) => {
    event.preventDefault();
    navigate("/agents/edit/" + agentId);
  };

  function handleDeleteAgent(event) {
    event.preventDefault();
    navigate("agents/delete/" + agentId);
  }

  return (
    <div className="agent-card">
      <p>
        <b>First Name:</b> {firstName}
      </p>
      <p>
        <b>Middle Name:</b> {middleName}
      </p>
      <p>
        <b>Last Name:</b> {lastName}
      </p>
      <p>
        <b>DOB:</b> {dob}
      </p>
      <p>
        <b>Height (in):</b> {heightInInches}
      </p>

      {user?.user ? (
        <button onClick={handleEditAgent}>Edit Agent</button>
      ) : null}
      {user?.user ? (
        <button onClick={handleDeleteAgent}>Delete Agent</button>
      ) : null}
    </div>
  );
}

export default Agent;
