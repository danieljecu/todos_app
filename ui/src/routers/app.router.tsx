import {Home} from "./../pages";
import Header from "./../components/Header";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { NAVIGATION_ROUTES } from "../constants/navigation";

interface UserStatusProps {
    auth?: boolean;
  }

//TODO Header will be replaced with <LogedInHeader/>  
const AppRouter: React.FC<UserStatusProps> = () => <BrowserRouter>
    <Header />
    <Routes>
        <Route path={NAVIGATION_ROUTES.HOME} element={<Home/>}/>
    </Routes>
</BrowserRouter>

export default AppRouter
