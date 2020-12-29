import React, { Component } from "react";

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

  handleRemoveFile = () => {
    this.props.handleRemove(this.props.id);
  };

  render() {
    let iconType = "fa fa-" + this.state.icon + " pt-2 mr-5";
    return (
      <div className="row p-1 mx-1 my-2 center justify-content-center filebar">
        <div className="col-1">
          <i className={iconType} aria-hidden="true"></i>
        </div>
        <div className="col-8 p-1">{this.props.name}</div>
        <div className="col-1">
          <button className="btn ml-4" onClick={this.handleRemoveFile}>
            <i
              className="fa fa-times"
              style={{ color: "white" }}
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    );
  }
}

export default FileBar;
