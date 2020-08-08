import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "Could not cancel appointment.";
const ERROR_SAVE = "Could not save appointment.";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(res => {
      props.copyDays(props.id, interview);
      transition(SHOW);
    })
    .catch(error => {
      transition(ERROR_SAVE, true)
      console.log(error);
    })
  }

  function deleteAction() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(()=>{
      props.updateInterview(props.id);
      transition(EMPTY);
    })
    .catch(error => {
      transition(ERROR_DELETE, true)
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
          onEdit={()=> {
            transition(EDIT)}}
          />
      )}

      {mode === CREATE && 
        <Form 
        interviewers={props.interviewers} 
        onCancel={(() => back())}
        onSave={save}
      />}

      {mode === CONFIRM && 
      <Confirm 
        onCancel={()=>{
          back();
        }}
        onConfirm={()=>{
          deleteAction();
        }}
        message={"ARE YOU SURE YOU WANT TO DELETE?"}
      />}

      {mode === EDIT && 
      <Form
        onSave={save}
        
        onCancel={()=> {
          back();
        }}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
      />}

      {mode === SAVING && <Status message={"SAVING"}/>}

      {mode === DELETE && <Status message={"DELETING"}/>}

      {mode === ERROR_SAVE && 
      <Error 
        message={ERROR_SAVE}
        onClose={() => back()}
      />}
      {mode === ERROR_DELETE && 
      <Error 
        message={ERROR_DELETE}
        onClose={() => back()}
      />}
    </article>
  )
}