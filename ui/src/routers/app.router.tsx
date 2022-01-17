import { Home } from "pages";
import Header from "components/Header";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../constants/navigation";

import { TasklistsView } from "../pages/Home/TasklistsView";

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={NAVIGATION_ROUTES.HOME} element={<Home />} />
      <Route
        path="/project/:projectId/tasklist/:id"
        element={<TasklistsView />}
      />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;