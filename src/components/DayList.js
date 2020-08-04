import React from "react";
import DayListItem from "components/DayListItem";

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
    <ul>
      { daysList }
    </ul>
  );
}
