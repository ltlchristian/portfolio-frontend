import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProjectList from "./pages/ProjectList";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";

import SignupPage from "./pages/Auth/Signup";
import LoginPage from "./pages/Auth/Login";
import NavBar from "./components/Navbar";
import Admin from "./pages/Admin";

function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const hasJwt = localStorage.getItem("jwt"); // EzbBlablablalba
    setConnected(Boolean(hasJwt)); // on convertit en booléen
  }, []);

  return (
    <div className="App">
      <NavBar connected={connected} setConnected={setConnected}/>
      <Routes>
        <Route path="/" element={<Home connected={connected} />} />
        <Route path="/project" element={<ProjectList />} />
        <Route path="/project/create" element={<CreateProject connected={connected} />} />
        <Route path="/project/:idProject" element={<ProjectDetail />} />
        <Route
        path="/login"
        element={
          <LoginPage connected={connected} setConnected={setConnected} />
        }
        />
        <Route
        path="/signup"
        element={<SignupPage connected={connected} />}
        />
        <Route path="/admin" element={<Admin connected={connected} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
