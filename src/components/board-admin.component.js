import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      employes: [],
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    UserService.getAllEmployees().then(
      (response) => {
        this.setState({ employes: response.data });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  // Fonction de suppression d'un employé
  deleteEmployee(employeeId) {
    UserService.deleteEmployee(employeeId)
      .then((response) => {
        console.log("Employé supprimé avec succès.");
        // Mettez à jour la liste des employés après la suppression (rechargez la liste)
        this.getAllEmployees();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'employé :", error);
      });
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Téléphone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employes.map((employe, index) => (
                <tr key={employe.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{employe.name}</td>
                  <td>{employe.lastName}</td>
                  <td>{employe.telephoneNumber}</td>
                  <td>
                    <button className="btn btn-outline-dark mx-2">Voir</button>
                    <Link
                      to={`/editUser/${employe.id}`}
                      className="btn btn-primary mx-2"
                    >
                      Modifier
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => this.deleteEmployee(employe.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
