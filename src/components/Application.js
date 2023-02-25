import React,{ useState, useEffect }  from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";

import "components/Application.scss";
import { getAppointmentsForDay, getInterview }  from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day)
    //console.log("DAILYAPP", dailyAppointments)

    const setDay = day => setState({ ...state, day });

    const appointment = dailyAppointments.map(appointmentsObj => {
      
      const interview = getInterview(state, appointmentsObj.interview);
      //console.log("interview", interview);

      return (
        <Appointment
            key={appointmentsObj.id}
            {...appointmentsObj}
            interview={interview}
        />
      )
    })
  
  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)])
      .then(response => {
        setState(prevState => 
          ({ ...prevState, 
            days: response[0].data, 
            appointments: response[1].data,
            interviewers: response[2].data
            }));
        // console.log('RESPONSE>DAYS', response[0].data[0].id);
        // console.log('RESPONSE>APPOINTMENT', response[1].data);
        // console.log('RESPONSE>INTERVIEWER', response[2].data);
      })
  }, [])
  
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

