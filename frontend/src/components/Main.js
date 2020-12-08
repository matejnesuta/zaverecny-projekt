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
    logs: [
      <UpdateLog key={1} id={1} imgSrc={woke} name="Prokop" content="GG" />,
      <UpdateLog key={5} id={5} imgSrc={woke} name="Buben" content="WP" />,
      <UpdateLog key={7} id={7} imgSrc={woke} name="Lukáš" content="GLHF" />,
    ],
    comments: [
      <LogComment
        key={1}
        id={1}
        parentId={1}
        imgSrc={woke}
        name="Šustr"
        content="LOL"
      />,
      <LogComment
        key={2}
        id={2}
        parentId={1}
        imgSrc={woke}
        name="Honza"
        content="XD"
      />,
      <LogComment
        key={3}
        id={3}
        parentId={1}
        imgSrc={woke}
        name="Brambor"
        content="MonkaS"
      />,
      <LogComment
        key={4}
        id={4}
        parentId={5}
        imgSrc={woke}
        name="Šustr"
        content="LOL"
      />,
      <LogComment
        key={5}
        id={5}
        parentId={7}
        imgSrc={woke}
        name="Honza"
        content="XD"
      />,
      <LogComment
        key={6}
        id={6}
        parentId={7}
        imgSrc={woke}
        name="Brambor"
        content="MonkaS"
      />,
    ],
  };

  //Načtení dat z backendu

  /*componentDidMount() {
    axios.get("/profiles").then((res) => {
      const users = res.data;
      //Uložení pole komponentů UpdateLog do this.state.logs
      const receivedData = users.map((user) => (
        <UpdateLog
          key={user.id}
          id={user.id}
          name={user.first_name}
          content={user.last_name}
          imgUrl={user.profile_pic}
        />
      ));
      this.setState({
        logs: receivedData,
      });
    });
  }*/

  //Metoda na seřazení logů a k ním příslušným komentářům

  postSorting() {
    let output = [];
    let logs = this.state.logs;
    let comments = this.state.comments;
    let usedIds = [];
    let sortedComments = [];
    let filtered = [];
    let index;
    comments.map((comment) => {
      if (!usedIds.includes(comment.props.parentId)) {
        filtered = comments.filter(
          (filter) => filter.props.parentId === comment.props.parentId
        );
        sortedComments.push(filtered);
        usedIds.push(comment.props.parentId);
      }
    });
    logs.map((log) => {
      output.push(log);
      if (usedIds.find((item) => item === log.props.id)) {
        index = usedIds.indexOf(log.props.id);
        output.push(sortedComments[index]);
      }
    });

    return output;
  }

  render() {
    console.log(this.state.logs);
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="p-3 m-5">
            <Board />
          </div>
          <div className="row p-3 m-5">
            <div className="col-12">{this.postSorting()}</div>
          </div>
          <div className="row center p-3 m-4">
            <div className="col-12">
              <button className="btn btn-success p-2">
                <i className="fa fa-plus m-1" aria-hidden="true"></i> Přidat
                příspěvek
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
