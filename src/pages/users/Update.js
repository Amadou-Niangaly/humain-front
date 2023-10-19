import React from "react";
import userService from "../../services/user.service";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Update() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "",
    lastName: "",
    telephoneNumber: "",
    departement: "",
    // Ajoutez d'autres champs pour les informations de l'employé
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  useEffect(() => {
    loadEmployees();
  }, [id]);

  const loadEmployees = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/test/employe/find/${id}`
    );
    setEmployee(result.data);
  };

  const handleUpdateEmployee = (event) => {
    event.preventDefault();

    const updatedEmployeeData = {
      name: employee.name,
      lastName: employee.lastName,
      telephoneNumber: employee.telephoneNumber,
      departement: employee.departement,
      // Ajoutez d'autres champs pour les informations de l'employé
      // address: employee.address,
      // salary: employee.salary,
      // departement: employee.departement,
      // disponibiblity: employee.disponibiblity,
    };

    userService
      .updateEmployee(id, updatedEmployeeData)
      .then((response) => {
        console.log("Employé mis à jour avec succès :", response.data);
        // Redirigez l'utilisateur vers la page de détails de l'employé ou une autre page appropriée
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'employé :", error);
      });
  };
  return (
    <div>
      <h2>Modifier l'employé</h2>
      <form onSubmit={handleUpdateEmployee}>
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Prénom :</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Numéro de téléphone :</label>
          <input
            type="text"
            name="telephoneNumber"
            value={employee.telephoneNumber}
            onChange={handleInputChange}
          />
        </div>
        {/* Ajoutez d'autres champs pour les informations de l'employé */}
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}
