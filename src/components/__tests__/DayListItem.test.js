import React from "react";

import { render, cleanup } from "@testing-library/react";

import DayListItem from "components/DayListItem";

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
  const {container, debug } = render(<DayListItem />);
  debug();

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  // 3. Click the "Delete" button on the booked appointment.
  fireEvent.click(getByText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.
  // 6. Check that the element with the text "Deleting" is displayed.
  // 7. Wait until the element with the "Add" button is displayed.
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
});