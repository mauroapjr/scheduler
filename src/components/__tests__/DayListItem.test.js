import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  getByText,
  getByAltText,
  getAllByTestId,
  queryByText,
  queryByAltText,
  getByPlaceholderText,
  fireEvent,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import DayListItem from "components/DayListItem";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<DayListItem />);
});

it("renders 'no spots remaining' when there are 0 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={0} />);
  expect(getByText("no spots remaining")).toBeInTheDocument();
});

it("renders '1 spot remaining' when there is 1 spot", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={1} />);
  expect(getByText("1 spot remaining")).toBeInTheDocument();
});

it("renders '2 spots remaining' when there are 2 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={2} />);
  expect(getByText("2 spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    (appointment) => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
  //expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));
  //fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  debug();
  //console.log(prettyDOM());
  console.log(prettyDOM(container));
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    (appointment) => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. We change the name and save the interview.
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });
  fireEvent.click(getByText(appointment, "Save"));

  // 5. We don't want the spots to change for "Monday", since this is an edit.
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  console.log(prettyDOM(container));
});

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
  // 1. render the application.
  const { container, debug } = render(<Application />);

  // 2. Wait for "Archie Cohen"
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click add button
  const appointment = getAllByTestId(container, "appointment").find(
    (appointment) => queryByAltText(appointment, "Add")
  );

  fireEvent.click(queryByAltText(appointment, "Add"));

  // 4. Enter name "Lydia Miller-Jones" into input
  fireEvent.change(getByPlaceholderText(container, "Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" },
  });

  // 5. click on interviewer
  fireEvent.click(getByAltText(container, "Sylvia Palmer"));

  // 6. save
  fireEvent.click(getByText(container, "Save"));

  // 7. Show saving status
  expect(getByText(container, "Saving")).toBeInTheDocument();

  // 8. check error message is displayed
  await waitForElement(() => getByText(appointment, "Error"));
  expect(
    getByText(appointment, "Could not deleted appointment")
  ).toBeInTheDocument();

  debug();
  console.log(prettyDOM(container));
});

it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();
  //   // 1. render the application.
  const { container, debug } = render(<Application />);

  //   // 2. Wait for "Archie Cohen"
  await waitForElement(() => getByText(container, "Archie Cohen"));

  //   // 3. Click delete button
  const appointment = getAllByTestId(container, "appointment").find(
    (appointment) => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(queryByAltText(appointment, "Delete"));

  //   // 4. wait for confirm and click
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

  fireEvent.click(getByText(appointment, "Confirm"));

  // wait for deleting msg
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  //   // 5. mock err
  await waitForElement(() => getByText(container, "Error"));
  expect(
    getByText(container, "Could not deleted appointment")
  ).toBeInTheDocument();

  //   // 6. check for err msg
  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  debug();
  console.log(prettyDOM(container));
});
