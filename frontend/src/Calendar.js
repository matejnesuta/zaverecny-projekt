import React, { Component } from "react";
import CalendarDay from "./CalendarDay";

class Calendar extends Component {
  state = {
    month: [
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

  handleClickLeft = () => {
    if (this.state.monthIndex === 0) {
      this.setState({
        monthIndex: 11,
      });
      this.setState({
        year: this.state.year - 1,
      });
    } else {
      this.setState({
        monthIndex: this.state.monthIndex - 1,
      });
    }
  };

  handleClickRight = () => {
    if (this.state.monthIndex === 11) {
      this.setState({
        monthIndex: 0,
      });
      this.setState({
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
      <div className="row m-4">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="row">
                    <div className="col-2">
                      <button
                        id="mnth_left"
                        className="btn"
                        onClick={this.handleClickLeft}
                      >
                        <i
                          className="fa fa-angle-left fa-4x"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                    <div className="col-8 text-center">
                      <h3 className="display-4 ">
                        {this.state.month[this.state.monthIndex] +
                          " " +
                          this.state.year}
                      </h3>
                    </div>
                    <div className="col-2 text-right">
                      <button
                        id="mnth_right"
                        className="btn"
                        onClick={this.handleClickRight}
                      >
                        <i
                          className="fa fa-angle-right fa-4x"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <div className="row m-2">
                  <div className="col-12">
                    <CalendarDay />
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Calendar;
