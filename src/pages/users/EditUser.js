import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import UserService from "../services/user.service";
import userService from "../../services/user.service";

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("UpdateEmployee with id: " + id);
  const [employee, setEmployee] = useState({
    name: "",
    lastName: "",
    telephoneNumber: "",
    departement: "",
    // Ajoutez d'autres champs pour les informations de l'employé
  });

  const loadEmployee = async (id) => {
    try {
      if (!id) {
        // Gérez le cas où l'ID est undefined
        console.log("Error: Invalid employee id: ");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/test/employe/find/${id}`
      );

      // Mettez à jour l'état avec les données de l'employé
      setEmployee(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement de l'employé :", error);
    }
  };

  // const loadUsers = async (id) => {
  //   const result = await axios.get(
  //     `http://localhost:8080/api/test/employe/find/${id}`
  //   );
  // };

  useEffect(() => {
    // Récupérez les informations de l'employé à partir de votre service ou API
    loadEmployee();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
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

export default UpdateEmployee;
