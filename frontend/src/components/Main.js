import React, { Component } from "react";
import Board from "./Board";
import UpdateLog from "./UpdateLog";
import LogComment from "./LogComment";
import Navbar from "./Navbar";
import Footer from "./Footer";
import woke from "../images/woke.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

class Main extends Component {
  state = {
    logs: [],
  };

  //Načtení dat z backendu

  /*componentDidMount() {
    axios.get("/profiles").then((res) => {
      const users = res.data;
      //Uložení pole komponentů UpdateLog do this.state.logs
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
  */
  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div>
            <Board />
            <UpdateLog imgUrl={woke} name="GodJ" content="hahahhahahah" />
            <LogComment imgUrl={woke} name="ScoutJ" content="xdxdxdxdddxd" />
          </div>
          <div>{this.state.logs}</div>
          <hr />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Main;
