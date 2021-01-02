import React, { Component } from "react";
import Board from "./Board";
import UpdateLog from "./UpdateLog";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FileBar from "./FileBar";
import Footer from "./Footer";
import UserRemoveModal from "./modals/UserRemoveModal";
import UserChangeRoleModal from "./modals/UserChangeRoleModal";
import SubmitButton from "./SubmitButton";
import woke from "../images/woke.jpg";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import axios from "axios";

class Main extends Component {
  state = {
    logs: [
      <UpdateLog
        key={1}
        id={1}
        imgSrc={woke}
        name="Prokop"
        content="GG"
        timestamp="21. 12. 2020"
      />,
      <UpdateLog
        key={5}
        id={5}
        imgSrc={woke}
        name="Buben"
        content="WP"
        timestamp="22. 12. 2020"
      />,
      <UpdateLog
        key={7}
        id={7}
        imgSrc={woke}
        name="Lukáš"
        content="GLHF"
        timestamp="23. 12. 2020"
      />,
    ],
    users: [
      { key: 1, id: 1, imgSrc: "", name: "Franta Vopršálek", role: "owner" },
      { key: 2, id: 2, imgSrc: "", name: "Pepa Zdepa", role: "mod" },
      { key: 3, id: 3, imgSrc: "", name: "Karel Jednička", role: "user" },
      { key: 4, id: 4, imgSrc: "", name: "Honza Petržel", role: "user" },
      { key: 5, id: 5, imgSrc: "", name: "Franta Brambor", role: "user" },
      { key: 6, id: 6, imgSrc: "", name: "Péťa Trojka", role: "mod" },
    ],
    //deadline - date format
    tasks: [
      {
        id: 1,
        author: "Franta Brambor",
        title: "Velký špatný",
        created: "2020-12-29 22:00:00",
        description: "Hahahaha",
        deadline: "",
        stage: "in_progress",
      },
      {
        id: 2,
        author: "Franta Brambor",
        title: "Hodně špatný",
        created: "2020-12-29 22:00:00",
        description: "SADGE",
        deadline: "",
        stage: "done",
      },
      {
        id: 3,
        author: "Franta Brambor",
        title: "Mega špatný",
        created: "2020-12-29 22:00:00",
        description: "RAGEY",
        deadline: "",
        stage: "in_progress",
      },
      {
        id: 4,
        author: "Franta Brambor",
        title: "Velký špatný",
        created: "2020-12-29 22:00:00",
        description: "Hahahaha",
        deadline: "",
        stage: "done",
      },
      {
        id: 5,
        author: "Franta Brambor",
        title: "Hodně špatný",
        created: "2020-12-29 22:00:00",
        description: "SADGE",
        deadline: "",
        stage: "almost_finished",
      },
      {
        id: 6,
        author: "Franta Brambor",
        title: "Mega špatný",
        created: "2020-12-29 22:00:00",
        description: "RAGEY",
        deadline: "",
        stage: "in_progress",
      },
      {
        id: 7,
        author: "Franta Brambor",
        title: "Velký špatný",
        created: "2020-12-29 22:00:00",
        description: "Hahahaha",
        deadline: "",
        stage: "in_progress",
      },
      {
        id: 8,
        author: "Franta Brambor",
        title: "Hodně špatný",
        created: "2020-12-29 22:00:00",
        description: "SADGE",
        deadline: "",
        stage: "on_hold",
      },
      {
        id: 9,
        author: "Franta Brambor",
        title: "Mega špatný",
        created: "2020-12-29 22:00:00",
        description: "RAGEY",
        deadline: "",
        stage: "in_progress",
      },
      {
        id: 10,
        author: "Franta Brambor",
        title: "Velký špatný",
        created: "2020-12-29 22:00:00",
        description: "Hahahaha",
        deadline: "",
        stage: "done",
      },
      {
        id: 11,
        author: "Franta Brambor",
        title: "Hodně špatný",
        created: "2020-12-29 22:00:00",
        description: "SADGE",
        deadline: "",
        stage: "in_progress",
      },
      {
        id: 12,
        author: "Franta Brambor",
        title: "Mega špatný",
        created: "2020-12-29 22:00:00",
        description: "RAGEY",
        deadline: "",
        stage: "done",
      },
      {
        id: 13,
        author: "Franta Brambor",
        title: "Velký špatný",
        created: "2020-12-29 22:00:00",
        description: "Hahahaha",
        deadline: "",
        stage: "in_progress",
      },
      {
        id: 14,
        author: "Franta Brambor",
        title: "Hodně špatný",
        created: "2020-12-29 22:00:00",
        description: "SADGE",
        deadline: "",
        stage: "done",
      },
      {
        id: 15,
        author: "Franta Brambor",
        title: "Mega špatný",
        created: "2020-12-29 22:00:00",
        description: "RAGEY",
        deadline: "",
        stage: "on_hold",
      },
      {
        id: 16,
        author: "Franta Brambor",
        title: "Velký špatný",
        created: "2020-12-29 22:00:00",
        description: "Hahahaha",
        deadline: "",
        stage: "done",
      },
      {
        id: 17,
        author: "Franta Brambor",
        title: "Hodně špatný",
        created: "2020-12-29 22:00:00",
        description: "SADGE",
        deadline: "",
        stage: "almost_finished",
      },
      {
        id: 18,
        author: "Franta Brambor",
        title: "Mega špatný",
        created: "2020-12-29 22:00:00",
        description: "RAGEY",
        deadline: "",
        stage: "in_progress",
      },
      {
        id: 19,
        author: "Franta Brambor",
        title: "Velký špatný",
        created: "2020-12-29 22:00:00",
        description: "Hahahaha",
        deadline: "",
        stage: "in_progress",
      },
      {
        id: 20,
        author: "Franta Brambor",
        title: "Hodně špatný",
        created: "2020-12-29 22:00:00",
        description: "SADGE",
        deadline: "",
        stage: "on_hold",
      },
      {
        id: 21,
        author: "Franta Brambor",
        title: "Mega špatný",
        created: "2020-12-29 22:00:00",
        description: "RAGEY",
        deadline: "",
        stage: "almost_finished",
      },
      {
        id: 22,
        author: "Franta Brambor",
        title: "Velký špatný",
        created: "2020-12-29 22:00:00",
        description: "Hahahaha",
        deadline: "",
        stage: "done",
      },
      {
        id: 23,
        author: "Franta Brambor",
        title: "Hodně špatný",
        created: "2020-12-29 22:00:00",
        description: "SADGE",
        deadline: "",
        stage: "done",
      },
      {
        id: 24,
        author: "Franta Brambor",
        title: "Mega špatný",
        created: "2020-12-29 22:00:00",
        description: "RAGEY",
        deadline: "",
        stage: "not_started",
      },
    ],
    removeModal: {
      modal: false,
      modalValue: null,
      removeUserId: null,
      removeUserName: "",
    },

    changeRoleModal: {
      modal: false,
      modalValue: null,
      userId: null,
      userName: "",
      userRole: "",
    },
    addUsers: false,
    search: "",
    getSearchResult: [
      { id: 1, imgSrc: "", name: "Prokop Buben" },
      { id: 2, imgSrc: "", name: "Franta Brambor" },
      { id: 3, imgSrc: "", name: "Dáááávid" },
    ],
    showSearchResult: false,
    files: [],
    fileId: 1,
    fileRemoveId: null,
    fileBars: [],
    fileUploadInfo: "Max. velikost souboru: 10MB",
    addTask: false,
    taskName: "",
    taskDeadlineDate: "",
    taskDeadlineTime: "",
    taskComment: "",
  };

  //Načtení dat z backendu

  componentDidMount() {
    /*axios.get("/profiles").then((res) => {
      const users = res.data;
      //Uložení pole komponentů UpdateLog do this.state.logs
      const receivedData = users.map((user) => (
        <UpdateLog
          key={user.id}
          id={user.id}
          name={user.first_name}
          content={user.last_name}
          imgUrl={user.profile_pic}
        />
      ));
      this.setState({
        logs: receivedData,
      });
    });*/
  }

  //Metoda na seřazení logů a k ním příslušným komentářům, která je teď naprosto zbytečná :))))))

  /*postSorting() {
    let output = [];
    let logs = this.state.logs;
    let comments = this.state.comments;
    let usedIds = [];
    let sortedComments = [];
    let filtered = [];
    let index;
    comments.map((comment) => {
      if (!usedIds.includes(comment.props.parentId)) {
        filtered = comments.filter(
          (filter) => filter.props.parentId === comment.props.parentId
        );
        sortedComments.push(filtered);
        usedIds.push(comment.props.parentId);
      }
    });
    logs.map((log) => {
      output.push(log);
      if (usedIds.find((item) => item === log.props.id)) {
        index = usedIds.indexOf(log.props.id);
        output.push(sortedComments[index]);
      }
    });

    return output;
  }*/

  handleSearch = (event) => {
    event.preventDefault();
    //axios.post()
    //response => getSearchResult
    this.setState({
      showSearchResult: true,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleCloseAddUserForm = () => {
    scroll.scrollToTop();
    this.setState({
      addUsers: false,
      showSearchResult: false,
    });
  };

  handleCloseAddTaskForm = () => {
    scroll.scrollToTop();
    this.setState({
      addTask: false,
    });
  };

  handleSubmitAddTask = (event) => {
    event.preventDefault();
    //axios.stuff
  };

  handleAddUserForm = () => {
    this.setState({
      addUsers: true,
      addTask: false,
      addPost: false,
    });
  };

  handleSubmitAddUsers = (event) => {
    event.preventDefault();
    //axios.stuff
  };

  handleAddTask = () => {
    this.setState({
      addTask: true,
      addUsers: false,
      addPost: false,
    });
  };

  handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const fileType = file.type;
    const maxFileSize = 10485760;
    let fileArr = [];
    let fileObj = {};

    //MAXIMÁLNÍ VELIKOST OBRÁZKU - 10MB

    if (file.size < maxFileSize) {
      //Metoda nahrávání souboru jako base64 string(oof)

      const reader = new FileReader();
      reader.onload = () => {
        fileObj = {
          id: this.state.fileId,
          fileName: file.name,
          fileSrc: reader.result,
          fileType: fileType,
        };
        fileArr.push(fileObj);
        this.setState({
          files: this.state.files.concat(fileArr),
          fileId: this.state.fileId + 1,
          fileUploadInfo: "Max. velikost souboru: 10MB",
        });
        this.fileBarMap();
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      this.setState({
        fileUploadInfo: "Soubor přesahuje limit 10MB",
      });
    }
  };

  fileBarMap() {
    const files = this.state.files;
    const fileBars = files.map((file) => (
      <FileBar
        key={file.id}
        id={file.id}
        name={file.fileName}
        type={file.fileType}
        handleRemove={(id) => {
          this.setState({
            fileRemoveId: id,
          });
          this.fileRemove();
        }}
      />
    ));
    this.setState({
      fileBars: fileBars,
    });
  }

  getModalValue = (value, type) => {
    if (type === "remove") {
      this.setState((prevState) => ({
        removeModal: {
          ...prevState.removeModal,
          modal: false,
          modalValue: value,
        },
      }));
    }
    if (type === "changeRole") {
      this.setState((prevState) => ({
        changeRoleModal: {
          ...prevState.changeRoleModal,
          modal: false,
          modalValue: value,
        },
      }));
    }
  };

  fileRemove() {
    //lehce rozbité, but not my fault
    const filesArr = [...this.state.files];
    const fileBarsArr = [...this.state.fileBars];
    const fileIndex = filesArr.findIndex(
      (file) => file.id === this.state.fileRemoveId
    );
    const fileBarIndex = fileBarsArr.findIndex(
      (fileBar) => fileBar.props.id === this.state.fileRemoveId
    );
    filesArr.splice(fileIndex, 1);
    fileBarsArr.splice(fileBarIndex, 1);
    this.setState({
      files: filesArr,
      fileBars: fileBarsArr,
    });
  }

  render() {
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
                  <th colSpan={12}>Výsledky vyhledávání</th>
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

    let addUser;
    if (this.state.addUsers) {
      addUser = (
        <div className="card center m-5 px-3 py-3 bg-dark border-primary text-white">
          <div className="ml-auto">
            <button className="btn mb-4" onClick={this.handleCloseAddUserForm}>
              <i
                className="fa fa-times fa-2x"
                aria-hidden="true"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
          <form onSubmit={this.handleSubmitAddUsers}>
            <div className="form-group row justify-content-center">
              <div className="col-10 input-group">
                <input
                  type="text"
                  name="search"
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
    } else {
      addUser = "";
    }

    let addTask;
    let cur_date = new Date();
    let min_date_deadline;
    let month = cur_date.getMonth() + 1;
    let day = cur_date.getDate();
    let year = cur_date.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    min_date_deadline = [year, month, day].join("-");

    let infoColour;
    if (this.state.fileUploadInfo === "Max. velikost souboru: 10MB") {
      infoColour = "form-text";
    } else {
      infoColour = "form-text text-danger";
    }

    if (this.state.addTask) {
      addTask = (
        <div className="card center m-5 p-3 bg-dark border-primary text-white">
          <div className="ml-auto">
            <button className="btn mb-4" onClick={this.handleCloseAddTaskForm}>
              <i
                className="fa fa-times fa-2x"
                aria-hidden="true"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
          <form onSubmit={this.handleSubmitAddTask}>
            <div className="form-group row justify-content-center">
              <div className="col-10 input-group">
                {/*MAX 50 ZNAKŮ */}
                <input
                  type="text"
                  name="taskName"
                  className="border-primary form-control"
                  placeholder="Zadejte název úkolu"
                  value={this.state.taskName}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="form-group row justify-content-center">
              <div className="col-2">
                <label className="col-form-label col-form-label-lg">
                  Termín
                </label>
              </div>
              <div className="col-5 input-group">
                <input
                  type="date"
                  name="taskDeadlineDate"
                  className="border-primary form-control"
                  value={this.state.taskDeadlineDate}
                  min={min_date_deadline}
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="col-3 input-group">
                <input
                  type="time"
                  name="taskDeadlineTime"
                  className="border-primary form-control"
                  value={this.state.taskDeadlineTime}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="form-group row justify-content-center">
              <div className="col-10">
                <textarea
                  type="text"
                  name="taskComment"
                  className="border-primary form-control"
                  placeholder="Zadejte popisek úkolu"
                  maxLength={300}
                  rows={4}
                  value={this.state.taskComment}
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>
            <div className="form-group row justify-content-center">
              <div className="col-10">
                <div className="custom-file">
                  <input
                    type="file"
                    name="files"
                    id="board_files"
                    className="border-primary form-control custom-file-input"
                    onChange={this.handleFileSelect}
                  ></input>
                  <label className="custom-file-label">Nahrát soubor</label>
                </div>
                <small className={infoColour}>
                  {this.state.fileUploadInfo}
                </small>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">{this.state.fileBars}</div>
            </div>
            <SubmitButton text="Přidat úkol" />
          </form>
        </div>
      );
    } else {
      addTask = "";
    }

    return (
      <div>
        <UserRemoveModal
          show={this.state.removeModal.modal}
          onHide={() => {
            this.setState((prevState) => ({
              removeModal: {
                ...prevState.removeModal,
                modal: false,
              },
            }));
          }}
          value={this.getModalValue}
          name={this.state.removeModal.removeUserName}
        />
        <UserChangeRoleModal
          show={this.state.changeRoleModal.modal}
          onHide={() => {
            this.setState((prevState) => ({
              changeRoleModal: {
                ...prevState.changeRoleModal,
                modal: false,
              },
            }));
          }}
          value={this.getModalValue}
          userRole={this.state.changeRoleModal.userRole}
          name={this.state.changeRoleModal.userName}
        />
        <Navbar isLoggedIn={true} />
        <div className="wrapper">
          <Sidebar
            users={this.state.users}
            handleRemoveUser={(id, name) => {
              this.setState((prevState) => ({
                removeModal: {
                  ...prevState.removeModal,
                  modal: true,
                  removeUserId: id,
                  removeUserName: name,
                },
              }));
            }}
            handleChangeUserRole={(id, name, role) => {
              this.setState((prevState) => ({
                changeRoleModal: {
                  ...prevState.changeRoleModal,
                  modal: true,
                  userId: id,
                  userName: name,
                  userRole: role,
                },
              }));
            }}
          />
          <div className="container">
            <div className="row center p-3 m-5">
              <div className="col-12">
                {/*Název boardu*/}
                <h1>Tabule</h1>
              </div>
            </div>
            <Board tasks={this.state.tasks} />
            <div className="row center p-3 m-4">
              <div className="col-6">
                <ScrollLink
                  activeClass="active"
                  to="addUser"
                  smooth={true}
                  duration={600}
                >
                  <button
                    className="btn btn-success p-2 px-3"
                    onClick={this.handleAddUserForm}
                  >
                    <i
                      className="fa fa-user-plus p-1 m-1"
                      aria-hidden="true"
                    ></i>
                    Přidat uživatele
                  </button>
                </ScrollLink>
              </div>
              <div className="col-6">
                <ScrollLink
                  activeClass="active"
                  to="addTask"
                  smooth={true}
                  duration={600}
                >
                  <button
                    className="btn btn-success p-2 px-3"
                    onClick={this.handleAddTask}
                  >
                    <i className="fa fa-plus p-1 m-1" aria-hidden="true"></i>{" "}
                    Přidat úkol
                  </button>
                </ScrollLink>
              </div>
            </div>
            <div name="addUser">{addUser}</div>
            <div name="addTask">{addTask}</div>
            <div className="row p-3 m-5">
              <div className="col-12">{this.state.logs}</div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Main;
