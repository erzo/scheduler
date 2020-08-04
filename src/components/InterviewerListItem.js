import React from "react";

import classnames from 'classnames';

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  const interviewerName = (props) => {
    if (props.selected) {
      return props.name
    }
  }

  return (
    <li className={interviewerClass}>
    <img
    className={"interviewers__item-image"}
    src={props.avatar}
    onClick={() => props.setInterviewer(props.name)}
    alt={props.name}
    />
    {interviewerName(props)}
    </li>
  )
}