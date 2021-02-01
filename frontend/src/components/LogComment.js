import React, { Component } from "react";
import { Link } from "react-router-dom";

class LogComment extends Component {
  state = {};

  dateChange(input) {
    let splitInput = input.split(" ");
    let date = splitInput[0];
    let time = splitInput[1];
    let splitDate = date.split("-");
    let splitTime = time.split(":");
    let finalDate = splitDate[2] + ". " + splitDate[1] + ". " + splitDate[0];
    let finalTime = splitTime[0] + ":" + splitTime[1];
    return finalDate + " " + finalTime;
  }

  render() {
    return (
      <div className="row justify-content-end m-1">
        <div className="col-11 comments bg-dark text-white">
          <Link to={`/users/${this.props.author.authorId}`} style={{ color: "white" }}>
            <div className="logs-header">
              <img
                src={this.props.author.profile_pic}
                alt="profile_pic"
                className="rounded-circle m-2 mr-4"
                width="40"
                height="40"
              />
              {this.props.author.first_name}{" "}{this.props.last_name}
            </div>
          </Link>
          <br />
          <div className="ml-5 mb-2">{this.props.content}</div>
        </div>
        <br />
        <div className="logs-footer ml-auto px-2 p-1 text-muted">
          {this.dateChange(this.props.timestamp)}
        </div>
      </div>
    );
  }
}

export default LogComment;
