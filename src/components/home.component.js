import React, { Component } from "react";

import UserService from "../services/user.service";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div>
          <div className="b-example-divider"></div>

          <div className="bg-dark text-secondary px-4 py-5 text-center">
            <div className="py-5">
              <h1 className="display-5 fw-bold text-white">
                GESTION DES PERSONNELS
              </h1>
              <div className="col-lg-6 mx-auto">
                <p className="fs-5 mb-4">
                  Optimisez la gestion de vos talents et le développement de
                  votre équipe avec notre application dédiée à la gestion des
                  ressources humaines. Bienvenue dans l'avenir de la gestion du
                  personnel.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Link
                    to={"/admin"}
                    type="button"
                    className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                  >
                    Liste des employees
                  </Link>
                  <Link
                    to={"/profile"}
                    type="button"
                    className="btn btn-outline-light btn-lg px-4"
                  >
                    Profile Utilisateur
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="b-example-divider mb-0"></div>
        </div>
      </div>
    );
  }
}
