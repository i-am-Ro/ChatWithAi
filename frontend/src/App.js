import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";    
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/project/:projectId" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
