import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const schedule = props.days.map(dayObj => {
    console.log("DAY OBJ", dayObj);
    return (
      <DayListItem
        key={dayObj.id}
        name={dayObj.name}
        spots={dayObj.spots}
        selected={dayObj.name === props.value}
        setDay={props.onChange}
        {...dayObj}
      />
    )
  })
  return (
    <ul>
      {schedule}
    </ul>
  );
}
