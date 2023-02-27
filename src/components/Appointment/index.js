import React, { useEffect } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }

  }, [mode, transition, props.interview])
 

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
        )}
        {mode === CREATE &&
      <Form
        name={props.name}
        value={props.value}
        interviewers={props.interviewers}
        onCancel={back}
      />
        }  
    </article>
  );
}