import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import ProfModal from "./modals/ProfModal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/actions";
import store from "../redux/store";
import user_icon from "../images/user_icon.jpg";
import axios from "axios";

class Profile extends Component {
  state = {
    firstName: store.getState().user.user.firstName,
    lastName: store.getState().user.user.lastName,
    bio: "",
    imageSrc: null,
    imageName: "Nahrát obrázek",
    old_password: "",
    password1: "",
    password2: "",
    modal: false,
    uploadInfo: "Max. velikost souboru: 10MB",
    error: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.password1.localeCompare(this.state.password2) === 0 &&
      (this.state.firstName !== "" || this.state.lastName !== "")
    ) {
      axios
        .patch(
          "/auth/password/change",
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            bio: this.state.bio,
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
      this.setState({
        modal: true,
      });
      const userObj = {
        id: store.getState().user.user.id,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        profile_pic:
          this.state.imageSrc === null ? user_icon : this.state.imageSrc,
        bio: this.state.bio,
      };
      this.props.getUser(userObj);
    } else {
      if (this.state.password1.localeCompare(this.state.password2) !== 0) {
        this.setState({
          error: "Hesla nejsou stejná",
        });
      }
      if (this.state.firstName !== "" || this.state.lastName !== "") {
        this.setState({
          error: "Jméno a příjmení nesmí být prázdné",
        });
      }
    }
  };

  //Metoda pro ukládání hodnoty ze vstupu
  handleChange = (event) => {
    //Zjištění jména a hodnoty vstupu
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const fileType = event.target.files[0].type;
    const maxFileSize = 10485760;
    const requiredTypes = ["image/png", "image/jpeg", "image/gif"];
    let correctType = false;

    //MAXIMÁLNÍ VELIKOST OBRÁZKU - 10MB
    //Ověřování formátu souboru, protože parametr accept u inputu se dá jaksi obejít
    requiredTypes.forEach((type) => {
      if (fileType === type) {
        correctType = true;
      }
    });

    if (correctType && file.size < maxFileSize) {
      //Nahrání souboru jako base64 string
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          imageSrc: reader.result,
          imageName: file.name,
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      if (file.size > maxFileSize) {
        this.setState({
          imageSrc: false,
          uploadInfo: "Soubor přesahuje limit 10MB",
        });
      }
      if (!correctType) {
        this.setState({
          imageSrc: false,
          uploadInfo: "Nesprávný formát souboru",
        });
      }
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

    let infoColour;
    if (this.state.uploadInfo === "Max. velikost souboru: 10MB") {
      infoColour = "form-text";
    } else {
      infoColour = "form-text text-danger";
    }

    let borderColour = "";
    if (this.state.error !== "") {
      borderColour = "border-danger form-control";
    } else {
      borderColour = "border-primary form-control";
    }

    let image;
    if (this.state.imageSrc !== null) {
      image = (
        <img
          src={this.state.imageSrc}
          alt="profile_image_thumbnail"
          id="profile-img-thumbnail"
          width={100}
          height={100}
          className="rounded-circle"
        />
      );
    }
    let imageForm;
    if (this.state.imageSrc === null || this.state.imageSrc === false) {
      imageForm = (
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
                accept={["image/png", "image/jpeg", "image/gif"]}
                className="border-primary form-control custom-file-input"
                onChange={this.handleFileSelect}
              ></input>
              <label className="custom-file-label">
                {this.state.imageName}
              </label>
            </div>
            <small className={infoColour}>{this.state.uploadInfo}</small>
          </div>
        </div>
      );
    } else {
      imageForm = (
        <div className="form-group row">
          <div className="col-4">
            <label className="col-form-label col-form-label-lg">
              Profilový obrázek
            </label>
          </div>
          <div className="col-5">
            <div className="custom-file">
              <input
                type="file"
                name="image"
                id="prof_image"
                accept={["image/png", "image/jpeg", "image/gif"]}
                className="border-primary form-control custom-file-input"
                onChange={this.handleFileSelect}
              ></input>
              <label className="custom-file-label">
                {this.state.imageName}
              </label>
            </div>
          </div>
          <div className="col-3">{image}</div>
        </div>
      );
    }

    return (
      <div>
        <ProfModal
          show={this.state.modal}
          onHide={() => {
            this.setState({ modal: false });
          }}
        />
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-5">
            <div className="col-12">
              <h1>Nastavení profilu</h1>
            </div>
          </div>
          <div className="card center p-5 m-5 bg-dark border-primary text-white">
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
                    //hodnota ve state, kam se uloží vstup
                    value={this.state.firstName}
                    //ošetření změny hodnoty
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
              {imageForm}
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Popisek
                  </label>
                </div>
                <div className="col-8">
                  <textarea
                    type="text"
                    name="bio"
                    id="bio"
                    className="border-primary form-control"
                    placeholder="Zadejte popisek"
                    maxLength={150}
                    rows={2}
                    value={this.state.bio}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Staré heslo
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="password"
                    name="old_password"
                    id="prof_old_password"
                    className="border-primary form-control"
                    placeholder="Zadejte heslo"
                    minLength={8}
                    value={this.state.old_password}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Nové heslo
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="password"
                    name="password1"
                    id="prof_password1"
                    className="border-primary form-control"
                    placeholder="Zadejte heslo"
                    minLength={8}
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
                    placeholder="Zadejte znovu heslo"
                    minLength={8}
                    value={this.state.password2}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <SubmitButton text="Uložit" />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { getUser })(Profile);
