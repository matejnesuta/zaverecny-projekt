import React, { Component } from "react";
import { Link } from "react-router-dom";

class UpdateLog extends Component {
  state = {};

  render() {
    return (
      <div className="row logs m-1 mt-2 bg-dark text-white border-light">
        <div className="col-12">
          <Link to={`/users/${this.props.id}`} style={{ color: "white" }}>
            <div className="logs-header">
              <img
                src={this.props.imgSrc}
                alt="profile_pic"
                className="rounded-circle m-2 mr-4"
                width="40"
                height="40"
              />
              {this.props.author}
            </div>
          </Link>
          <br />
          {/*Odkaz na stránku úkolu*/}
          <Link to={`/tasks/${this.props.id}`} style={{ color: "white" }}>
            <div className="ml-5">{this.props.author} přidal úkol {this.props.taskName}.</div>
          </Link>
        </div>
        <br />
        <div className="logs-footer ml-auto px-2 p-1 text-muted">
          {this.props.timestamp}
        </div>
      </div>
    );
  }
}

export default UpdateLog;
