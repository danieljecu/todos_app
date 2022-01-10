import {Home} from "./../pages";
import Header from "./../components/Header";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const AppRouter: React.FC<{}> = ({}) => <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<Home/>}/>
    </Routes>
</BrowserRouter>

export default AppRouter
