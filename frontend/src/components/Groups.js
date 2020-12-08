import React, { Component } from "react";
//import { RouteComponentProps } from "react-router-dom";
import Group from "./Group";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import { connect, useStore } from "react-redux";
import { getUser } from "../redux/actions/actions";
import axios from "axios";

class Groups extends Component {
  state = {
    groups: [
      <Group key={1} id={1} name="1" />,
      <Group key={2} id={2} name="2" />,
      <Group key={3} id={3} name="3" />,
      <Group key={4} id={4} name="4" />,
      <Group key={5} id={5} name="5" />,
      <Group key={6} id={6} name="6" />,
    ],
    createGroup: false,
    name: "",
    icon: "",
    comment: "",
    search: "",
  };

  //Načtení skupin uživatele
  componentDidMount() {
    /*axios.get("/app/board/").then((res) => {
      const groups = res.data;
      //Uložení pole komponentů Group do this.state.groups
      const receivedData = groups.map((group) => (
        <Group key={group.id} id={group.id} name={group.name} />
      ));
      this.setState({
        logs: receivedData,
      });
    });*/
    fetch("https://jsonplaceholder.typicode.com/users/2")
      .then((response) => response.json())
      .then((data) => this.props.getUser(data));
  }

  handleOpenForm = () => {
    this.setState({
      createGroup: true,
    });
  };

  handleCloseForm = () => {
    this.setState({
      createGroup: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //to be continued...
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  addedUsers() {
    let users = [];
    return users;
  }

  render() {
    let iconType = "fa fa-" + this.state.icon + " fa-4x";
    let newGroupForm;
    if (this.state.createGroup) {
      newGroupForm = (
        <div
          id="createGroup"
          className="card center m-5 px-5 py-3 bg-dark border-primary text-light"
        >
          <div className="ml-auto">
            <button className="btn" onClick={this.handleCloseForm}>
              <i
                className="fa fa-times fa-2x"
                aria-hidden="true"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
          <div className="row center p-2 mb-5">
            <div className="col-12">
              <h3>Nová skupina</h3>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <div className="col-4">
                <label className="col-form-label col-form-label-lg">
                  Název
                </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="name"
                  id="group_name"
                  className="border-primary form-control"
                  placeholder="Zadejte název"
                  value={this.state.name}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-4">
                <label className="col-form-label col-form-label-lg">
                  Ikona
                </label>
              </div>
              <div className="col-6">
                <select
                  className="form-control"
                  name="icon"
                  id="group_icon"
                  value={this.state.icon}
                  onChange={this.handleChange}
                >
                  <option value="" disabled defaultValue>
                    Vyberte ikonu
                  </option>
                  <option value="grav">Cosmonaut</option>
                  <option value="wpexplorer">Telescope</option>
                  <option value="camera-retro">Camera</option>
                  <option value="code">Code</option>
                  <option value="diamond">Diamond</option>
                </select>
              </div>
              <div className="col-2">
                <i className={iconType} aria-hidden="true"></i>
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
                  Přidat uživatele
                </label>
              </div>
              <div className="col-4 input-group">
                <input
                  type="text"
                  name="search"
                  id="group_search"
                  className="border-primary form-control"
                  placeholder="Zadejte jméno uživatele"
                  value={this.state.search}
                  onChange={this.handleChange}
                ></input>
                <span>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#209cee" }}
                  >
                    <i
                      className="fa fa-search"
                      aria-hidden="true"
                      style={{ color: "white" }}
                    ></i>
                  </button>
                </span>
              </div>
            </div>
            <SubmitButton text="Potvrdit" />
          </form>
        </div>
      );
    }

    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="p-3 m-4">
                <h1>Vaše skupiny</h1>
              </div>
            </div>
          </div>
          <div className="row center p-3 m-4 justify-content-center">
            {this.state.groups}
          </div>
          <div className="row center p-3 m-4">
            <div className="col-12">
              <a href="#createGroup">
                <button
                  className="btn btn-success p-2"
                  onClick={this.handleOpenForm}
                >
                  <i className="fa fa-plus m-1" aria-hidden="true"></i> Vytvořit
                  skupinu
                </button>
              </a>
            </div>
          </div>
          {newGroupForm}
        </div>
        <Footer />
      </div>
    );
  }
}
//https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/index.html
//https://www.digitalocean.com/community/tutorials/how-to-implement-smooth-scrolling-in-react

export default connect(null, { getUser })(Groups);
