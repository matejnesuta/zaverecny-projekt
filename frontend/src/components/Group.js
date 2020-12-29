import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Group extends Component {
  state = {};

  //Smazání skupiny - avšak možné pouze pro vlastníka -> zakladatele skupiny
  handleDelete = () => {
    this.props.handleDelete(this.props.id, this.props.name);
  };

  handleEdit = () => {
    this.props.handleEdit(this.props.id, this.props.name);
  };

  render() {
    let iconType = "fa fa-" + this.props.icon + " fa-5x";
    let deleteButton;
    let editButton;
    if (this.props.isOwner) {
      deleteButton = (
        <button className="btn" onClick={this.handleDelete}>
          <i className="fa fa-trash fa-2x" aria-hidden="true"></i>
        </button>
      );
      editButton = (
        <button className="btn mt-1" onClick={this.handleEdit}>
          <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
        </button>
      );
    } else {
      deleteButton = (
        <button className="btn" disabled>
          <i className="fa fa-trash fa-2x" aria-hidden="true"></i>
        </button>
      );
      editButton = (
        <button className="btn mt-1" disabled>
          <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
        </button>
      );
    }

    return (
      <div
        className="col-3 btn btn-squared-default m-3 px-2 py-2 bg-dark"
        style={{ border: "#209cee 1px solid" }}
      >
        <div className="text-right mr-1">
          {editButton}
          {deleteButton}
        </div>
        <br />
        <Link to={`/groups/${this.props.id}`} style={{ color: "white" }}>
          <div>
            <i className={iconType}></i>
          </div>
          <br />
          <div className="mt-2 pb-2 group-name">{this.props.name}</div>
        </Link>
      </div>
    );
  }
}

export default Group;
