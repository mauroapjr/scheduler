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
        days: response[0]?.data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
      console.log("DAYS", response);
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const spotUpdate = updateSpots(
        state.day,
        state.days,
        "REMOVE_SPOT",
        id,
        state.appointments
      );
      console.log("SPOTS", spotUpdate);
      setState({ ...state, days: spotUpdate, appointments });
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const spotUpdate = updateSpots(
        state.day,
        state.days,
        "ADD_SPOT",
        id,
        state.appointments
      );
      setState({ ...state, days: spotUpdate });
    });
  }

  const spotUpdate = (weekday, day, variable, id, appointments) => {
    let spot = day.spots;

    if (
      weekday === day.name &&
      variable === "REMOVE_SPOTS" &&
      appointments[id].interview !== null
    ) {
      return spot;
    }
    if (
      weekday === day.name &&
      variable === "REMOVE_SPOT" &&
      appointments[id].interview === null
    ) {
      return spot - 1;
    }
    if (
      weekday === day.name &&
      variable === "ADD_SPOT" &&
      appointments[id].interview !== null
    ) {
      return spot + 1;
    }
    return spot;
  };

  const updateSpots = (weekday, days, variable, id, appointments) => {
    console.log("ALL SPOTS", weekday, days, variable, id, appointments);
    console.log("variable", variable);
    if (variable === "REMOVE_SPOT") {
      console.log("HERE");
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable, id, appointments),
        };
      });
      console.log("updatedStateDayArray", updatedStateDayArray);
      return updatedStateDayArray;
    }

    if (variable === "ADD_SPOT") {
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable, id, appointments),
        };
      });
      return updatedStateDayArray;
    }
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
