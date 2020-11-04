import React, { Component } from "react";
import { Link } from "react-router-dom";
import woke from "./images/woke.jpg";
import axios from "axios";

class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    updateError: false,
  };

  handleSubmit = (event) => {
    axios
      .post(
        "localhost:8000/dj-rest-auth/login/",
        { email: this.state.email, password: this.state.password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://github.com/martindzida/zaverecny_projekt"
                  >
                    Repositář projektu
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Github's
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a
                      className="dropdown-item"
                      href="https://github.com/martindzida"
                    >
                      Můj
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      href="https://github.com/matejnesuta"
                    >
                      Matějův
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="/#">
                    Moje motivace
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={woke}
                      alt="profile_pic"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link className="dropdown-item" to="/">
                      <i className="fa fa-home" aria-hidden="true"></i> Hlavní
                      stránka
                    </Link>

                    <Link className="dropdown-item" to="/profile">
                      <i className="fa fa-cog" aria-hidden="true"></i> Upravit
                      profil
                    </Link>

                    <Link className="dropdown-item" to="/login">
                      <i className="fa fa-sign-out" aria-hidden="true"></i>{" "}
                      Odhlásit se
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row center p-3 m-4">
              <div className="col-12">
                <div>
                  <h2 className="display-4 m-4">Nastavení profilu</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="m-3 font-weight-bold">Jméno</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Zadejte jméno"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="m-3 font-weight-bold">Příjmení</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Zadejte jméno"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="m-3 font-weight-bold">Email</label>
                    <input
                      type="text"
                      name="log_email"
                      id="log_email"
                      placeholder="Zadejte email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="m-3 font-weight-bold">Heslo</label>
                    <input
                      type="password"
                      name="log_password"
                      id="log_password"
                      placeholder="Zadejte heslo"
                      value={this.state.password}
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div className="row m-3">
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary px-3">
                        Odeslat
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <hr />
            <footer>
              <div className="row">
                <div className="col-12">
                  <p>&copy; Le epique programué teamé 2020</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
