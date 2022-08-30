import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// test register
// test login

// test create a project_id
// test create a tasklist
// test create a task
// edit a task
/////test edit a task_id description or status
/////test edit a task_id task_list_id
// delete a task
// delete a tasklist
// delete a project_id

test("renders learn react link", () => {
  render(<App />);

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
