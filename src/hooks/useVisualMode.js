import React, {useState} from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) { // newMode = SECOND
    
    if (replace) {
      setHistory((cs) => {
        return cs.slice(0, cs.length - 1).concat(newMode)
      });
    } else {
      setHistory((cs) => { //currentState [FIRST]
        return cs.concat(newMode); // currentState [FIRST,SECOND]
      });
    }
    setMode(newMode); //mode = SECOND
  }
  
  function back(){
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory((cs) => {
        return cs.slice(0, cs.length - 1)
      })
    }
  }
  
  return { mode, transition, back };
}