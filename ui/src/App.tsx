import React from "react";
import { useCurrentUser } from "./contexts/auth";

const ProtectedRouter = React.lazy(() => import("./routers/protected.router"));
const PublicRouter = React.lazy(() => import("./routers/public.router"));
// import dummyProjects from "dummydata/dummy";

function App() {
  const auth = useCurrentUser(); //{ auth, accessToken, logout, login, register }

  return !auth.user ? (
    <PublicRouter login={auth.login} register={auth.register} />
  ) : (
    <ProtectedRouter user={auth.user} logout={auth.logout} />
  );
}

export default App;
