import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

class Task extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <h1>Hahahah</h1>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Task;
