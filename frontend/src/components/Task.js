import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LogComment from "./LogComment";
import woke from "../images/woke.jpg";

class Task extends Component {
  state = {
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

  //Nahrání údajů o úkolu a komentářů

  componentDidMount() {}

  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-5">
            <div className="col-12">
              <h2>Task name</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">{this.state.comments}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Task;
