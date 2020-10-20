import React, { Component } from "react";
import Calendar from "./Calendar";
import axios from "axios";

class Main extends Component {
  state = {};

  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
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
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
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
                <li className="nav-item active">
                  <a className="nav-link" href="/#">
                    <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container">
          <Calendar />
        </div>
      </div>
    );
  }
}

export default Main;
