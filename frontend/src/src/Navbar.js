import React, { Component } from "react";
import { Link } from "react-router-dom";
import user_icon from "./images/user_icon.jpg";

class Navbar extends Component {
  state = {};

  loggedIn() {
    if (this.props.isLoggedIn) {
      return (
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/#"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src={user_icon}
              alt="profile_pic"
              width="50"
              height="50"
              className="rounded-circle"
            />
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/">
              <i className="fa fa-home" aria-hidden="true"></i> Hlavní stránka
            </Link>

            <Link className="dropdown-item" to="/profile">
              <i className="fa fa-cog" aria-hidden="true"></i> Upravit profil
            </Link>

            <Link className="dropdown-item" to="/login">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              Odhlásit se
            </Link>
          </div>
        </li>
      );
    } else {
      return (
        <li className="nav-item active">
          <Link className="nav-link" style={{ color: "white" }} to="/">
            <i className="fa fa-home fa-3x" aria-hidden="true"></i>
            <span className="sr-only">(current)</span>
          </Link>
        </li>
      );
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://github.com/martindzida/zaverecny_projekt"
                >
                  Repositář projektu
                </a>
              </li>
              <li className="nav-item dropdown">
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
                    Můj
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="https://github.com/matejnesuta"
                  >
                    Matějův
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="/#">
                  Moje motivace
                </a>
              </li>
              {this.loggedIn()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
