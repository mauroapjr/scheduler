export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];
  //console.log("STATE<DAYS", state);
  if (state.days) {
    state.days.forEach((dayObject) => {
      if (dayObject.name === day) {
        dayObject.appointments.forEach((apptId) =>
          appointmentArr.push(state.appointments[apptId])
        );
      }
    });
  }
  return appointmentArr;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer];
  // console.log("interview.student $$$$$$", interview.student)
  // console.log("interviewerInfo*****", interviewerInfo)
  return {
    student: interview.student,
    interviewer: interviewerInfo,
  };
}

export function getInterviewersForDay(state, day) {
  console.log("STATE", state);
  let interviewersObj = state.days.find((dayObject) => dayObject.name === day);
  if (!interviewersObj) {

    return [];
  }
  return interviewersObj.interviewers.map((id) => state.interviewers[id]);
}
