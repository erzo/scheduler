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
      // console.log("interviewer: ", all[2].data); < -- fixed aug/11
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }))
    })
  }, [])

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    // setState({
    //   ...state,
    //   appointments
    // });
    
    return axios.put(`/api/appointments/${id}`, appointment)

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
    // setState({
    //   ...state,
    //   appointments
    // });
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
      // return setState({
      //   ...state,
      //   appointments
      // });
    }
  }


  const editDays = function(id,interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({
    //   ...state,
    //   appointments
    // });
    const daysCopy = [];
    for (let element of state.days) {
      daysCopy.push(element);
      setState({
        ...state, 
        days: daysCopy,
        appointments
      })
      // return setState({
      //   ...state,
      //   appointments
      // });
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
    // setState({
    //   ...state,
    //   appointments
    // });
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
      // return setState({
      //   ...state,
      //   appointments
      // });
    }
  }

  function cancelInterview(id) {
    
    return axios.delete(`/api/appointments/${id}`)
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