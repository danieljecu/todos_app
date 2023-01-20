import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { AppProvider } from "./providers/app-provider";
import { rest } from "msw";
import { server } from "test/mocks/server";

// it renders the unauthenticated page
// test register
// test login -> it renders the authenticated page
// test create a project_id
// test create a tasklist
// test create a task
// edit a task
/////test edit a task_id description or status
/////test edit a task_id task_list_id
// delete a task
// delete a tasklist
// delete a project_id

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders learn react link", () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  const linkElement = screen.getByText(/TodoApp/i);
  expect(linkElement).toBeInTheDocument();
});
