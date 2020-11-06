import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import user_icon from "./images/user_icon.jpg";
import axios from "axios";

class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    comment: "",
    password1: "",
    password2: "",
    updateError: false,
  };

  /*
  componentDidMount() {

  }
  */
  handleSubmit = (event) => {
    axios
      .post(
        "localhost:8000/auth/password/change",
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          comment: this.state.comment,
          new_password1: this.state.password1,
          new_password2: this.state.password2,
        },
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div>
                <h2 className="display-4 m-4">Nastavení profilu</h2>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Jméno</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Zadejte jméno"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Příjmení</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Zadejte jméno"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Popisek</label>
                  <textarea
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Zadejte popisek"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">Heslo</label>
                  <input
                    type="password"
                    name="password1"
                    id="prof_password1"
                    placeholder="Zadejte heslo"
                    value={this.state.password1}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="m-3 font-weight-bold">
                    Potvrzení hesla
                  </label>
                  <input
                    type="password"
                    name="password2"
                    id="prof_password2"
                    placeholder="Zadejte heslo"
                    value={this.state.password1}
                    onChange={this.handleChange}
                  ></input>
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

export default Profile;
