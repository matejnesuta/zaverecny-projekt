import React, { Component } from "react";
import { Link } from "react-router-dom";

class LogComment extends Component {
  state = {};
  render() {
    return (
      <div className="row justify-content-end m-1">
        <div className="col-11 comments bg-dark text-white">
          <Link to={`/users/${this.props.id}`} style={{ color: "white" }}>
            <div className="logs-header">
              <img
                src={this.props.imgSrc}
                alt="profile_pic"
                className="rounded-circle m-2 mr-4"
                width="40"
                height="40"
              />
              {this.props.name}
            </div>
          </Link>
          <br />
          <div className="ml-5 mb-2">{this.props.content}</div>
        </div>
      </div>
    );
  }
}

export default LogComment;
