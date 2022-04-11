import DeleteAgent from "./DeleteAgent";
import { useContext } from "react";
import AuthContext from "./AuthContext";

function Agent(props) {
  const { agentId, firstName, lastName, middleName, dob, heightInInches } =
    props.agentObj;

  function removeAgentFromState() {
    props.setAgents(
      [...props.agents].filter((agent) => agent.agentId !== agentId)
    );
  }
  function handleDeleteAgent() {
    fetch("http://localhost:8080/api/agent" + agentId, {
      method: "DELETE",
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
      <Form
        agentObj={props.agentObj}
        agents={props.agents}
        setAgents={props.setAgents}
      />
      <button onClick={() => props.handleDeleteAgent()}>X</button>
    </div>
  );
}

export default Agent;
