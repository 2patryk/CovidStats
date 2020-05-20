import React, { Component } from "react";

export default class Country extends Component {
  render() {
    const { match: { params } } = this.props;
    return (
      <div>
        <h2>{params.country}</h2>
        
      </div>
    );
  }
}
