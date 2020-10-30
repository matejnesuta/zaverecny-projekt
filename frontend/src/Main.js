import React, { Component } from "react";
import Calendar from "./Calendar";
import UpdateLog from "./UpdateLog";
import woke from "./images/woke.jpg";
import fanda from "./images/unnamed.jpg";
import { Link } from "react-router-dom";

class Main extends Component {
  state = {
    logs: [],
  };

  /*
  Loading data from database with axios.get
  */
  componentDidMount() {
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
                      <i className="fa fa-home" aria-hidden="true"></i> Hlavní
                      stránka
                    </Link>

                    <Link className="dropdown-item" to="/profile">
                      <i className="fa fa-cog" aria-hidden="true"></i> Upravit
                      profil
                    </Link>

                    <Link className="dropdown-item" to="/login">
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                      Odhlásit se
                    </Link>
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
            <UpdateLog
              imgUrl={woke}
              name={this.state.username[0]}
              content={this.state.content[0]}
            />
            <UpdateLog
              imgUrl={fanda}
              name={this.state.username[1]}
              content={this.state.content[1]}
            />
          </div>
          <hr />
          <footer>
            <div class="row">
              <div class="col-12">
                <p>&copy; Le epique programué teamé 2020</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Main;
