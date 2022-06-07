import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProjectList from "./pages/ProjectList";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";

import SignupPage from "./pages/Auth/Signup";
import LoginPage from "./pages/Auth/Login";
import NavBar from "./components/Navbar";
import Admin from "./pages/Admin";

function App() {
  const { connected } = useAuth();

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/project" element={<ProjectList/>} />
        {connected && <Route path="/project/create" element={<CreateProject/>} />}
        {!connected && <Route path="/project/:idProject" element={<ProjectDetail/>} />}
        {connected && <Route path="/project/:idProject" element={<EditProject/>} />}
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        {connected && <Route path="/admin" element={<Admin/>} />}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
