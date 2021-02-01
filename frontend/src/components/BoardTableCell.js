import React, { Component } from "react";
import { Link } from "react-router-dom";

class BoardTableCell extends Component {
  state = {};

  dateChange(input) {
    let splitDate = input.split("-");
    let finalDate = splitDate[2] + ". " + splitDate[1] + ". " + splitDate[0];
    return finalDate;
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
          <Link to={`/users/${this.props.data.authorId}`} style={{color: "white"}}>Autor: {this.props.data.author}</Link>
          <br />
          Termín: {this.dateChange(this.props.data.deadline)}
        </div>
      </td>
    ) : (
        <td></td>
      );
  }
}

export default BoardTableCell;
