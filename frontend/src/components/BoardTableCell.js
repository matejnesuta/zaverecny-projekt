import React, { Component } from "react";
import { Link } from "react-router-dom";

class BoardTableCell extends Component {
  state = {};

  dateChange(input) {
    let splitInput = input.split(" ");
    let date = splitInput[0];
    let time = splitInput[1];
    let splitDate = date.split("-");
    let splitTime = time.split(":");
    let finalDate = splitDate[2] + ". " + splitDate[1] + ". " + splitDate[0];
    let finalTime = splitTime[0] + ":" + splitTime[1];
    return finalDate + " " + finalTime;
  }

  render() {
    return this.props.data !== undefined ? (
      <td>
        <div className="task-name">
          <Link to={`/tasks/${this.props.data.id}`} style={{ color: "white" }}>
            {this.props.data.title}
          </Link>
        </div>
        <br />
        <div className="task-body">
          Autor: {this.props.data.author}
          <br />
          {/*deadline místo created */}
          Termín: {this.dateChange(this.props.data.created)}
        </div>
      </td>
    ) : (
      <td></td>
    );
  }
}

export default BoardTableCell;
