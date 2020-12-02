import React, { Component } from "react";
import { Link } from "react-router-dom";

class Group extends Component {
  state = {};

  render() {
    return (
      <div className="col-3 btn btn-squared-default border-primary m-3 px-2 py-4 bg-dark">
        <Link
          className=""
          to={`/groups/${this.props.name}`}
          style={{ color: "white" }}
        >
          <i className="fa fa-group fa-5x"></i>
          <br />
          <div className="mt-3 group-name">{this.props.name}</div>
          <br />
        </Link>
      </div>
    );
  }
}

export default Group;
