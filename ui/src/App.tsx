import React from "react";
import { useCurrentUser } from "./context/auth";

const UnauthenticatedApp = React.lazy(
  () => import("./routers/unauthenticated.router")
);
const AuthenticatedApp = React.lazy(
  () => import("./routers/authenticated.router")
);

// import RouterBreadcrumbs from "components/Header/ProjectsNav";
// import dummyProjects from "dummydata/dummy";

function App() {
  const { auth } = useCurrentUser();

  if (!auth) {
    // !user :this can be the actual user or null
    return <UnauthenticatedApp />;
  }

  return <AuthenticatedApp />;
}

export default App;
