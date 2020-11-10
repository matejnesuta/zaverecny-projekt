import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Registration extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    error: false,
    redirect: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    if (this.state.password1.localeCompare(this.state.password2) !== 0) {
      axios
        .post("/auth/registration/", {
          email: this.state.email,
          password1: this.state.password1,
          password2: this.state.password2,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.setState({
            error: error,
          });
          console.log(error);
        });
      event.preventDefault();
    }
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/verification" />;
    }
    let passwordsComp;
    if (this.state.password1.localeCompare(this.state.password2) !== 0) {
      passwordsComp = (
        <small className="text-danger">Hesla se neshodují.</small>
      );
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
                        borderColor: this.state.error ? "red" : "",
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
                        borderColor: this.state.error ? "red" : "",
                      }}
                      type="password"
                      name="password1"
                      id="reg_password1"
                      className="border-primary form-control"
                      placeholder="Zadejte heslo"
                      value={this.state.password1}
                      onChange={this.handleChange}
                      minLength={8}
                      required
                    ></input>
                    <small className="form-text text-muted">
                      Heslo musí obsahovat nejméně 8 znaků, alespoň 1 číslo a
                      alespoň 1 speciální znak.
                    </small>
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
                      type="password"
                      name="password2"
                      id="reg_password2"
                      className="border-primary form-control"
                      placeholder="Znovu zadejte heslo"
                      value={this.state.password2}
                      onChange={this.handleChange}
                      minLength={8}
                      required
                    ></input>
                    {passwordsComp}
                  </div>
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
