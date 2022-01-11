import React from "react";
import { useCurrentUser } from "./context/auth";

const AuthRouter = React.lazy(() => import("./routers/authentication.router"));
const AppRouter = React.lazy(() => import("./routers/app.router"));

function App() {
  const { auth } = useCurrentUser();

  if (!auth) {
    return <AuthRouter />;
  }

  return <AppRouter />;
}

export default App;
