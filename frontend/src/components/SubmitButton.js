import React, { Component } from "react";

class SubmitButton extends Component {
  render() {
    return (
      <div className="row m-4 mt-5">
        <div className="col-12">
          <button type="submit" className="btn btn-primary px-5">
            {this.props.text}
          </button>
        </div>
      </div>
    );
  }
}

export default SubmitButton;
