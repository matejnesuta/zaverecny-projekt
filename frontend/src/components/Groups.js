import React, { Component } from "react";
//import { RouteComponentProps } from "react-router-dom";
import Group from "./Group";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/actions";
import axios from "axios";

class Groups extends Component {
  state = {
    groups: [
      <Group key={1} id={1} name="1" />,
      <Group key={2} id={2} name="2" />,
      <Group key={3} id={3} name="3" />,
      <Group key={4} id={4} name="4" />,
      <Group key={5} id={5} name="5" />,
      <Group key={6} id={6} name="6" />,
    ],
  };

  //Načtení skupin uživatele
  componentDidMount() {
    /*axios.get("/app/board/").then((res) => {
      const groups = res.data;
      //Uložení pole komponentů Group do this.state.groups
      const receivedData = groups.map((group) => (
        <Group key={group.id} id={group.id} name={group.name} />
      ));
      this.setState({
        logs: receivedData,
      });
    });*/
    fetch("https://jsonplaceholder.typicode.com/users/2")
      .then((response) => response.json())
      .then((data) => this.props.getUser(data));
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-4">
            <div className="col-12">
              <div className="p-3 m-4">
                <h1>Vaše skupiny</h1>
              </div>
            </div>
          </div>
          <div className="row center p-3 m-4 justify-content-center">
            {this.state.groups}
          </div>
          <div className="row center p-3 m-4">
            <div className="col-12">
              <button className="btn btn-success p-2">
                <i className="fa fa-plus m-1" aria-hidden="true"></i> Vytvořit
                skupinu
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { getUser })(Groups);
