import React, { Component } from "react";

class UpdateLog extends Component {
  state = {};

  handleClick = () => {};

  render() {
    return (
      <div className="row m-1 logs bg-dark text-white border-light">
        <div className="col-12">
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
          <div className="ml-5">{this.props.content}</div>
        </div>
        <br />
        <div className="logs_footer ml-auto p-1 text-muted">
          13.11 2020
          <button
            className="btn btn-sm text-light ml-2 mb-1"
            onClick={this.handleClick}
          >
            Odpovědět <i className="fa fa-reply" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default UpdateLog;
