import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    loginError: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    axios
      .post(
        "/dj-rest-auth/registration/",
        { email: this.state.email, password1: this.state.password1, password2: this.state.password2 }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(this.state.email, this.state.password1, this.state.password2)
    event.preventDefault();
  };

  badLogin() {
    if (this.state.loginError === true) {
      return (
        <div className="col-12">
          <span className="badge badge-pill badge-danger m-1">!</span>
          <small className="text-danger font-weight-bold">
            Passwords are not the same.
          </small>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row center p-3 m-4">
        <div className="col-12">
          <div className="m-4">
            <h2>Registration</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="m-3">Email</label>
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
              <label className="m-3">Password</label>
              <input
                type="password"
                name="password1"
                id="password1"
                placeholder="Enter password"
                value={this.state.password1}
                onChange={this.handleChange}
              ></input>
              <div className="row">{this.badLogin()}</div>
            </div>
            <div className="form-group">
              <label className="m-3">Password (2)</label>
              <input
                type="password"
                name="password2"
                id="password2"
                placeholder="Enter password again"
                value={this.state.password2}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="row">{this.badLogin()}</div>
            <button type="submit" className="btn btn-outline-dark btn-warning">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
