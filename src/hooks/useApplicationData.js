import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData (props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ])
    .then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }))
    })
  }, [])


  /* ------ books interview for the day  --------*/
  function bookInterview(id, interview, editFlag) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(res => {
      if(editFlag){
      editDays(id, interview);
      } else {
      copyDays(id, interview);
      }
    })

  }

  /* ------ reduces the spots for the specific  day  --------*/
  const copyDays = function(id,interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const daysCopy = [];
    for (let element of state.days) {
      daysCopy.push(element);
      if (element.name === state.day) {
        daysCopy[daysCopy.indexOf(element)].spots -=1;
      }
      setState({
        ...state, 
        days: daysCopy,
        appointments
      })
    }
  }

/* ------ edits the appointment for specific day  --------*/
  const editDays = function(id,interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const daysCopy = [];
    for (let element of state.days) {
      daysCopy.push(element);
      setState({
        ...state, 
        days: daysCopy,
        appointments
      })
    }
  }

  /* ------ adds to the spots for the specific  day  --------*/
  const addsToSpots = function(id,interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const daysCopy = [];
    for (let element of state.days) {
      daysCopy.push(element);
      if (element.name === state.day) {
        daysCopy[daysCopy.indexOf(element)].spots +=1;
      }
      setState({
        ...state, 
        days: daysCopy,
        appointments
      })
    }
  }

  /* ------ cancels interview for specific time  --------*/
  function cancelInterview(id) {
    
    return axios.delete(`/api/appointments/${id}`)
    .then(()=>{
      updateInterview(id);
      addsToSpots(id);
    })
  }
  
  function updateInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });

  }
  
  return {state,
    setDay,
    bookInterview, 
    cancelInterview, 
    updateInterview,
    copyDays,
    addsToSpots,
    editDays
  }
}