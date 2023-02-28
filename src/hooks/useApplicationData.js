import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  //const dailyAppointments = getAppointmentsForDay(state, state.day);
  //const interviewers = getInterviewersForDay(state, state.day);

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
        appointments: response[1].data, // spots available are here
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
      setState({ ...state, appointments });
    });
  }
  function countSpots(appointments) {
    let interviewCount = 0;
    for (const key in appointments) {
      if (appointments[key].interview === null) {
        interviewCount++;
      }
    }
    console.log("interviewCount", interviewCount);
  }
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments });
      //console.log("CANCEL", cancel);
    });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
