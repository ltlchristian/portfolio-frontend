import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import Logo from "./Logo";
import "./Navbar.css";

export default function NavBar() {
  const { connected, disconnect } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar-perso">

      <div className="nav-links">
        <Link className="home-link" to="/">Accueil</Link>
        <Link className="project-link" to="/project">Portfolio</Link>
        {connected && <Link className="project-link" to="/project/create">Nouveau</Link>}
        {connected && <Link className="project-link" to="/admin">Admin</Link>}
        {connected && <a className="project-link" href="#" onClick={disconnect}>Déconnexion</a>}
        {!connected && <Link className="project-link" to="/login">Connexion</Link>}
        {/*!connected && <Link className="project-link" to="/signup">Inscription</Link>*/}
      </div>

      {/*<nav class="global-container navbar fixed-top navbar-light bg-light justify-content-center border-bottom shadow-sm">
      <a href="#home" class="nav-link fs-5 text-dark">Home</a>
      <a href="#features" class="nav-link fs-5 text-dark">Features</a>
      <a href="#pricing" class="nav-link fs-5 text-dark">Pricing</a>
      </nav>*/}      
    </div>
  );
}
