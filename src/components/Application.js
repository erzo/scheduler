import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import useApplicationData from "../hooks/useApplicationData";

import "components/Application.scss";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Logan Wolverine",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Steve Rogers",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   }
// ];

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateInterview,
    copyDays,
    addsToSpots,
    editDays
  } = useApplicationData();


  const setAppointments = getAppointmentsForDay(state, state.day);
  const setInterviewers = getInterviewersForDay(state, state.day);
  
  // console.log("im here: ", setAppointments);

  let schedule = setAppointments.map((appointment) => {
    const setInterview = getInterview(state, appointment.interview);
    return(<Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={setInterview}
      interviewers={setInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      updateInterview={updateInterview}
      copyDays={copyDays}
      addsToSpots={addsToSpots}
      editDays={editDays}
    />)
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png"
        alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment 
        key="last" 
        time="5pm" 
        bookInterview={bookInterview} />
      </section>
    </main>
  );
}