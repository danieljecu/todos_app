import React from "react";
import { Login } from "../pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { NAVIGATION_ROUTES } from "../constants/navigation";
import { AxiosResponse } from "axios";
import { IUserSession } from "interfaces/users";

//Unlike the <Switch> API in v5, all <Route path> and <Link to> values under v6's <Routes>
//element are automatically relative to the parent route that rendered them

interface UserCredentialsFormDataType {
  email: string;
  password: string;
}
interface UnauthenticatedAppRouterProps {
  login: (
    formData: UserCredentialsFormDataType
  ) => Promise<AxiosResponse<IUserSession>>;
  register: (
    formData: UserCredentialsFormDataType
  ) => Promise<AxiosResponse<IUserSession>>;
}

const UnauthenticatedAppRouter = ({
  login,
  register,
}: UnauthenticatedAppRouterProps) => (
  <BrowserRouter>
    <Header />
    <p style={{ display: "flex", justifyContent: "center" }}>
      Not Loged In Yet ? - homepage is in construction :), but you can login or
      register
    </p>
    <Routes>
      <Route
        path={NAVIGATION_ROUTES.HOME}
        element={<Login login={login} register={register} />}
      />
      <Route
        path={NAVIGATION_ROUTES.LOGIN}
        element={<Login login={login} register={register} />}
      />
    </Routes>
  </BrowserRouter>
);

export default UnauthenticatedAppRouter;
