import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { getToken } from "../redux/actions/actions";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    token: "",
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
        // fetch("https://jsonplaceholder.typicode.com/users/2")
        //   .then((response) => response.json())
        //   .then((data) => this.props.getToken(data.name));
        // event.preventDefault();
        // this.setState({
        //   redirect: true,
        // });
      });
    this.props.history.push("./groups");
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
              <SubmitButton text="Odeslat" />
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
