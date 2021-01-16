import React, { Component } from "react";
import { Link } from "react-router-dom";

class FileBar extends Component {
  state = {
    icon: "",
  };

  componentDidMount() {
    const fileType = this.props.type;
    const typeSplit = fileType.split("/");
    if (typeSplit[0] === "image") {
      this.setState({
        icon: "file-image-o",
      });
    } else {
      switch (typeSplit[1]) {
        case "pdf":
          this.setState({
            icon: "file-pdf-o",
          });
          break;
        case "msword":
          this.setState({
            icon: "file-word-o",
          });
          break;
        case "vnd.openxmlformats-officedocument.wordprocessingml.document":
          this.setState({
            icon: "file-word-o",
          });
          break;
        case "vnd.openxmlformats-officedocument.presentationml.presentation":
          this.setState({
            icon: "file-powerpoint-o",
          });
          break;
        case "vnd.ms-excel":
          this.setState({
            icon: "file-excel-o",
          });
          break;
        case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          this.setState({
            icon: "file-excel-o",
          });
          break;
        case "zip":
          this.setState({
            icon: "file-archive-o",
          });
          break;
        case "vnd.rar":
          this.setState({
            icon: "file-archive-o",
          });
          break;
        case "plain":
          this.setState({
            icon: "file-text-o",
          });
          break;
        default:
          this.setState({
            icon: "file-o",
          });
      }
    }
  }

  render() {
    let iconType = "fa fa-" + this.state.icon + " pt-2 mr-5";
    return (
      <div>
        <div className="row p-1 mx-1 my-2 center justify-content-center filebar">
          <div className="col-1">
            <i className={iconType} aria-hidden="true"></i>
          </div>
          <div className="col-9 p-1">{this.props.name}</div>
          <div className="col-2">
            <Link
              to={this.props.file}
              target="_blank"
              download={this.props.name}
            >
              <i
                className="fa fa-download"
                style={{ color: "white" }}
                aria-hidden="true"
              ></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FileBar;
