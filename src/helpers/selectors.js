export function getAppointmentsForDay(state, day) {
let appointmentArr = []
state.days.map(dayObject => {
  if(dayObject.name === day) {
    dayObject.appointments.forEach(apptId =>appointmentArr.push(state.appointments))
  }
  console.log("dayObject.name&&&&&&", dayObject.name)
  console.log("appointmentArr*****", appointmentArr)
})
return (state.appointments, appointmentArr);
}
//(state.appointments[apptId])