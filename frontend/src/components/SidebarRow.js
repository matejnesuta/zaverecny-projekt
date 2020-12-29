import React, { Component } from "react";
import { Link } from "react-router-dom";
import woke from "../images/woke.jpg";

class SidebarRow extends Component {
  state = {};

  handleDelete = (event) => {
    event.preventDefault();
    this.props.handleDelete(this.props.id, this.props.name);
  };

  handleChangeRole = (event) => {
    event.preventDefault();
    this.props.handleChangeRole(
      this.props.id,
      this.props.name,
      this.props.role
    );
  };

  render() {
    let roleBadge;
    switch (this.props.role) {
      case "mod":
        roleBadge = (
          <a className="dropdown-item" href="#">
            Role:
            <span className="badge badge-success py-2 px-3 ml-5">
              Moderátor <i className="fa fa-wrench mx-2" aria-hidden="true"></i>
            </span>
          </a>
        );
        break;
      case "owner":
        roleBadge = (
          <a className="dropdown-item" href="#">
            Role:
            <span className="badge badge-warning py-2 px-3 ml-5">
              Vlastník <i className="fa fa-star mx-2" aria-hidden="true"></i>
            </span>
          </a>
        );
        break;
      case "user":
        roleBadge = (
          <a className="dropdown-item" href="#">
            Role:
            <span className="badge badge-primary py-2 px-3 ml-5">
              Uživatel <i className="fa fa-user mx-2" aria-hidden="true"></i>
            </span>
          </a>
        );
        break;
    }

    let dropDown;
    /*if (zjistit, jestli je přihlášený uživatel moderátorem nebo vlastníkem skupiny pomocí id uloženého ve storu a výpisu uživatelů (najít id uživatele v seznamu
      uživatelů skupiny a najít si jeho roli)) {
      dropDown = (<div className="col-1">
          <button
            className="btn"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {roleBadge}
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">
              <button className="btn" onClick={this.handleChangeRole}>
                Nastavit roli:
                <i className="fa fa-wrench ml-5" aria-hidden="true"></i>
              </button>
            </a>
            <a className="dropdown-item" href="#">
              <button className="btn" onClick={this.handleDelete}>
                Odebrat uživatele:
                <i className="fa fa-user-times ml-5" aria-hidden="true"></i>
              </button>
            </a>
          </div>
        </div>);
    } else {
      dropDown = (<div className="col-1">
          <button
            className="btn"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {roleBadge}
          </div>
        </div>);
    }
    */
    return (
      <div className="row py-1">
        <div className="col-2">
          <Link to={`/users/${this.props.id}`}>
            <img
              src={woke}
              alt="profile_pic"
              className="p-1 img-responsive rounded-circle"
              width={33}
              height={33}
            />
          </Link>
        </div>
        <div className="col-8">
          <Link to={`/users/${this.props.id}`} style={{ color: "white" }}>
            {this.props.name}
          </Link>
        </div>
        <div className="col-1">
          <button
            className="btn"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {roleBadge}
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">
              <button className="btn" onClick={this.handleChangeRole}>
                Nastavit roli:
                <i className="fa fa-wrench ml-5" aria-hidden="true"></i>
              </button>
            </a>
            <a className="dropdown-item" href="#">
              <button className="btn" onClick={this.handleDelete}>
                Odebrat uživatele:
                <i className="fa fa-user-times ml-5" aria-hidden="true"></i>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarRow;
