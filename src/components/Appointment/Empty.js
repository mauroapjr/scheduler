import React from "react";
import 'components/Appointment/styles.scss';

export default function Empty(props) {
  return (
    <main classname="appointment__add">
      <img 
        className="appointment__add-button" 
        src="images/add.png" 
        alt="Add" 
        onClick={props.onAdd}
      />
    </main>
  );
}
