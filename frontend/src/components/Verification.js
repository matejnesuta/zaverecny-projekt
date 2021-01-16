import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import VerModal from "./modals/VerModal";
import axios from "axios";

class Verification extends Component {
  state = {
    key: "",
    error: "",
    modal: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.key !== "") {
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
      this.setState({
        modal: true,
      });
    } else {
      this.setState({
        error: "Pole nesmí být prázdné",
      });
    }
  };

  render() {
    let borderColour = "";
    if (this.state.error !== "") {
      borderColour = "border-danger form-control form-control-lg";
    } else {
      borderColour = "border-primary form-control form-control-lg";
    }

    return (
      <div>
        <VerModal
          show={this.state.modal}
          onHide={() => {
            this.setState({ modal: false });
          }}
        />
        <Navbar isLoggedIn={false} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <h1>Ověření emailu</h1>
            </div>
          </div>
          <div className="card center p-5 m-5 bg-dark border-primary text-white">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="form-group row justify-content-center">
                  <div className="col-10">
                    <input
                      type="text"
                      name="key"
                      id="ver_key"
                      className={borderColour}
                      placeholder="Zadejte klíč"
                      value={this.state.key}
                      onChange={this.handleChange}
                    ></input>
                  </div>
                </div>
                <div className="form-group row justify-content-center">
                  <div className="col-4">
                    <small className="form-text text-danger">
                      {this.state.error}
                    </small>
                  </div>
                </div>
              </div>
              <SubmitButton text="Odeslat" />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Verification;
