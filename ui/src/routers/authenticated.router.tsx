import { Home } from "pages";
import Header from "components/Header";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../constants/navigation";

import { TasklistsView } from "../pages/Home/TasklistsView";
import { TasksView } from "../pages/Home/TasksView";

const AuthenticatedAppRouter: React.FC = () => (
  <BrowserRouter>
    <Header />
    {/* <Layout> */}
    <Routes>
      <Route path={NAVIGATION_ROUTES.HOME} element={<Home />} />
      <Route
        path="/project/:projectId/tasklist/:id"
        element={<TasklistsView />}
      />
      <Route path="/project/:projectId" element={<TasklistsView />} />

      <Route path="/tasklist/:tasklistId" element={<TasksView />} />
      <Route path="/tasklist/:tasklistId/task/:id" element={<TasksView />} />
    </Routes>
    {/* </Layout> */}
  </BrowserRouter>
);

export default AuthenticatedAppRouter;