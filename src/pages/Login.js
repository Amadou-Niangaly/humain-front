import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState({
    username: "",
    password: "",
    loading: false,
    message: "",
  });

  const { username, password } = utilisateur;

  const onInputChange = (e) => {
    setUtilisateur({ ...utilisateur, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.target.value != null) {
      authService.login(utilisateur.username, utilisateur.password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setUtilisateur({
            ...utilisateur,
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      setUtilisateur({
        ...utilisateur,
        loading: false,
      });
    }
  };

  return (
    <div
      className="container col-xl-10 col-xxl-8 px-4 py-5"
      style={{ background: "#f0f0f0" }} // Ajoutez le style d'arrière-plan
    >
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">Page de Connection</h1>
          <p className="col-lg-10 fs-4">
            Bienvenue dans notre application de gestion des ressources humaines.
            Nous sommes ravis de vous accueillir dans notre outil dédié à
            l'optimisation et à la gestion de vos ressources humaines.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <div className="alert alert-danger" role="alert">
            {utilisateur.message}
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
