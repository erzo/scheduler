import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  let interviewerList = "";

  if(Array.isArray(props.interviewers)) {
    interviewerList = props.interviewers.map(interviewer => (
      <InterviewerListItem
        key= {interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
        />
      ))
    // console.log(interviewerList);
  }
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className={"interviewers__list"}>
      { interviewerList }
      </ul>
    </section>
  );
}
