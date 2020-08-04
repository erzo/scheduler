import React from "react";

import classnames from 'classnames';

// import "components/DayListItem.scss";

export default function DayList(props) {

  let daysList = "";

  if(Array.isArray(props.days)) {
    daysList = props.days.map(day => (
      <DayListItem
        key= {day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
        />
      ))
    // console.log(daysList);
  }
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
