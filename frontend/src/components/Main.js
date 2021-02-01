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
import { RouteComponentProps } from "react-router";
import store from "../redux/store";
import axios from "axios";

class Main extends Component {
  state = {
    boardName: "",
    logs: [
      <UpdateLog
        key={1}
        id={1}
        imgSrc={woke}
        author="Prokop Buben"
        taskName="Dobrý den"
        timestamp="21. 12. 2020"
      />,
      <UpdateLog
        key={5}
        id={5}
        imgSrc={woke}
        author="Patrik Love"
        taskName="Hezký večer"
        timestamp="22. 12. 2020"
      />,
      <UpdateLog
        key={7}
        id={7}
        imgSrc={woke}
        author="Lukáš Šustr"
        taskName="Dobré ráno"
        timestamp="23. 12. 2020"
      />,
    ],
    users: [],
    //deadline - date format
    tasks: [],
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
    taskDeadline: "",
    taskComment: "",
  };

  //Načtení dat z backendu

  componentDidMount() {
    axios
      .get("/app/board/users/" + this.props.match.params.id + "/", {
        headers: { Authorization: "Token " + store.getState().token.token },
      })
      .then((res) => {
        const users = res.data;
        //Uložení pole komponentů UpdateLog do this.state.logs
        const receivedData = users.map((user) => ({
          key: user.profile.id,
          id: user.profile.id,
          first_name: user.profile.first_name,
          last_name: user.profile.last_name,
          profile_pic: user.profile.profile_pic,
          role: user.role,
        }));
        this.setState({
          users: receivedData,
        });
      });

    axios.get("/app/board/current/" + this.props.match.params.id + "/",
      { headers: { Authorization: "Token " + store.getState().token.token }, })
      .then((res) => {
        const boardName = res.data.name;
        this.setState({
          boardName: boardName
        });
      })

    axios.get("/app/board/detail/" + this.props.match.params.id + "/",
      { headers: { Authorization: "Token " + store.getState().token.token }, })
      .then((res) => {
        const tasks = res.data;
        const receivedData = tasks.map((task) => ({
          key: task.id,
          id: task.id,
          authorId: task.author.id,
          author: task.author.first_name + " " + task.author.last_name,
          title: task.title,
          description: task.description,
          deadline: task.deadline,
          stage: task.stage,
        }));
        this.setState({
          tasks: receivedData
        });
      })
  }

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
    axios.post("/app/task/create/", { headers: { Authorization: "Token " + store.getState().token.token } },
      {
        title: this.state.taskName, deadline: this.state.taskDeadline, description: this.state.taskComment, stage: "in_progress", taskboard: this.props.match.params.id
      }).then((res) => { console.log(res) });
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

  removeUser() {
    if (this.state.removeModal.modalValue) {
      console.log(
        this.state.removeModal.removeUserId,
        parseInt(this.props.match.params.id, 10)
      );
      axios
        .delete(
          "app/board/manage-user/",
          {
            headers: { Authorization: "Token " + store.getState().token.token },
          },
          {
            profile: this.state.removeModal.removeUserId,
            taskboard: parseInt(this.props.match.params.id, 10),
          }
        )
        .catch((error) => {
          console.log(error);
        });
    }
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
      this.removeUser();
    }
    if (type === "changeRole") {
      this.setState((prevState) => ({
        changeRoleModal: {
          ...prevState.changeRoleModal,
          modal: false,
          modalValue: value,
        },
      }));
      axios.get("/board/deatail/board.id").then((res) => {
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
      });
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
    console.log(this.state.tasks);
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
              <div className="col-8 input-group">
                <input
                  type="date"
                  name="taskDeadline"
                  className="border-primary form-control"
                  value={this.state.taskDeadline}
                  min={min_date_deadline}
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
            //callback funkce, posílána do child komponentu jako parametr (prop)
            handleRemoveUser={(id, name) => {
              //při zavolání se otevře modální okno a získá se ID a jméno uživatele, který má být odebrán ze skupiny, a uloží se do state
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
                <h1>{this.state.boardName}</h1>
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
