import React, { Component } from "react";

class UpdateLog extends Component {
  state = {};
  render() {
    return (
      <div className="row m-1 logs">
        <div className="col-12">
          <p className="logs_header">
            <img
              src={this.props.imgUrl}
              alt="profile_pic"
              className="rounded-circle m-2 mr-4"
              width="40"
              height="40"
            />
            {this.props.name}
          </p>
          <div className="ml-5 m-2 logs_body">{this.props.content}</div>
        </div>
      </div>
    );
  }
}

export default UpdateLog;
