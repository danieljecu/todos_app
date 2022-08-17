import React from "react";
import { useCurrentUser } from "./context/auth";

const AuthenticatedAppRouter = React.lazy(
  () => import("./routers/authenticated.router")
);
const UnauthenticatedAppRouter = React.lazy(
  () => import("./routers/unauthenticated.router")
);
// import dummyProjects from "dummydata/dummy";

function App() {
  const auth = useCurrentUser(); //{ auth, accessToken, logout, login, register }

  if (!auth.user) {
    return (
      <UnauthenticatedAppRouter login={auth.login} register={auth.register} />
    );
  }

  return <AuthenticatedAppRouter user={auth.user} logout={auth.logout} />;
}

export default App;
