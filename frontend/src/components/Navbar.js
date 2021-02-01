import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import store from "../redux/store";
import user_icon from "../images/user_icon.jpg";

class Navbar extends Component {
  handleLogout = () => {
    axios
      .post("/auth/logout/", { key: store.getState().token.token })
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loggedIn() {
    
  }

  render() {
    let navbar;

    if (this.props.isLoggedIn) {
      navbar = (
        <nav className="navbar navbar-expand-md sticky-top">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mx-2">
              <a
                className="nav-link"
                href="https://github.com/martindzida/zaverecny_projekt"
              >
                Repositář projektu
              </a>
            </li>
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Github's
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  href="https://github.com/martindzida"
                >
                  <i className="fa fa-github mr-3" aria-hidden="true"></i>
                  Můj
                </a>
                <a
                  className="dropdown-item"
                  href="https://github.com/matejnesuta"
                >
                  <i className="fa fa-github mr-3" aria-hidden="true"></i>
                  Matějův
                </a>
              </div>
            </li>
            <li className="nav-item dropdown mx-2">
          <a
            className="nav-link dropdown-toggle"
            href="/"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src={store.getState().user.user.profile_pic}
              alt="profile_pic"
              width="40"
              height="40"
              className="rounded-circle"
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link
              className="dropdown-item text-dark"
              to={`/users/${store.getState().user.user.id}`}
            >
              {store.getState().user.user.first_name}{" "}
              {store.getState().user.user.last_name}
            </Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/groups">
              <i className="fa fa-group mx-1" aria-hidden="true"></i> Moje
              skupiny
            </Link>
            <Link className="dropdown-item" to="/profile">
              <i className="fa fa-cog mx-1" aria-hidden="true"></i> Upravit
              profil
            </Link>
            <div className="dropdown-divider"></div>
            <Link to="/login">
              <button className="dropdown-item" onClick={this.handleLogout}>
                <i className="fa fa-sign-out mx-1" aria-hidden="true"></i>
                Odhlásit se
              </button>
            </Link>
          </div>
        </li>
          </ul>
        </div>
      </nav>
        
      );
    } else {
      navbar = (
        <nav className="navbar navbar-expand-md sticky-top">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mx-2">
              <a
                className="nav-link"
                href="https://github.com/martindzida/zaverecny_projekt"
              >
                Repositář projektu
              </a>
            </li>
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Github's
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  href="https://github.com/martindzida"
                >
                  <i className="fa fa-github mr-3" aria-hidden="true"></i>
                  Můj
                </a>
                <a
                  className="dropdown-item"
                  href="https://github.com/matejnesuta"
                >
                  <i className="fa fa-github mr-3" aria-hidden="true"></i>
                  Matějův
                </a>
              </div>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/registration">
                Registrace
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/login">
                Přihlásit se
              </Link>
            </li>
            <li className="nav-item active mx-2">
          <Link className="nav-link" to="/" style={{ color: "white" }}>
            <i className="fa fa-home fa-2x" aria-hidden="true"></i>
            <span className="sr-only">(current)</span>
          </Link>
        </li>
          </ul>
        </div>
      </nav>
        
      );
    }

    return navbar;
  }
}

export default Navbar;
