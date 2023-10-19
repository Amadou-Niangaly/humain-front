import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
  getAllEmployees() {
    return axios.get(API_URL + "employe/all", { headers: authHeader() });
  }
  async getEmployeeById(employeeId) {
    const url = `${API_URL}/employe/find/${employeeId}`; // Assurez-vous que l'URL est correcte pour récupérer un employé spécifique

    return axios
      .get(url)
      .then((response) => {
        return response.data; // Vous pouvez renvoyer directement les données de l'employé
      })
      .catch((error) => {
        throw error; // Gérez les erreurs selon vos besoins
      });
  }
  // Méthode pour mettre à jour un employé
  updateEmployee(employeeId, updatedEmployeeData) {
    const url = `${API_URL}/employe/update/${employeeId}`; // Assurez-vous que l'URL est correcte
    return axios.put(url, updatedEmployeeData, { headers: authHeader() }); // Utilisation de PUT pour mettre à jour l'employé
  }
  deleteEmployee(employeeId) {
    const url = `${API_URL}/employe/delete/${employeeId}`;
    return axios.delete(url, { headers: authHeader() });
  }
}

export default new UserService();
