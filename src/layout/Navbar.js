import { Button } from "bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";

export default function Navbar() {
  const deconnecte = () => {
    authService.logout();
    console.log("Deconnecte avec succee");
  };
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand mb-0 h1" to={"/"}>
            HumainRessource{" "}
          </Link>

          <Link
            to={"/login"}
            onClick={deconnecte()}
            className="btn btn-outline-danger nav-link"
          >
            Se deconnecte
          </Link>
          <Link to={"/login"} className="btn btn-primary nav-link">
            Login
          </Link>
          <Link className="btn btn-outline-primary nav-link" to={"/adduser"}>
            ajouter un employer
          </Link>
        </div>
      </nav>
    </div>
  );
}
