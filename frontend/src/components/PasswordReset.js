import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import axios from "axios";

class PasswordReset extends Component {
  state = { email: "", error: false };

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

  render() {
    return (
      <div>
        <Navbar isLoggedIn={false} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-5">
                <h1>Resetování hesla</h1>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-2">
                      <label className="col-form-label col-form-label-lg">
                        Email
                      </label>
                    </div>
                    <div className="col-10">
                      <input
                        type="email"
                        name="email"
                        id="res_email"
                        className="border-primary form-control form-control-lg"
                        placeholder="Zadejte email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      ></input>
                    </div>
                  </div>
                </div>
                <SubmitButton />
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PasswordReset;
