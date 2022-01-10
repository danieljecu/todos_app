import React from "react";

const AuthRouter = React.lazy(() => import('./routers/authentication.router'));
const AppRouter = React.lazy(() => import('./routers/app.router'));

function App() {
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return <AuthRouter/>
    }

    return <AppRouter/>
}

export default App;
