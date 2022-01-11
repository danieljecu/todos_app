import React from "react";
import { Login } from "../pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { NAVIGATION_ROUTES } from "../constants/navigation";

//Unlike the <Switch> API in v5, all <Route path> and <Link to> values under v6's <Routes>
//element are automatically relative to the parent route that rendered them

const AuthRouter: React.FC = () => (
  <BrowserRouter>
    <Header /> Not Loged In
    <Routes>
      <Route path={NAVIGATION_ROUTES.LOGIN} element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default AuthRouter;
