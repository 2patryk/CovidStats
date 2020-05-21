import React, { Component } from "react";

export default class ErrorMessage extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div>
        <h2>Error</h2>
        <button onClick={onClick}>Refresh</button>
      </div>
    );
  }
}
