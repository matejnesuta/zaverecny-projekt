import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    loginError: true,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    axios
      .post("http://localhost:8000/dj-rest-auth/registration/", {
        email: this.state.email,
        password1: this.state.password1,
        password2: this.state.password2,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.email, this.state.password1, this.state.password2);
    event.preventDefault();
  };

  badLogin() {
    if (this.state.loginError === true) {
      return (
        <div className="col-12">
          <span className="badge badge-pill badge-danger m-1">!</span>
          <small className="text-danger">Hesla se neshodují.</small>
        </div>
      );
    }
  }

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
                <li className="nav-item active">
                  <a className="nav-link" href="/#">
                    <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-4">
                <h2>Registrace</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Heslo</label>
                  <input
                    type="password"
                    name="password1"
                    id="password1"
                    placeholder="Enter password"
                    value={this.state.password1}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Heslo(2)</label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    placeholder="Enter password again"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="row m-3">{this.badLogin()}</div>
                <button
                  type="submit"
                  className="btn btn-outline-dark btn-warning"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
