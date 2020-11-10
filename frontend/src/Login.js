import React, { Component } from "react";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    token: "",
    error: "",
    redirect: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    axios
      .post(
        "/auth/login/",
        { email: this.state.email, password: this.state.password },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          token: response.data.key,
        });
        console.log(response);
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
        console.log(error);
      });
    event.preventDefault();
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar isLoggedIn={false} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-4">
                <h2 className="display-4">Login</h2>
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
                      type="email"
                      name="email"
                      id="log_email"
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
                      type="password"
                      name="password"
                      id="log_password"
                      className="border-primary form-control"
                      placeholder="Zadejte heslo"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    ></input>
                  </div>
                </div>
                <div className="row m-3">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary px-3">
                      Odeslat
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
          <hr />
        </div>
      </div>
    );
  }
}

export default Login;
