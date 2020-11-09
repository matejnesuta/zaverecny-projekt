import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";

class Verification extends Component {
  state = {
    key: "",
    verificationError: false,
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
    if (this.state.verificationError === true) {
      return (
        <div className="col-12 p-2">
          <span className="badge badge-pill badge-danger m-1">!</span>
          <small className="text-danger">Nesprávný klíč.</small>
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
              <div className="m-5">
                <h2 className="display-4">Ověření emailu</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-2">
                      <label className="col-form-label col-form-label-lg">
                        Klíč
                      </label>
                    </div>
                    <div className="col-10">
                      <input
                        style={{
                          borderColor: this.state.verificationError
                            ? "red"
                            : "",
                        }}
                        type="text"
                        name="key"
                        id="ver_key"
                        className="border-primary form-control form-control-lg"
                        placeholder="Zadejte klíč"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      ></input>
                      <div>{this.authError()}</div>
                    </div>
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

export default Verification;
