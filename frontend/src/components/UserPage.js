import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import woke from "../images/woke.jpg";
import store from "../redux/store";

class UserPage extends Component {
  state = {};

  // Nahrání údajů o uživateli podle id (jméno, příjmení, obrázek, popisek atd.)
  //componentDidMount() {}

  //Testování s daty ze storu! Normálně se budou získávat requestem

  render() {
    console.log(window.navigator.userAgent);
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="card center p-5 m-5 bg-dark border-primary text-white">
            <div className="row p-5 m-2">
              <div className="col-4">
                <img
                  src={store.getState().user.user.imageSrc}
                  alt="nefunguje to xd"
                  width={120}
                  height={120}
                  className="rounded-circle"
                />
              </div>
              <div className="col-8">
                <h2>
                  {store.getState().user.user.firstName}{" "}
                  {store.getState().user.user.lastName}
                </h2>
              </div>
            </div>
            <div className="row center p-3 m-2">
              <div className="col-12">
                <div className="border-primary p-4 user-card">
                  <p>{store.getState().user.user.comment}</p>
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
