import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAgent() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [heightInInches, setHeightInInches] = useState(0);

  let navigate = useNavigate();

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleMiddleName(e) {
    setMiddleName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleDOB(e) {
    setDOB(e.target.value);
  }

  function handleHeightInInches(e) {
    setHeightInInches(parseInt(e.target.value));
  }

  function addNewAgentToState(newAgentObject) {
    props.setAgents([...props.agents, newAgentObject]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newAgent = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      dob: dob,
      heightInInches: heightInInches,
    };

    fetch("http://localhost:8080/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAgent),
    })
      .then((response) => {
        alert(response.statusText + " agent!");
        navigate("/agents");
      })
      .then((newAgentObj) => addNewAgentToState(newAgentObj))
      .catch((rejection) => console.log("Failure! ", rejection));
  }

  return (
    <>
      <h2>Add a new agent</h2>

      <form onSubmit={handleSubmit}>
        <label forHtml="firstName">First Name:</label>
        <br />
        <input onChange={handleFirstName} id="firstName"></input>
        <br />
        <br />

        <label forHtml="middleName">Middle Initial:</label>
        <br />
        <input onChange={handleMiddleName} id="middleName"></input>
        <br />
        <br />

        <label forHtml="lastName">Last Name:</label>
        <br />
        <input onChange={handleLastName} id="lastName"></input>
        <br />
        <br />

        <label forHtml="dob">DOB (YYYY-MM-DD):</label>
        <br />
        <input onChange={handleDOB} id="dob"></input>
        <br />
        <br />

        <label forHtml="heightInInches">Height (inches):</label>
        <br />
        <input onChange={handleHeightInInches} id="heightInInches"></input>
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
      <hr />
    </>
    /*
Form
firstName
middleName
lastName
dob
heightInInches
handlers for every time fields change
save changed data to state for each field
handler for form submit
Want to send data as post fetch request to API
  */
  );
}

export default AddAgent;
