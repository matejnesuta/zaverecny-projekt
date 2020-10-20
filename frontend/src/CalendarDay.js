import React, { Component } from "react";
import Calendar from "./Calendar";

class CalendarDay extends Component {
  state = {
    day: ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"],
    dayIndex: 0,
    number: 1,
  };
  render() {
    return (
      <td>
        <button className="btn p-5">{this.state.day[0]} </button>
      </td>
    );
  }
}

export default CalendarDay;
