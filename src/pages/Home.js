import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    chargeEmployees();
  }, []);

  const chargeEmployees = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/test/employe/all`
    );
    setUsers(result.data);
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Telephone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.telephoneNumber}</td>
                <td>
                  <button className="btn btn-outline-dark mx-2">Voir</button>
                  <button className="btn btn-primary mx-2">Modifier</button>
                  <button className="btn btn-danger mx-2">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
