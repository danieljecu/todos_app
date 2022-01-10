import React from "react";
import {Login} from "../pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const AuthRouter: React.FC<{}> = ({}) => <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}/>
    </Routes>
</BrowserRouter>

export default AuthRouter
