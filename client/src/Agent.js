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

  function removeAgentFromState() {
    props.setAgents(
      [...props.agents].filter((agent) => agent.agentId !== agentId)
    );
  }
  function handleDeleteAgent() {
    fetch("http://localhost:8080/api/agent/" + agentId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
        removeAgentFromState();
      })
      .catch((rejection) => console.log(rejection));
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
      <button onClick={() => handleDeleteAgent()}>X</button>
    </div>
  );
}

export default Agent;
