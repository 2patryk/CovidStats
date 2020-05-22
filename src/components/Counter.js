import styles from "./Counter.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";



export default class Counter extends Component {
  render() {
    const { data } = this.props;
    return (<div className="flex">
        <h4>Confirmed: {data.TotalConfirmed}</h4>
        <h4>Death: {data.TotalDeaths}</h4>
        <h4>Recovered: {data.TotalRecovered}</h4>
    </div>);
  }
}

Counter.propTypes = {
  data: PropTypes.object.isRequired,
};
