import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LogComment from "./LogComment";
import SubmitButton from "./SubmitButton";
import FileBar from "./FileBar";
import FileBarView from "./FileBarView";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import woke from "../images/woke.jpg";

class Task extends Component {
  state = {
    comments: [
      <LogComment
        key={1}
        id={1}
        parentId={1}
        imgSrc={woke}
        name="Šustr"
        content="LOL"
      />,
      <LogComment
        key={2}
        id={2}
        parentId={1}
        imgSrc={woke}
        name="Honza"
        content="XD"
      />,
    ],
    editTask: false,
    taskName: "",
    taskDeadlineDate: "",
    taskDeadlineTime: "",
    taskComment: "",
    taskStage: "",
    fileUploadInfo: "Max. velikost souboru: 10MB",
    files: [],
    fileId: 1,
    fileBars: [],
  };

  //Nahrání údajů o úkolu a komentářů

  componentDidMount() {}

  editTask = () => {
    this.setState({
      editTask: true,
    });
  };

  handleSubmitEditTask = (event) => {
    event.preventDefault();
  };

  handleCloseEditTaskForm = () => {
    scroll.scrollToTop();
    this.setState({
      editTask: false,
    });
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
    let editTask;
    let cur_date = new Date();
    let min_date_deadline;
    let month = (cur_date.getMonth() + 1).toString();
    let day = cur_date.getDate().toString();
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

    if (this.state.editTask) {
      editTask = (
        <div className="card center m-5 p-3 bg-dark border-primary text-white">
          <div className="ml-auto">
            <button className="btn mb-4" onClick={this.handleCloseEditTaskForm}>
              <i
                className="fa fa-times fa-2x"
                aria-hidden="true"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
          <form onSubmit={this.handleSubmitEditTask}>
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
                <select
                  className="form-control"
                  name="taskStage"
                  value={this.state.taskStage}
                  onChange={this.handleChange}
                >
                  <option value="" disabled defaultValue>
                    Změňte fázi úkolu
                  </option>
                  <option value="not_started">Neodstartováno</option>
                  <option value="in_progress">V průběhu</option>
                  <option value="on_hold">Pozastaveno</option>
                  <option value="almost_finished">Dokončuje se</option>
                  <option value="done">Hotovo</option>
                </select>
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
            <SubmitButton text="Potvrdit" />
          </form>
        </div>
      );
    } else {
      editTask = "";
    }

    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-5">
            <div className="col-12">
              <h2>Task name</h2>
            </div>
          </div>
          <div className="card m-5 p-5 bg-dark border-primary text-white">
            <div className="row">
              <div className="col-12">
                <div className="p-3 my-3 task-card">Autor:</div>
                <div className="p-3 my-3 task-card">Termín:</div>
                <div className="p-3 my-3 task-card">Fáze:</div>
                <div className="p-3 my-3 task-card">
                  Popisek:
                  <br />
                  <div style={{ fontSize: "0.9em" }}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                      natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus. Donec quam felis, ultricies nec,
                      pellentesque eu, pretium quis, sem. Nulla consequat massa
                      quis enim. Donec.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-5 p-3 task-card">
              <div className="p-2">
                <i className="fa fa-paperclip mr-2" aria-hidden="true"></i>
                Přiložené soubory:
              </div>
              <br />
              <FileBarView name="xd" type="image/jpeg" />
              <FileBarView name="haha" type="text/plain" />
            </div>
          </div>
          <div className="row p-3 m-3 center">
            <div className="col-12">
              <ScrollLink
                activeClass="active"
                to="editTask"
                smooth={true}
                duration={600}
              >
                <button
                  className="btn btn-success p-1 px-3"
                  onClick={this.editTask}
                >
                  <i className="fa fa-clipboard p-1 m-1" aria-hidden="true"></i>
                  Upravit úkol
                </button>
              </ScrollLink>
            </div>
          </div>
          <div name="editTask">{editTask}</div>
          <div className="row center p-2">
            <div className="col-12">
              <h3>Komentáře</h3>
            </div>
          </div>
          <div className="row p-3 m-3">
            <div className="col-12">{this.state.comments}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Task;
