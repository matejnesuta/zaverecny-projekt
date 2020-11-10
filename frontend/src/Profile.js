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
    image: null,
    password1: "",
    password2: "",
    error: false,
  };

  /*
  componentDidMount() {
   
  }
  */
  handleSubmit = (event) => {
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
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFileSelect = (event) => {
    let ok = false;
    let type = event.target.files[0].type.split("/");
    let imageType = type[1];
    const imageFormats = ["bmp", "gif", "tiff", "jpeg", "png"];
    imageFormats.forEach((element) => {
      if (imageType.localeCompare(element) === 0) {
        ok = true;
      }
    });
    if (ok) {
      this.setState({
        image: event.target.files[0],
      });
    }
  };

  render() {
    console.log(this.state.image);
    let imageInputLabel;
    if (this.state.image == null) {
      imageInputLabel = "Nahrát obrázek";
    } else {
      imageInputLabel = this.state.image.name;
    }
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-5">
                <h2 className="display-4">Nastavení profilu</h2>
              </div>
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
                        value={this.state.password1}
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
                      value={this.state.password1}
                      onChange={this.handleChange}
                    ></input>
                  </div>
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
        </div>
      </div>
    );
  }
}

export default Profile;
