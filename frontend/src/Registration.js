import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";

class Registration extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    registrationError: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    axios
      .post("http://localhost:8000/auth/registration/", {
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
        <Navbar />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-4">
                <h2 className="display-4">Registrace</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Email</label>
                  <input
                    style={{
                      borderColor: this.state.registrationError
                        ? "red"
                        : "black",
                    }}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Zadejte email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Heslo</label>
                  <input
                    style={{
                      borderColor: this.state.registrationError
                        ? "red"
                        : "black",
                    }}
                    type="password"
                    name="password1"
                    id="password1"
                    placeholder="Zadejte heslo"
                    value={this.state.password1}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">
                    Potvrzení hesla
                  </label>
                  <input
                    style={{
                      borderColor: this.state.registrationError
                        ? "red"
                        : "black",
                    }}
                    type="password"
                    name="password2"
                    id="password2"
                    placeholder="Znovu zadejte heslo"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="row m-3">{this.badLogin()}</div>
                <button type="submit" className="btn btn-primary px-3">
                  Odeslat
                </button>
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
    );
  }
}

export default Registration;
