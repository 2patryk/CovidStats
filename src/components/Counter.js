import styles from "./Counter.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Counter extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.Root}>
        <div className={styles.CounterContainer}>
          <div className={styles.CounterItem}>
            <div className={styles.CounterItem__container}>
              <span>Confirmed:</span>
              <span className={`${styles.CounterItem_cases} ${styles.CounterItem___casesconfirmed} `}>{data.Confirmed.toLocaleString()}</span>
              <span className={styles.CounterItem_new}>
                (
                {(data.NewConfirmed > 0 ? "+" : "") +
                  data.NewConfirmed.toLocaleString()}
                )
              </span>
            </div>
          </div>

          <div className={styles.CounterItem}>
          <div className={styles.CounterItem__container}>
            <span>Active:</span>
            <span className={`${styles.CounterItem_cases} ${styles.CounterItem___casesactive} `}>
              {((data.Confirmed - data.Deaths - data.Recovered)).toLocaleString()}
            </span>
            <span className={styles.CounterItem_new}>
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

          <div className={styles.CounterItem}>
          <div className={styles.CounterItem__container}>
            <span>Recovered:</span>
            <span className={`${styles.CounterItem_cases} ${styles.CounterItem___casesrecovered} `}>{data.Recovered.toLocaleString()}</span>
            <span className={styles.CounterItem_new}>
              (
              {(data.NewRecovered > 0 ? "+" : "") +
                data.NewRecovered.toLocaleString()}
              )
            </span>
            </div>
          </div>
          <div className={styles.CounterItem}>
          <div className={styles.CounterItem__container}>
            <span>Deaths:</span>
            <span className={`${styles.CounterItem_cases} ${styles.CounterItem___casesdeaths} `}>{data.Deaths.toLocaleString()}</span>
            <span className={styles.CounterItem_new}>
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
