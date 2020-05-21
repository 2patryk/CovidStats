import React, { Component } from "react";
import PropTypes from "prop-types";
import ChartView from "./ChartView";
import styles from "./CountryView.module.css";


export default class CountryView extends Component {
  render() {
    const { name, history, lastUpdate } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <div>
        <ChartView history={history}></ChartView>
        </div>
        
      </div>
    );
  }
}

CountryView.propTypes = {
  name: PropTypes.any.isRequired,
  lastUpdated: PropTypes.any.isRequired,
  history: PropTypes.array.isRequired,
};
