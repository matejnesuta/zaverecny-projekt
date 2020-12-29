import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

class Homepage extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar isLoggedIn={false} />
        <div className="container">
          <h1>Homepage</h1>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Homepage;
