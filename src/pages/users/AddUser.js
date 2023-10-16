import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [user, setUsers] = useState({
    name: "",
    lastName: "",
    telephoneNumber: 0,
    departement: {
      id: 2, // Utilisez directement l'ID du département
      // Autres propriétés du département si nécessaire
    },
  });

  const { name, lastName, telephoneNumber, departement } = user;
  const onInputChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const [departements, setDepartements] = useState([]);

  // Récupération de la liste des départements depuis l'API
  useEffect(() => {
    async function fetchDepartements() {
      try {
        const response = await axios.get("http://localhost:8080/departements");
        setDepartements(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des départements", error);
      }
    }
    fetchDepartements();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Envoyé avec");
    await axios.post("http://localhost:8080/employe", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center mb-4">AJOUTER UN EMPLOYE</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre nom !"
                name="name"
                value={name}
                onChange={onInputChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Prénom
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre prénom !"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="telephoneNumber" className="form-label">
                Numéro de téléphone
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre numéro !"
                name="telephoneNumber"
                value={telephoneNumber}
                onChange={onInputChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="departement" className="form-label">
                Département
              </label>
              <select
                id="departement"
                name="departement.id"
                className="form-control"
                value={user.departement.id}
                onChange={onInputChange}
              >
                <option value="">Sélectionnez un département</option>
                {departements.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.nom}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Ajouter
            </button>
            <button type="submit" className="btn btn-outline-danger mx-2">
              Supprimer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
