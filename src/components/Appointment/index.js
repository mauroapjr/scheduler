import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "components/Appointment/Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // useEffect(() => {
  //   if (props.interview === EMPTY) {
  //     transition(SHOW);
  //   }
  //   if (!props.interview === SHOW) {
  //     transition(EMPTY);
  //   }
  // }, [mode, transition, props.interview]);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function remove() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onSave={save}
          onCancel={back}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message="Could not save your appointment" onClose={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error message="Could not delete your appointment" onClose={back} />
      )}

      {mode === CONFIRM && <Confirm onConfirm={remove} onCancel={back} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}
