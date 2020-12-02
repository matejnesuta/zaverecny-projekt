import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

class UserPage extends Component {
  state = {};

  // Nahrání údajů o uživateli (jméno, příjmení, obrázek, popisek atd.)
  //componentDidMount() {}

  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <h1>#Uživatel</h1>
          <hr />
          <Footer />
        </div>
      </div>
    );
  }
}

export default UserPage;
