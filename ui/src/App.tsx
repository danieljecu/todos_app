import React from "react";
import { useCurrentUser } from "./context/auth";
// import AuthenticatedAppRouter from "./routers/authenticated.router";

const AuthenticatedAppRouter = React.lazy(
  () => import("./routers/authenticated.router")
);
const UnauthenticatedAppRouter = React.lazy(
  () => import("./routers/unauthenticated.router")
);
// import RouterBreadcrumbs from "components/Header/ProjectsNav";
// import dummyProjects from "dummydata/dummy";

function App() {
  const auth = useCurrentUser(); //{ auth, accessToken, logout, login, register }

  if (!auth.auth) {
    // !user :this can be the actual user or null
    return (
      <UnauthenticatedAppRouter login={auth.login} register={auth.register} />
    );
  }

  return <AuthenticatedAppRouter user={auth.user} logout={auth.logout} />;
}

export default App;
