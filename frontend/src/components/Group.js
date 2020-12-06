import React, { Component } from "react";
import { Link } from "react-router-dom";

class Group extends Component {
  state = {};

  render() {
    return (
      <div
        className="col-3 btn btn-squared-default m-2 px-2 py-5 bg-dark"
        style={{ border: "#209cee 1px solid" }}
      >
        <Link to={`/groups/${this.props.id}`} style={{ color: "white" }}>
          <i className="fa fa-group fa-5x"></i>
          <br />
          <div className="mt-3 group-name">{this.props.name}</div>
        </Link>
      </div>
    );
  }
}

export default Group;
