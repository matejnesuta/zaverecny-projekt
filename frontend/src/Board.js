import React, { Component } from "react";

class Board extends Component {
  state = {
    months: [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec",
    ],
    monthIndex: 9,
    year: 2020,
  };

  handleYearClickLeft = () => {
    this.setState({
      year: this.state.year - 1,
    });
  };

  handleYearClickRight = () => {
    this.setState({
      year: this.state.year + 1,
    });
  };

  handleMonthClickLeft = () => {
    if (this.state.monthIndex === 0) {
      this.setState({
        monthIndex: 11,
        year: this.state.year - 1,
      });
    } else {
      this.setState({
        monthIndex: this.state.monthIndex - 1,
      });
    }
  };

  handleMonthClickRight = () => {
    if (this.state.monthIndex === 11) {
      this.setState({
        monthIndex: 0,
        year: this.state.year + 1,
      });
    } else {
      this.setState({
        monthIndex: this.state.monthIndex + 1,
      });
    }
  };

  render() {
    return (
      <div>
        <div className="row m-4">
          <div className="col-1 text-left">
            <button
              id="year_left"
              className="btn"
              onClick={this.handleYearClickLeft}
            >
              <i
                className="fa fa-angle-double-left fa-4x"
                aria-hidden="true"
              ></i>
            </button>
          </div>
          <div className="col-1 text-left">
            <button
              id="mnth_left"
              className="btn"
              onClick={this.handleMonthClickLeft}
            >
              <i className="fa fa-angle-left fa-4x" aria-hidden="true"></i>
            </button>
          </div>
          <div className="col-8 text-center">
            <h3 className="display-4 ">
              {this.state.months[this.state.monthIndex] + " " + this.state.year}
            </h3>
          </div>
          <div className="col-1 text-right">
            <button
              id="mnth_right"
              className="btn"
              onClick={this.handleMonthClickRight}
            >
              <i className="fa fa-angle-right fa-4x" aria-hidden="true"></i>
            </button>
          </div>
          <div className="col-1 text-right">
            <button
              id="year_right"
              className="btn"
              onClick={this.handleYearClickRight}
            >
              <i
                className="fa fa-angle-double-right fa-4x"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
        <div className="row m-4">
          <div className="col-12">
            <table className="table">
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
