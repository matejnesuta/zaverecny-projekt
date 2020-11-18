import React, { Component } from "react";
import Group from "./Group";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

class Groups extends Component {
  state = {
    groups: [],
  };

  componentDidMount() {
    axios.get("/app/board/").then((res) => {
      const groups = res.data;
      //Uložení pole komponentů Group do this.state.groups
      const receivedData = groups.map((group) => (
        <Group key={group.id} name={group.name} />
      ));
      this.setState({
        logs: receivedData,
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="m-4">
                <h2 className="display-4">Groups</h2>
              </div>
              <div className="row">{this.state.groups}</div>
            </div>
          </div>
          <hr />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Groups;
