import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import store from "../redux/store";

class UserPage extends Component {
  state = {
    user: {}
  };

  // Nahrání údajů o uživateli podle id (jméno, příjmení, obrázek, popisek atd.)
  componentDidMount() {
    axios.get("/app/profile/detail/" + this.props.match.params.id + "/", 
    { headers: { Authorization: "Token " + store.getState().token.token } })
    .then((res) => {
      const user = res.data;
      this.setState({
        user : user
      });
    })
  }

  //Testování s daty ze storu! Normálně se budou získávat requestem

  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="card center p-5 m-5 bg-dark border-primary text-white">
            <div className="row p-5 m-2">
              <div className="col-4">
                <img
                  src={this.state.user.profile_pic}
                  alt="profile_pic"
                  width={120}
                  height={120}
                  className="rounded-circle"
                />
              </div>
              <div className="col-8">
                <h2>
                  {this.state.user.first_name}{" "}
                  {this.state.user.last_name}
                </h2>
              </div>
            </div>
            <div className="row center p-3 m-2">
              <div className="col-12">
                <div className="border-primary p-4 user-card">
                  <div style={{ fontSize: "1.1em" }}>
                    <p>{this.state.user.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserPage;
