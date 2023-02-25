import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]); 
  
  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode((prev) => newMode)
    } else {
      setMode ((prev) => newMode);
    }
  }

  const back = () => {
   
   }




   return {mode, transition, back};
 
}
