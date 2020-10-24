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
              width="50"
              height="50"
            />
            {this.props.name}
          </p>
          <p className="ml-5 logs_body">{this.props.content}</p>
        </div>
      </div>
    );
  }
}

export default UpdateLog;
