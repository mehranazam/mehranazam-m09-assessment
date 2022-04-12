import { useState, useEffect } from "react";
import Agent from "./Agent";
import AddAgent from "./AddAgent";

function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/agent")
      .then((response) => response.json())
      .then((jsonData) => setAgents(jsonData))
      .catch((rejection) => () => errorHandler(rejection));
  }, []);

  // useEffect(ANONYMOUS - FUNCTION, LIMITER);

  // limiters:
  // [] - load only once when component first loads
  // [state-name] - Load whenever this state is updated

  function errorHandler(rejectionMessage) {
    console.log(rejectionMessage);
  }

  function agentFactory() {
    return agents.map((agentObj) => (
      <Agent
        key={agentObj.agentId}
        agentObj={agentObj}
        agents={agents}
        setAgents={setAgents}
      />
    ));
  }

  return <>{agentFactory()}</>;
}

export default Agents;

{
  /* <div>
      <Routes>
        <Route path="/add-agent" element={AddAgent}></Route>

        {AgentFactory()}

        <Route path="/delete-agent" element={Agent}></Route>
        <Route path="/edit-agent" element={EditAgent}></Route>
      </Routes>
    </div> */
}
