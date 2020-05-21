import React, { Component } from "react";

export default class ErrorMessage extends Component {
  render() {
    const { onClick, message } = this.props;
    return (
      <div>
        <h2>{message}</h2>
        <button onClick={onClick}>Refresh</button>
      </div>
    );
  }
}
