import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import { Link } from "react-router-dom";
import user_icon from "../images/user_icon.jpg";
import axios from "axios";

class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    comment: "",
    image: null,
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
    //NAHRÁVÁNÍ OBRÁZKU JE PROZATÍM NEFUNKČNÍ

    //Ověření formátu souboru - zamezení proti nahrávání špatných formátů souborů (např. docx, pdf) jako profilový obrázek
    let imageFormatOk = true;
    let file = event.target.files[0];
    //Získání informace o formátu souboru, který byl nahrán
    let format = file.type.split("/");
    //Poznámka: metoda .split() vrací pole, jež obsahuje jednotlivé části stringu a jelikož je formát souboru pokaždé částí za "/", do imageType se ukládá type[1]
    let imageFormat = format[1];
    console.log(file, imageFormat);
    //Povolené obrázkové formáty
    /*const imageFormats = ["bmp", "gif", "tiff", "jpeg", "png"];
    imageFormats.forEach((element) => {
      //Porovnávání formátu nahraného souboru s povolenými formáty a následné uložení nahraného obrázku do this.state.image, pokud je v povoleném formátu
      if (imageFormat.localeCompare(element) === 0) {
        imageFormatOk = true;
      }
    });
    if (imageFormatOk) {
      this.setState({
        image: event.target.files[0],
      });
    }*/
  };

  render() {
    //Nastavení labelu při nahrání obrázku
    let imageInputLabel;
    if (this.state.image === null) {
      imageInputLabel = "Nahrát obrázek";
    } else if (this.state.image === "") {
      imageInputLabel = "Nepodporovaný formát souboru";
    } else {
      imageInputLabel = this.state.image.name;
    }
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
              <h2 className="display-4">Nastavení profilu</h2>
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
                      className="border-primary form-control custom-file-input"
                      value={this.state.image}
                      onChange={this.handleFileSelect}
                    ></input>
                    <label className="custom-file-label">
                      {imageInputLabel}
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
              <SubmitButton />
            </form>
          </div>

          <hr />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Profile;
