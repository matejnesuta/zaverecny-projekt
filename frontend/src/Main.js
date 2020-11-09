import React, { Component } from "react";
import Calendar from "./Calendar";
import UpdateLog from "./UpdateLog";
import Navbar from "./Navbar";
import woke from "./images/woke.jpg";
import user_icon from "./images/user_icon.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

class Main extends Component {
  state = {
    logs: [],
  };

  /*
  Loading data from database with axios.get
  
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
*/
  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div>
            <Calendar />
            <UpdateLog imgUrl={woke} name="GodJ" content="hahahhahahah" />
          </div>
          <div>{this.state.logs}</div>
          <hr />
        </div>
      </div>
    );
  }
}

export default Main;
