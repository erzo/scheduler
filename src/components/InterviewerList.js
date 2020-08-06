import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  let interviewerList = "";

  if(Array.isArray(props.interviewers)) {
    interviewerList = props.interviewers.map(interviewer => (
      <InterviewerListItem
        id={interviewer.id}
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.interviewer === interviewer.id ? true : false}
        setInterviewer={props.setInterviewer}
        // setInterviewer={props.onChange}
        />
      ))
    // console.log(interviewerList);
  }
  

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className={"interviewers__list"}>
      { interviewerList }
      </ul>
    </section>
  );
}
