import React, { Component } from "react";

class LogComment extends Component {
  state = {};
  render() {
    return (
      <div className="row justify-content-end m-1">
        <div className="col-11 logs bg-dark text-white">
          <div className="logs_header">
            <img
              src={this.props.imgUrl}
              alt="profile_pic"
              className="rounded-circle m-2 mr-4"
              width="40"
              height="40"
            />
            {this.props.name}
          </div>
          <br />
          <div className="ml-5 mb-2">{this.props.content}</div>
        </div>
      </div>
    );
  }
}

export default LogComment;
