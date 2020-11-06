import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";

class Login extends Component {
  state = {
    key: "",
    loginError: false,
  };

  handleChange = (event) => {
    const { name, value } = event.targe;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    axios
      .post(
        "/auth/registration/verify-email/",
        { key: this.state.key },
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
    if (this.state.loginError === true) {
      return (
        <div className="col-12 p-2">
          <span className="badge badge-pill badge-danger m-1">!</span>
          <small className="text-danger">
            Nepodařilo se ověřit registraci.
          </small>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={false} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-4">
                <h2 className="display-4">Ověření emailu</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Klíč</label>
                  <input
                    style={{
                      borderColor: this.state.loginError ? "red" : "black",
                    }}
                    type="text"
                    name="log_email"
                    id="log_email"
                    placeholder="Zadejte klíč"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="row m-3">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Submit
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
    );
  }
}

export default Login;
