import React, { Component } from "react";
import { Link } from "react-router-dom";

class Group extends Component {
  state = {};

  render() {
    return (
      <div className="col-2 btn btn-squared-default border-primary p-4">
        <Link className="" to="/">
          <i className="fa fa-bong fa-5x"></i>
          <br />
          {this.props.name}
          <br />
        </Link>
      </div>
    );
  }
}

export default Group;
