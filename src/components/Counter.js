import styles from "./Counter.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Counter extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.counterContainer}>
          <div className={styles.counterItem}>
            <div>
              <span>Confirmed:</span>
              <span>{data.Confirmed.toLocaleString()}</span>
              <span className={styles.newCases}>
                (
                {(data.NewConfirmed > 0 ? "+" : "") +
                  data.NewConfirmed.toLocaleString()}
                )
              </span>
            </div>
          </div>

          <div className={styles.counterItem}>
          <div>
            <span>Active:</span>
            <span>
              {((data.Confirmed - data.Deaths - data.Recovered)).toLocaleString()}
            </span>
            <span className={styles.newCases}>
              (
              {((data.NewConfirmed - data.NewDeaths - data.NewRecovered) > 0 ? "+" : "") +
                (
                  data.NewConfirmed -
                  data.NewDeaths -
                  data.NewRecovered
                ).toLocaleString()}
               )
            </span>
            </div>
          </div>

          <div className={styles.counterItem}>
          <div>
            <span>Recovered:</span>
            <span>{data.Recovered.toLocaleString()}</span>
            <span className={styles.newCases}>
              (
              {(data.NewRecovered > 0 ? "+" : "") +
                data.NewRecovered.toLocaleString()}
              )
            </span>
            </div>
          </div>
          <div className={styles.counterItem}>
          <div>
            <span>Deaths:</span>
            <span>{data.Deaths.toLocaleString()}</span>
            <span className={styles.newCases}>
              (
              {(data.NewDeaths > 0 ? "+" : "") +
                data.NewDeaths.toLocaleString()}
              )
            </span>
            </div>
          </div>
          </div>
          <div>
            <span>Date of update: </span>
            <span>{new Date(data.Date).toLocaleString('pl-PL',{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })}</span>
          
          
        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  data: PropTypes.object.isRequired,
};
