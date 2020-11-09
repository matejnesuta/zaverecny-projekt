import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Registration extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    registrationError: false,
    redirect: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    if (this.state.password1 === this.state.password2) {
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
      this.setState({
        redirect: true,
      });
    }
  };

  authError() {
    if (this.state.registrationError) {
      return (
        <div className="col-12">
          <span className="badge badge-pill badge-danger m-1">!</span>
          <small className="text-danger">Hesla se neshodují.</small>
        </div>
      );
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/verification" />;
    }
    return (
      <div>
        <Navbar isLoggedIn={false} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-5">
                <h2 className="display-4">Registrace</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <div className="col-4">
                    <label className="col-form-label col-form-label-lg">
                      Email
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      style={{
                        borderColor: this.state.registrationError ? "red" : "",
                      }}
                      type="text"
                      name="email"
                      id="reg_email"
                      className="border-primary form-control"
                      placeholder="Zadejte email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-4">
                    <label className="col-form-label col-form-label-lg">
                      Heslo
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      style={{
                        borderColor: this.state.registrationError ? "red" : "",
                      }}
                      type="password"
                      name="password1"
                      id="reg_password1"
                      className="border-primary form-control"
                      placeholder="Zadejte heslo"
                      value={this.state.password1}
                      onChange={this.handleChange}
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-4">
                    <label className="col-form-label col-form-label-lg">
                      Potvrzení hesla
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      style={{
                        borderColor: this.state.registrationError ? "red" : "",
                      }}
                      type="password"
                      name="password2"
                      id="reg_password2"
                      className="border-primary form-control"
                      placeholder="Znovu zadejte heslo"
                      value={this.state.password2}
                      onChange={this.handleChange}
                      required
                    ></input>
                  </div>
                  <div>{this.authError()}</div>
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
        </div>
      </div>
    );
  }
}

export default Registration;
