import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import axios from "axios";
import RegModal from "./modals/RegModal";

class Registration extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
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
    if (
      this.state.password1.localeCompare(this.state.password2) === 0 &&
      this.state.email !== "" &&
      this.state.password1 !== "" &&
      this.state.password2 !== "" &&
      this.state.password1.length >= 8 &&
      this.state.password2.length >= 8
    ) {
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
          console.log(error);
        });
      this.setState({
        modal: true,
      });
    } else {
      if (
        this.state.email === "" ||
        this.state.password1 === "" ||
        this.state.password2 === ""
      ) {
        this.setState({
          error: "Žádné pole nesmí být prázdné",
        });
      }

      if (this.state.password1.length < 8 && this.state.password2.length < 8) {
        this.setState({
          error: "Heslo je příliš krátké",
        });
      }

      if (this.state.password1.localeCompare(this.state.password2) !== 0) {
        this.setState({
          error: "Hesla nejsou stejná",
        });
      }
    }
  };

  render() {
    let borderColour = "";
    if (this.state.error !== "") {
      borderColour = "border-danger form-control";
    } else {
      borderColour = "border-primary form-control";
    }

    return (
      <div>
        <RegModal
          show={this.state.modal}
          onHide={() => {
            this.setState({
              modal: false,
            });
          }}
        />
        <Navbar isLoggedIn={false} />
        <div className="container">
          <div className="row center p-3 m-5">
            <div className="col-12">
              <h1>Registrace</h1>
            </div>
          </div>
          <div className="card center p-5 m-5 bg-dark border-primary text-white">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row justify-content-center">
                <div className="col-6">
                  <input
                    type="text"
                    name="email"
                    id="reg_email"
                    className={borderColour}
                    placeholder="Zadejte email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-group row justify-content-center">
                <div className="col-6">
                  <input
                    type="password"
                    name="password1"
                    id="reg_password1"
                    className={borderColour}
                    placeholder="Zadejte heslo"
                    value={this.state.password1}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-group row justify-content-center">
                <div className="col-6">
                  <input
                    type="password"
                    name="password2"
                    id="reg_password2"
                    className={borderColour}
                    placeholder="Znovu zadejte heslo"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  ></input>
                  <small className="form-text text-danger p-1">
                    {this.state.error}
                  </small>
                </div>
              </div>
              <div className="form-group row justify-content-center">
                <div className="col-4">
                  <small className="form-text">
                    Heslo musí obsahovat nejméně 8 znaků, alespoň 1 číslo a
                    alespoň 1 speciální znak.
                  </small>
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

export default Registration;
