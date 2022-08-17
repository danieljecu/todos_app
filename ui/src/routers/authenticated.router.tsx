import { Home } from "pages";
import Header from "components/layout/navigation/header-bar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { NAVIGATION_ROUTES } from "../constants/navigation";

import { TasklistsView } from "../pages/Home/TasklistsView";
import { TasksView } from "../pages/Home/TasksView";

import { IUserDetails } from "interfaces";

interface AuthenticatedAppRouterProps {
  user: IUserDetails;
  logout: () => void;
}
const AuthenticatedAppRouter = ({
  user,
  logout,
}: AuthenticatedAppRouterProps) => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path={NAVIGATION_ROUTES.HOME} element={<Home />} />
        <Route
          path={NAVIGATION_ROUTES.LOGIN}
          element={<Navigate to={NAVIGATION_ROUTES.HOME} />}
        />
        <Route
          path="/project/:projectId/tasklist/:id"
          element={<TasklistsView />}
        />
        <Route path="/project/:projectId" element={<TasklistsView />} />

        <Route path="/tasklist/:tasklistId" element={<TasksView />} />
        <Route path="/tasklist/:tasklistId/task/:id" element={<TasksView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthenticatedAppRouter;
