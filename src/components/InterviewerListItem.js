import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  
  let interviewerStyles = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  
  let imageStyles = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  });

return (
  <li 
    className={interviewerStyles} 
    onClick={props.setInterviewer}
  >
    <img
      className={imageStyles}
      src={props.avatar}
      alt={props.name} 
    />
    {props.selected && props.name}
  </li>
  );
}
