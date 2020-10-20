import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loginError: true,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
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

  badLogin() {
    if (this.state.loginError === true) {
      return (
        <div className="col-12 p-2">
          <span className="badge badge-pill badge-danger m-1">!</span>
          <small className="text-danger">Nesprávné heslo nebo email.</small>
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
                <h2>Login</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Email</label>
                  <input
                    type="text"
                    name="log_email"
                    id="log_email"
                    placeholder="Enter email"
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
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  ></input>
                  <div className="row">{this.badLogin()}</div>
                </div>
                <div className="row m-3">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-outline-dark btn-warning"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className="row m-3">
                  <div className="col-12">
                    <button type="submit" className="btn btn-danger m-1">
                      <i className="fa fa-google mr-2" aria-hidden="true"></i>
                      Google
                    </button>
                    <button type="submit" className="btn btn-primary m-1">
                      <i className="fa fa-facebook mr-2" aria-hidden="true"></i>
                      Facebook
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <a href="/#">Zapomněli jste heslo?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
