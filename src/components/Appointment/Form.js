import React, { useState } from 'react';

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  
  const reset = () => {
    setName(prevState => {
    return "";
    });
    setInterviewer(prevState => {
      return null;
    });
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  function validate() {
    if (name === "" || interviewer === null) {
      setError("student name or interviewer cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
  }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => 
              setName(event.target.value)
            }
            // onSubmit={event => event.preventDefault()}
            data-testid="student-name-input"
            /*
              This must be a controlled component
            */
          />
        </form>

        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers} 
          value={interviewer} 
          setInterviewer={setInterviewer} 
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={event => cancel()}>Cancel</Button>
          <Button confirm 
          onClick={
            // event => props.onSave(name, interviewer)
            validate
            }>Save
            </Button>
        </section>
      </section>
    </main>
  )
}