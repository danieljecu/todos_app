import { Home } from "pages";
import Header from "components/Header";
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
      {!user && <div>loading user is null</div>}
      {user?.email || "not email"}
      {user?.first_name || "not firstName"} {user?.last_name || "not lastName"}
      <button type="button" onClick={() => logout()}>
        loggout
      </button>
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
