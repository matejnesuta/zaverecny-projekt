import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getToken } from "../redux/actions/tokenAction";
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
    this.props.getToken();
    event.preventDefault();
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/groups" />;
    }

    let invalidEmail = "";
    let invalidPassword = "";
    if (this.state.email === "") {
      invalidEmail = (
        <small className="text-danger">Email nemůže být prázdný.</small>
      );
    }
    if (this.state.password === "") {
      invalidPassword = (
        <small className="text-danger">Heslo nemůže být prázdné.</small>
      );
    }
    return (
      <div>
        <Navbar isLoggedIn={false} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-4">
                <h2 className="display-4">Přihlášení</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <div className="col-4">
                    <label className="col-form-label col-form-label-lg">
                      Email
                    </label>
                  </div>
                  <div className="col-5">
                    <input
                      type="email"
                      name="email"
                      id="log_email"
                      className="border-primary form-control"
                      placeholder="Zadejte email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div className="col-3">{invalidEmail}</div>
                </div>
                <div className="form-group row">
                  <div className="col-4">
                    <label className="col-form-label col-form-label-lg">
                      Heslo
                    </label>
                  </div>
                  <div className="col-5">
                    <input
                      type="password"
                      name="password"
                      id="log_password"
                      className="border-primary form-control"
                      placeholder="Zadejte heslo"
                      value={this.state.password}
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div className="col-3">{invalidPassword}</div>
                </div>
                <SubmitButton />
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
                  <Link to="/passwordreset">Zapomněli jste heslo?</Link>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokens: state.tokens.token,
});

export default connect(mapStateToProps, getToken)(Login);
