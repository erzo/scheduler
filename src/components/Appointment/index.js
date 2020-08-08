import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props.bookInterview(props.id, interview)
    .then(res => {
      transition(SHOW);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function deleteAction() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  
  return(
    <article className="appointment">
    <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={()=>{
          transition(CONFIRM)}}
        />
        )}
      {mode === CREATE && 
      <Form 
      interviewers={props.interviewers} 
      onCancel={(() => back())}
      onSave={save}
      />}
      {mode === CONFIRM && <Confirm 
      onCancel={()=>{
        back();
      }}
      onConfirm={()=>{
        deleteAction();
      }}
      message={"ARE YOU SURE YOU WANT TO DELETE?"}/>}
      {mode === SAVING && <Status message={"SAVING"}/>}
      {mode === DELETE && <Status message={"DELETING"}/>}
    </article>
  )
}