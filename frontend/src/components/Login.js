import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { getToken } from "../redux/actions/actions";
import store from "../redux/store";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      axios
        .post(
          "/auth/login/",
          { email: this.state.email, password: this.state.password },
          { withCredentials: true }
        )
        .then((response) => {
          this.props.getToken(response.data.key);
        })
        .catch((error) => {
          this.setState({
            error: error,
          });
          console.log(error);
        });
      setTimeout(() => {
        axios
          .get("/app/profile/", {
            headers: {
              Authorization: "Token " + store.getState().token.token,
            },
          })
          .then((res) => {
            console.log(res.data);
            this.props.getUser(res.data);
          });
        this.props.history.push("./groups");
      }, 2000);
    } else {
      this.setState({
        error: "Žádné pole nemůže nesmí prázdné",
      });
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
        <Navbar isLoggedIn={false} />
        <div className="container">
          <div className="row center p-3 m-5">
            <div className="col-12">
              <h1>Přihlášení</h1>
            </div>
          </div>
          <div className="card center p-5 m-5 bg-dark border-primary text-white">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row justify-content-center">
                <div className="col-5">
                  <input
                    type="email"
                    name="email"
                    id="log_email"
                    className={borderColour}
                    placeholder="Zadejte email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-group row justify-content-center">
                <div className="col-5">
                  <input
                    type="password"
                    name="password"
                    id="log_password"
                    className={borderColour}
                    placeholder="Zadejte heslo"
                    value={this.state.password}
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
              <SubmitButton text="Odeslat" />
              <div className="p-3">
                <Link to="/passwordreset" style={{ color: "white" }}>
                  Zapomněli jste heslo?
                </Link>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { getToken })(Login);
