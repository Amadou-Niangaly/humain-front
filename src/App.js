import React, { Component } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import userService from "./services/user.service";
import NavBar from "./layout/Navbar";
// import AddUser from "./pages/users/AddUser";
import GestionPersonnel from "./pages/GestionPersonnel";
// import UpdateEmployee from "./pages/users/EditUser";
import UpdateUser from "./pages/users/Update";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import HomeAdmin from "./pages/Home";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">
              Human Resource
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                {currentUser && (
                  <li className="nav-item">
                    <Link to="/user" className="nav-link">
                      User
                    </Link>
                  </li>
                )}
                {showModeratorBoard && (
                  <li className="nav-item dropdown">
                    <Link
                      to="/mod"
                      className="nav-link dropdown-toggle"
                      id="moderatorDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Moderator
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="moderatorDropdown"
                    >
                      <Link to="/mod" className="dropdown-item">
                        Dashboard
                      </Link>
                      {/* Autres liens pour le rôle de modérateur */}
                    </div>
                  </li>
                )}
                {showAdminBoard && (
                  <li className="nav-item dropdown">
                    <Link
                      to="/admin"
                      className="nav-link dropdown-toggle"
                      id="adminDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Admin
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="adminDropdown"
                    >
                      <Link to="/admin" className="dropdown-item">
                        Dashboard
                      </Link>
                      {/* Autres liens pour le rôle d'administrateur */}
                      <Link to="/admin/list" className="dropdown-item">
                        Liste employe
                      </Link>
                      <Link to="/admin/newEmploye" className="dropdown-item">
                        add employe
                      </Link>
                    </div>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav ml-auto">
                {currentUser ? (
                  <li className="nav-item dropdown">
                    <Link
                      to="/profile"
                      className="nav-link dropdown-toggle"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {currentUser.username}
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="userDropdown"
                    >
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <li className="nav-item">
                        <Link to="/lgout" className="nav-link">
                          Deconnexion
                        </Link>
                      </li>
                    </div>
                  </li>
                ) : (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">
                        Register
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<BoardUser />} />
              <Route path="/mod" element={<BoardModerator />} />
              <Route path="/admin" element={<BoardAdmin />} />
              <Route path="/editUser/:id" element={<UpdateUser />} />
              {/* <Route
                path="/editEmployee/:employeeId"
                element={<UpdateEmployee />}
              /> */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
