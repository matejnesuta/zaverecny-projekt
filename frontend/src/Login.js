import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loginError: false,
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
        "localhost:8000/auth/login/",
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

  authError() {
    if (this.state.loginError) {
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
        <Navbar />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-4">
                <h2 className="display-4">Login</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Email</label>
                  <input
                    style={{
                      borderColor: this.state.loginError ? "red" : "black",
                    }}
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
                    style={{
                      borderColor: this.state.loginError ? "red" : "black",
                    }}
                    type="password"
                    name="log_password"
                    id="log_password"
                    placeholder="Zadejte heslo"
                    value={this.state.password}
                    onChange={this.handleChange}
                  ></input>
                  <div className="row">{this.authError()}</div>
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

export default Login;
