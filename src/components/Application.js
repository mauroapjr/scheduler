import React,{ useState, useEffect }  from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";

import "components/Application.scss";
import { getAppointmentsForDay }  from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  
  const setDay = day => setState({ ...state, day });
  
  const appointment = Object.values(dailyAppointments).map(appointmentsObj => {
    return (
      <Appointment
          key={appointmentsObj.id}
          {...appointmentsObj}
      />
  )
})
  
  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = `http://localhost:8001/api/appointments`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL)])
      .then(response => {
        setState(prevState => ({ ...prevState, days: response[0].data, appointments: response[0].data[0].id}));
        console.log('RESPONSE>0<ID', response[0].data[0].id);
        console.log('RESPONSE', response)
      })
  }, [])
//[0].data[2]

  return (    
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
          days={state.days} 
          day={state.day} 
          onChange={setDay} 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" 
        />
      </section>
    </main>
  );
}

