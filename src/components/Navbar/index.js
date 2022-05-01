import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";

export default function NavBar({ connected, setConnected }) {
  const navigate = useNavigate();

  function disconnect() {
    navigate("/");
    setConnected(false);
    localStorage.removeItem("jwt");
  }

  return (
    <div className="navbar-perso">
      <Logo />

      <div className="nav-links">
        <Link className="home-link" to="/">Home</Link>
        <Link className="project-link" to="/project">Projects</Link>
        {connected === true && <Link className="project-link" to="/project/create">Create project</Link>}
        {connected === true && <Link className="project-link" to="/admin">Admin</Link>}
        {connected === true && <a className="project-link" href="#" onClick={disconnect}>Se déconnecter</a>}
        {connected === false && <Link className="project-link" to="/login">Se connecter</Link>}
        {connected === false && <Link className="project-link" to="/signup">S'inscrire</Link>}  
      </div>
    </div>
  );
}
