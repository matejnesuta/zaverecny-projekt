import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getImage } from "../redux/actions/actions";
import axios from "axios";

class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    comment: "",
    imageSrc: null,
    imageName: "Nahrát obrázek",
    password1: "",
    password2: "",
    error: false,
  };

  handleSubmit = (event) => {
    if (this.state.password1.localeCompare(this.state.password2) !== 0) {
      axios
        .post(
          "/auth/password/change",
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
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    //Metoda nahrávání souboru jako lokální url

    /*const localImageUrl = window.URL.createObjectURL(file);
    this.setState({
      imageSrc: localImageUrl,
      imageName: file.name,
    });
    this.props.getImage(localImageUrl);
    */

    //Metoda nahráváí souboru jako base64 string(oof)

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        imgSrc: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  render() {
    //Kontrola, jestli jsou obě zadaná hesla stejná
    let passwordsComp;
    if (this.state.password1.localeCompare(this.state.password2) !== 0) {
      passwordsComp = (
        <small className="text-danger">Hesla se neshodují.</small>
      );
    }
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-5">
            <div className="col-12">
              <h1>Nastavení profilu</h1>
            </div>
          </div>
          <div className="card center p-5 m-5 bg-dark border-primary text-light">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Jméno
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="border-primary form-control"
                    placeholder="Zadejte jméno"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Příjmení
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="border-primary form-control"
                    placeholder="Zadejte jméno"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Profilový obrázek
                  </label>
                </div>
                <div className="col-8">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="image"
                      id="prof_image"
                      accept={["image/png", "image/jpg"]}
                      className="border-primary form-control custom-file-input"
                      onChange={this.handleFileSelect}
                    ></input>
                    <label className="custom-file-label">
                      {this.state.imageName}
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Popisek
                  </label>
                </div>
                <div className="col-8">
                  <textarea
                    type="text"
                    name="comment"
                    id="comment"
                    className="border-primary form-control"
                    placeholder="Zadejte popisek"
                    maxLength={300}
                    rows={4}
                    value={this.state.comment}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Heslo
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="password"
                    name="password1"
                    id="prof_password1"
                    className="border-primary form-control"
                    placeholder="Zadejte heslo"
                    value={this.state.password1}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Potvrzení hesla
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="password"
                    name="password2"
                    id="prof_password2"
                    className="border-primary form-control"
                    placeholder="Zadejte heslo"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <SubmitButton text="Odeslat" />
            </form>
          </div>
          <div>
            <img src={this.state.imgSrc} alt="cojetypíčo" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { getImage })(Profile);
