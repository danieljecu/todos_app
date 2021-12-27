import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

/*
/projects
/projects/:projectId/taskslist // taskslists
/projects/:projectId/taskslist/ ;tasklistId // task?tasklistId=2


/scratchpad
/due-date-view
/progress-view



*/
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
