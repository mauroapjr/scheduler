import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getAllByTestId,
  getByText,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";
import Application from "components/Application";
import { prettyDOM } from "@testing-library/dom";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    debug();
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    console.log(prettyDOM(day));
    //console.log(prettyDOM(appointment));
  });
});

//   const { container, debug } = render(<Application />);

//   await waitForElement(() => getByText(container, "Archie Cohen"));
//   const appointments = getAllByTestId(container, "schedule");
//     console.log("APPPOINTMENT", appointments)
//   fireEvent.click(getByAltText(container, "Add"));

//     const studentNameField = await waitForElement(() => getByPlaceholderText("Enter Student Name"))

//     debug();
//     expect(getByText("Leopold Silvers")).toBeInTheDocument();

// });

// it("changes the schedule when a new day is selected", async () => {
//   const { getByText } = render(<Application />);

//   await waitForElement(() => getByText("Monday"));

//   fireEvent.click(getByText("Tuesday"));

//   expect(getByText("Leopold Silvers")).toBeInTheDocument();
// });

// async function run() {
//   /* We want to halt execution of this function until this Promise is resolved */
//   const data = await setTimeoutPromise();

//   /* The resolved behaves like a return value when we use await */
//   console.log(`Promise Resolved with ${data}`);
// }

// run();

// async function run() {
//   console.log("1. The calm before async");

//   try {
//     const data = await setTimeoutPromise();

//     console.log(`3. Promise Resolved with ${data}`);
//   } catch (error) {
//     /* A thrown error will be caught by the try/catch */
//     console.log(`3. Promise Rejected with ${error}`);
//   }
// }

// run();

// async function run() {
//   console.log("1. The calm before async");

//   try {
//     const data = await setTimeoutPromise();

//     console.log(`3. Promise Resolved with ${data}`);
//   } catch (error) {
//     console.log(`3. Promise Rejected with ${error}`);
//   }
// }

// /* We can invoke the async function like any other */
// run().then(() => {
//   console.log("4. Use Pomises at the top level");
// });

// /* This prints immediately after run() is called */
// console.log("2. Careful, this prints before the timeout is complete");

// /*
// 1. The calm before async
// 2. Careful, this prints before completing the timeout
// 3. Promise Resolved with Resolved Data
// 4. Use Promises at the top level
// */

// We will mock the functions we use from the axios library.
// We will write a test to confirm that the scheduler can load data.
// We will write an asynchronous test that waits for a component
// to update before proceeding.
// We will use containers to find specific DOM nodes.
// We will chain promises to handle asynchronous testing.
// We will override mock implementations for specific tests.
// We will use setup and teardown functions
// provided by Jest to perform common tasks.
