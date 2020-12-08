import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Group extends Component {
  state = {};

  //Smazání skupiny - avšak možné pouze pro vlastníka -> zakladatele skupiny
  handleDelete = () => {
    //axios.delete();
  };

  render() {
    return (
      <div
        className="col-3 btn btn-squared-default m-3 px-2 py-3 bg-dark"
        style={{ border: "#209cee 1px solid" }}
      >
        <div className="text-right mr-1">
          <button className="btn" disabled onClick={this.handleDelete}>
            <i className="fa fa-trash fa-2x" aria-hidden="true"></i>
          </button>
        </div>
        <br />
        <Link to={`/groups/${this.props.id}`} style={{ color: "white" }}>
          <div>
            <i className="fa fa-group fa-5x"></i>
          </div>
          <br />
          <div className="mt-3 group-name">{this.props.name}</div>
        </Link>
      </div>
    );
  }
}

export default Group;
