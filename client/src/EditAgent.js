import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function EditAgent(props) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [height, setHeight] = useState("");

  const { id } = useParams();

  const [userStatus, setUserStatus] = useContext(AuthContext);

  const [toEdit, setToEdit] = useState(null);

  const navigate = useNavigate();
  /*
  function editFormShow() {
    let editForm = document.getElementById("#edit-form");
    if (editForm.classList.contains("hidden")) {
      editForm.classList.remove("hidden");
    } else {
      editForm.classList.add("hidden");
    }
  }
*/

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
          setToEdit(retrievedAgent);
        })
        .catch((rejection) => {
          console.log(rejection);
          alert("Something very bad happened...");
        });
    }
  }, []);

  function handleFirstNameChange(event) {
    let copy = { ...toEdit };
    copy.firstName = event.target.value;
    setToEdit(copy);
  }

  function handleMiddleNameChange(event) {
    let copy = { ...toEdit };
    copy.middleName = event.target.value;
    setToEdit(copy);
  }

  function handleLastNameChange(event) {
    let copy = { ...toEdit };
    copy.lastName = event.target.value;
    setToEdit(copy);
  }

  function handleDOBChange(event) {
    let copy = { ...toEdit };
    copy.dob = event.target.value;
    setToEdit(copy);
  }

  function handleHeightChange(event) {
    let copy = { ...toEdit };
    copy.heightInInches = event.target.value;
    setToEdit(copy);
  }

  function replaceAgent(agentObj) {
    let filteredAgents = props.agents.filter(
      (agent) => agent.agentId !== agentObj.agentId
    );
    props.setAgents([agentObj, ...filteredAgents]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let agentCopy = { ...toEdit };

    const jwt = localStorage.getItem("token");

    // let agentCopy = { ...props.agentObj };
    // agentCopy.firstName = firstName;
    // agentCopy.middleName = middleName;
    // agentCopy.lastName = lastName;
    // agentCopy.dob = dob;
    // agentCopy.height = height;

    fetch("http://localhost:8080/api/agent/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },

      body: JSON.stringify(agentCopy),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        } else {
          console.log(response);
          alert("update failed!");
        }
      })
      .catch((rejection) => {
        alert(rejection);
        console.log(rejection);
        // editFormShow();
      });
  }

  return (
    <>
      <form id="edit-form" className="hidden" onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name:</label>
        <br />
        <br />
        <input onChange={handleFirstNameChange} id="first-name"></input>
        <br />
        <br />
        <label htmlFor="middle-name">Middle Initial:</label>
        <br />
        <br />
        <input onChange={handleMiddleNameChange} id="middle-name"></input>
        <br />
        <br />
        <label htmlFor="last-name">Last Name:</label>
        <br />
        <br />
        <input onChange={handleLastNameChange} id="last-name"></input>
        <br />
        <br />
        <label htmlFor="dob">DOB:</label>
        <br />
        <br />
        <input onChange={handleDOBChange} id="dob"></input>
        <br />
        <br />
        <label htmlFor="height">Height:</label>
        <br />
        <br />
        <input onChange={handleHeightChange} id="height"></input>
        <br />
        <button>Submit</button>
      </form>
      {/* <button onClick={editFormShow}>Edit</button> */}
    </>
  );
}

export default EditAgent;
