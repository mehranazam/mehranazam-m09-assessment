import { useState } from "react";

function EditAgent(props) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [height, setHeight] = useState("");

  function editFormShow() {
    let editForm = document.querySelector("#edit-form");
    if (editForm.classList.contains("hidden")) {
      editForm.classList.remove("hidden");
    } else {
      editForm.classList.add("hidden");
    }
  }
  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleMiddleNameChange(event) {
    setMiddleName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleDOBChange(event) {
    setDOB(event.target.value);
  }

  function handleHeightChange(event) {
    setHeight(event.target.value);
  }

  function replaceAgent(agentObj) {
    let filteredAgents = props.agents.filter(
      (agent) => agent.agentId !== agentObj.agentId
    );
    props.setAgents([agentObj, ...filteredAgents]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let agentCopy = { ...props.agentObj };
    agentCopy.firstName = firstName;
    agentCopy.middleName = middleName;
    agentCopy.lastName = lastName;
    agentCopy.dob = dob;
    agentCopy.height = height;

    fetch("http://localhost:8080/api/agent/" + agentCopy.agentId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentCopy),
    })
      .then((response) =>
        response.ok
          ? replaceAgent(agentCopy)
          : alert("Something went wrong!" + response)
      )
      .catch((rejection) => alert(rejection));
    editFormShow();
  }

  return (
    <>
      <form id="edit-form" className="hidden" onSubmit={handleSubmit}>
        <label for="first-name">First Name:</label>
        <br />
        <br />
        <input onChange={handleFirstNameChange} id="first-name"></input>
        <br />
        <br />
        <label for="middle-name">Middle Initial:</label>
        <br />
        <br />
        <input onChange={handleMiddleNameChange} id="middle-name"></input>
        <br />
        <br />
        <label for="last-name">Last Name:</label>
        <br />
        <br />
        <input onChange={handleLastNameChange} id="last-name"></input>
        <br />
        <br />
        <label for="dob">DOB:</label>
        <br />
        <br />
        <input onChange={handleDOBChange} id="dob"></input>
        <br />
        <br />
        <label for="height">Height:</label>
        <br />
        <br />
        <input onChange={handleHeightChange} id="height"></input>
        <br />
        <button>Submit</button>
      </form>
      <button onClick={editFormShow}>Edit</button>
    </>
  );
}

export default EditAgent;
