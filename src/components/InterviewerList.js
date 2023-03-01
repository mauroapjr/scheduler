import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

const interviewers = props.interviewers.map(interviewerObj => {
  //console.log("INTERVIEWERS", interviewers)
  
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  return (
    <InterviewerListItem
    key={interviewerObj.id}
    name={interviewerObj.name}
    avatar={interviewerObj.avatar}
    selected={interviewerObj.id === props.value}
    setInterviewer={() => props.onChange(interviewerObj.id)} 
    />
  )
})
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
