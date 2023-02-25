export function getAppointmentsForDay(state, day) {
let appointmentArr = []
state.days.forEach(dayObject => {
  if(dayObject.name === day) {
    dayObject.appointments.forEach(apptId =>appointmentArr.push(state.appointments[apptId]))
  }
  // console.log("dayObject.name&&&&&&", dayObject.name)
  // console.log("appointmentArr*****", appointmentArr)
  // console.log("apptID$$$$$$",)
})
return appointmentArr;
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer];
  // console.log("interview.student $$$$$$", interview.student)
  // console.log("interviewerInfo*****", interviewerInfo)
  return{
    student: interview.student,
    interviewer: interviewerInfo
  }
}