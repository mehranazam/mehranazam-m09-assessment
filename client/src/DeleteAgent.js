import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function DeleteAgent(props) {
  const { agentId } = props.agentObj;

  const { id } = useParams();

  const [userStatus, setUserStatus] = useContext(AuthContext);

  const [toDelete, setToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    console.log(jwt);
    if (jwt) {
      fetch("http://localhost:8080/api/agent/" + id, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            console.log(response);
            alert("retrieving Agent failed!");
          }
        })
        .then((retrievedAgent) => {
          console.log(retrievedAgent);
          setToDelete(retrievedAgent);
        })
        .catch((rejection) => {
          console.log(rejection);
          alert("Something very bad happened...");
        });
    }
  }, []);

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

  function doNotDelete(event) {
    event.preventDefault();
    navigate("/agent");
  }

  return (
    <>
      <form id="delete-form" className="hidden" onSubmit={handleDeleteAgent}>
        <label htmlFor="delete-agent">
          Are you sure you want to delete this agent?
        </label>
        <br />
        <br />
        <button type="submit">Yes</button>
      </form>
      <form id="refusal-form" className="hidden" onSubmit={doNotDelete}>
        <label htmlFor="delete-agent">
          Are you sure you want to delete this agent?
        </label>
        <br />
        <br />
        <button type="submit">No</button>
      </form>
    </>
  );
}

export default DeleteAgent;
