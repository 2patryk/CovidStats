import React, { Component } from "react";
import PropTypes from "prop-types";
import ChartView from "./ChartView";
import styles from "./CountryView.module.css";
import DoughnutChart from './DoughnutChart';

export default class CountryView extends Component {
  render() {
    const { name, history, lastUpdate } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <div className="row no-gutters">
          <div className="col">
          <div className="cardMaterial">
        <ChartView history={history}></ChartView>
        </div>
        </div>
        </div>
        <div className="row no-gutters">
              <div className="col-md-6">
              <div className="cardMaterial">
                <DoughnutChart
                  data={
                  history[history.length-1]
                  }
                />
              </div>
              </div>
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
