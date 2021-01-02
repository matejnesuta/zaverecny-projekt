import React, { Component } from "react";
import BoardTableCell from "./BoardTableCell";

class BoardTable extends Component {
  state = {};
  render() {
    let rowsData = this.props.data;
    let rowCells;
    let table = [];
    let tableRow = [];
    let tableRows = [];
    let rowId = 1;
    let cellId = 1;
    for (let i = 0; i < rowsData.length; i++) {
      //přidat key
      rowCells = rowsData[i].map((row) => <BoardTableCell data={row} />);
      table.push(rowCells);
    }

    for (let j = 0; j < table.length; j++) {
      tableRow = <tr key={rowId}>{table[j]}</tr>;
      tableRows.push(tableRow);
      rowId++;
    }

    return tableRows;
  }
}

export default BoardTable;
