export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];
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

  return {
    student: interview.student,
    interviewer: interviewerInfo,
  };
}

export function getInterviewersForDay(state, day) {
  let interviewersObj = state.days.find((dayObject) => dayObject.name === day);
  if (!interviewersObj) {
    return [];
  }
  return interviewersObj.interviewers.map((id) => state.interviewers[id]);
}
