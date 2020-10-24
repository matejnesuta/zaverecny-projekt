import React, { Component } from "react";
import Calendar from "./Calendar";
import UpdateLog from "./UpdateLog";
import woke from "./images/woke.jpg";
import fanda from "./images/unnamed.jpg";
import axios from "axios";

class Main extends Component {
  state = {
    logs: [],
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);

    axios.get("http://localhost:8000/profiles").then((res) => {
      const users = res.data;
      const receivedData = users.map((user) => (
        <UpdateLog
          key={user.id}
          name={user.first_name}
          content={user.last_name}
          imgUrl={user.profile_pic}
        />
      ));
      this.setState({
        logs: receivedData,
      });
    });
  }

  render() {
    if (this.state.loading === false) {
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
                        src={woke}
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <a className="dropdown-item" href="/#">
                        <i className="fa fa-home" aria-hidden="true"></i> Homepage
                      </a>
                      <a className="dropdown-item" href="/#">
                        <i className="fa fa-cog" aria-hidden="true"></i> Edit
                        Profile
                      </a>
                      <a className="dropdown-item" href="/#">
                        <i className="fa fa-sign-out" aria-hidden="true"></i> Log
                        Out
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="container">
            <div>
              <Calendar />
            </div>
            <div>
                {this.state.logs}
            </div>
            <hr />
            <footer>
              <div className="row">
                <div className="col-12">
                  <p>&copy; Le epique programué teamé 2020</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-dark">
          <p className="text-light text-center display-1 p-5">Loading...</p>
        </div>
      );
    }
  }
}

export default Main;
