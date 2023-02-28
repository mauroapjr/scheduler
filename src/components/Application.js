import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import save from "components/Appointment/index";

import "components/Application.scss";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((response) => {
      setState((prevState) => ({
        ...prevState,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments});
    });
  }

  // function cancelInterview(id, interview) {
  //   const cancel = {
  //     ...state.appointments[id],
  //     interview: { ...interview },
  //   };
  //   return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
  //     setState({ ...state, cancel, interview: null});
  //     console.log("CANCEL", cancel);
  //   });
  // }

  
  //console.log("interviewers", interviewers);

  const appointment = dailyAppointments.map((appointmentsObj) => {
    //console.log("APPOINT.OBJ$$$$$$", appointmentsObj);
    const interview = getInterview(state, appointmentsObj.interview);
    return (
      <Appointment
        key={appointmentsObj.id}
        {...appointmentsObj}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        //cancelInterview={cancelInterview}
      />
    );
  });

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
            onSave={save}
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
