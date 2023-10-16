import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

export default function GestionPersonnel() {
  useEffect(() => {
    try {
      console.log("GestionPersonnel useEffect called");
    } catch (error) {}
  });

  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState({
    username: "",
    email: "",
    password: "",
    loading: false,
    message: "",
  });

  const { username, email, password } = utilisateur;

  const onInputChange = (e) => {
    setUtilisateur({ ...utilisateur, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.target.value != null) {
      authService
        .login(this.utilisateur.username, this.utilisateur.password)
        .then(
          () => {
            this.props.router.navigate("/profile");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              loading: false,
              message: resMessage,
            });
          }
        );
    } else {
      this.setState({
        loading: false,
      });
    }

    // await axios.post("http://localhost:8080/api/auth/signin", utilisateur);
    // console.log("Envoyé avec succès");
    // navigate("/");
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">
            Formulaire d'inscription pour le personnel
          </h1>
          <p className="col-lg-10 fs-4">
            Bienvenue dans notre application de gestion des ressources humaines.
            Nous sommes ravis de vous accueillir dans notre outil dédié à
            l'optimisation et à la gestion de vos ressources humaines.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <div className="alert alert-danger" role="alert">
            {this.utilisateur.message}
          </div>
          <form
            onSubmit={(e) => onSubmit(e)}
            className="p-4 p-md-5 border rounded-3 bg-light"
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={onInputChange}
              />
              <label htmlFor="nom">Nom d'utilisateur</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="adresse@mail.com"
                value={email}
                onChange={onInputChange}
              />
              <label htmlFor="email">Adresse e-mail</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="motDePasse"
                name="password"
                placeholder="Mot de passe"
                value={password}
                onChange={onInputChange}
              />
              <label htmlFor="motDePasse">Mot de passe</label>
            </div>
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="seSouvenirDeMoi" /> Se souvenir de
                moi
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              S'inscrire
            </button>
            <hr className="my-4" />
            <small className="text-muted">
              En cliquant sur S'inscrire, vous acceptez les conditions
              d'utilisation.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}
