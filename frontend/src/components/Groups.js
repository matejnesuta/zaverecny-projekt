import React, { Component } from "react";
//import { RouteComponentProps } from "react-router-dom";
import Group from "./Group";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import GroupDelModal from "./modals/GroupDelModal";
import GroupEditNameModal from "./modals/GroupEditNameModal";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import woke from "../images/woke.jpg";
import store from "../redux/store";
import axios from "axios";

class Groups extends Component {
  state = {
    groups: [
      <Group
        key={1}
        id={1}
        name="IT1"
        icon="floppy-o"
        isOwner={true}
        handleDelete={(id, name) => {
          this.setState((prevState) => ({
            deleteModal: {
              ...prevState.deleteModal,
              modal: true,
              deleteId: id,
              deleteName: name,
            },
          }));
        }}
        handleEdit={(id, name) => {
          this.setState((prevState) => ({
            editModal: {
              ...prevState.editModal,
              modal: true,
              editId: id,
              editName: name,
            },
          }));
        }}
      />,
      <Group
        key={2}
        id={2}
        name="IT2"
        icon="grav"
        isOwner={true}
        handleDelete={(id, name) => {
          this.setState((prevState) => ({
            deleteModal: {
              ...prevState.deleteModal,
              modal: true,
              deleteId: id,
              deleteName: name,
            },
          }));
        }}
        handleEdit={(id, name) => {
          this.setState((prevState) => ({
            editModal: {
              ...prevState.editModal,
              modal: true,
              editId: id,
              editName: name,
            },
          }));
        }}
      />,
      <Group
        key={3}
        id={3}
        name="IT3"
        icon="code"
        isOwner={true}
        handleDelete={(id, name) => {
          this.setState((prevState) => ({
            deleteModal: {
              ...prevState.deleteModal,
              modal: true,
              deleteId: id,
              deleteName: name,
            },
          }));
        }}
        handleEdit={(id, name) => {
          this.setState((prevState) => ({
            editModal: {
              ...prevState.editModal,
              modal: true,
              editId: id,
              editName: name,
            },
          }));
        }}
      />,
      <Group
        key={4}
        id={4}
        name="IT4 SIT"
        icon="camera-retro"
        isOwner={true}
        handleDelete={(id, name) => {
          this.setState((prevState) => ({
            deleteModal: {
              ...prevState.deleteModal,
              modal: true,
              deleteId: id,
              deleteName: name,
            },
          }));
        }}
        handleEdit={(id, name) => {
          this.setState((prevState) => ({
            editModal: {
              ...prevState.editModal,
              modal: true,
              editId: id,
              editName: name,
            },
          }));
        }}
      />,
      <Group
        key={5}
        id={5}
        name="IT4 PRG"
        icon="code"
        isOwner={true}
        handleDelete={(id, name) => {
          this.setState((prevState) => ({
            deleteModal: {
              ...prevState.deleteModal,
              modal: true,
              deleteId: id,
              deleteName: name,
            },
          }));
        }}
        handleEdit={(id, name) => {
          this.setState((prevState) => ({
            editModal: {
              ...prevState.editModal,
              modal: true,
              editId: id,
              editName: name,
            },
          }));
        }}
      />,
      <Group
        key={6}
        id={6}
        name="IT4"
        icon="wheelchair-alt"
        isOwner={false}
        handleDelete={(id, name) => {
          this.setState((prevState) => ({
            deleteModal: {
              ...prevState.deleteModal,
              modal: true,
              deleteId: id,
              deleteName: name,
            },
          }));
        }}
        handleEdit={(id, name) => {
          this.setState((prevState) => ({
            editModal: {
              ...prevState.editModal,
              modal: true,
              editId: id,
              editName: name,
            },
          }));
        }}
      />,
    ],
    createGroup: false,
    name: "",
    icon: "",
    comment: "",
    search: "",
    getSearchResult: [
      { id: 1, imgSrc: "", name: "Prokop Buben" },
      { id: 2, imgSrc: "", name: "Franta Brambor" },
      { id: 3, imgSrc: "", name: "Dáááávid" },
    ],
    showSearchResult: false,
    deleteModal: {
      modal: false,
      modalValue: null,
      deleteId: null,
      deleteName: "",
    },
    editModal: {
      modal: false,
      modalValue: null,
      editId: null,
      editName: "",
    },
  };

  //Načtení skupin uživatele
  componentDidMount() {
    axios
      .get("/app/board/", {
        headers: { Authorization: "Token " + store.getState().token.token },
      })
      .then((res) => {
        const groups = res.data;
        //Uložení pole komponentů Group do this.state.groups
        const receivedData = groups.map((group) => (
          <Group key={group.id} id={group.id} name={group.name} />
        ));
        this.setState({
          groups: receivedData,
        });
      });
  }

  handleOpenForm = () => {
    this.setState({
      createGroup: true,
    });
  };

  handleCloseForm = () => {
    scroll.scrollToTop();
    this.setState({
      createGroup: false,
      showSearchResult: false,
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

  handleSearch = (event) => {
    event.preventDefault();
    //axios.post()
    //response => getSearchResult
    this.setState({
      showSearchResult: true,
    });
  };

  handleAddUser = () => {};

  getModalValue = (value, type) => {
    if (type === "delete") {
      this.setState((prevState) => ({
        deleteModal: {
          ...prevState.deleteModal,
          modal: false,
          modalValue: value,
        },
      }));
    }
    if (type === "edit") {
      this.setState((prevState) => ({
        editModal: {
          ...prevState.editModal,
          modal: false,
          modalValue: value,
        },
      }));
    }
  };

  render() {
    let iconType = "fa fa-" + this.state.icon + " fa-4x";
    let newGroupForm;
    let searchResult;
    let results = [...this.state.getSearchResult];
    let searchResultRow = results.map((obj) => (
      //Link jinak než na tr
      <tr key={obj.id} scope="row">
        <td>
          <img src={obj.imgSrc} alt="nejde to xd" />
        </td>
        <td> {obj.name}</td>
        <td>
          <button className="btn btn-success" onClick={this.handleAddUser}>
            <i className="fa fa-user-plus" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    ));

    if (this.state.showSearchResult) {
      searchResult = (
        <div className="form-group row justify-content-center mt-4">
          <div className="col-8 table-responsive">
            <table className="table table-hover table-dark">
              <thead className="thead-dark">
                <tr scope="row">
                  <th colSpan={12}>Výsledek vyhledávání</th>
                </tr>
              </thead>
              <tbody>{searchResultRow}</tbody>
            </table>
          </div>
        </div>
      );
    } else {
      searchResult = "";
    }

    if (this.state.createGroup) {
      newGroupForm = (
        <div className="card center m-5 px-5 py-3 bg-dark border-primary text-white">
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
                  <option value="wheelchair-alt">Wheelchair</option>
                  <option value="camera-retro">Camera</option>
                  <option value="code">Code</option>
                  <option value="floppy-o">Floppy</option>
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
              <div className="col-8 input-group">
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
                    onClick={this.handleSearch}
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
            {searchResult}
            <SubmitButton text="Potvrdit" />
          </form>
        </div>
      );
    }

    return (
      <div>
        <GroupDelModal
          show={this.state.deleteModal.modal}
          onHide={() => {
            this.setState((prevState) => ({
              deleteModal: {
                ...prevState.deleteModal,
                modal: false,
              },
            }));
          }}
          value={this.getModalValue}
          name={this.state.deleteModal.deleteName}
        />
        <GroupEditNameModal
          show={this.state.editModal.modal}
          onHide={() => {
            this.setState((prevState) => ({
              editModal: {
                ...prevState.editModal,
                modal: false,
              },
            }));
          }}
          value={this.getModalValue}
          name={this.state.editModal.editName}
        />
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <h1>Vaše skupiny</h1>
            </div>
          </div>
          <div className="row center p-3 m-4 justify-content-center">
            {this.state.groups}
          </div>
          <div className="row center p-3 m-4">
            <div className="col-12">
              <ScrollLink
                activeClass="active"
                to="createGroup"
                smooth={true}
                duration={600}
              >
                <button
                  className="btn btn-success p-2"
                  onClick={this.handleOpenForm}
                >
                  <i className="fa fa-plus m-1" aria-hidden="true"></i> Vytvořit
                  skupinu
                </button>
              </ScrollLink>
            </div>
          </div>
          <div name="createGroup">{newGroupForm}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { getUser })(Groups);
