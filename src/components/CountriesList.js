import React, { Component } from "react";
import PropTypes from "prop-types";
import CountryItem from "./CountryItem";
import styles from "./CountriesList.module.css";
import { CountriesSorts } from "../store/actions/AllCountriesActions";

export default class CountriesList extends Component {
  handleClick = (sort) => {
    this.props.onHeaderClick(sort);
  }

  render() {
    return (
      <div className={styles.allCases}>
        <div className={styles.casesHeader}>
          <div className={`${styles.row} ${styles.row__name}`}>
            <div className={`${styles.item} ${styles.item__country}`}>
              <span className={styles.item__header} onClick={() => this.handleClick(CountriesSorts.BY_NAME)}>Country</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.row__cases}`}>
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span className={styles.item__header} onClick={() => this.handleClick(CountriesSorts.BY_CONFIRMED)}>Total confirmed</span>
            </div>
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span className={styles.item__header} onClick={() => this.handleClick(CountriesSorts.BY_DEATH)}>Total death</span>
            </div>
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span className={styles.item__header} onClick={() => this.handleClick(CountriesSorts.BY_RECOVERED)}>Total recovered</span>
            </div>
          </div>
        </div>
        {this.props.countries.map((country, i) => (
          <CountryItem key={i} country={country} />
        ))}
      </div>
    );
  }
}

CountriesList.propTypes = {
  countries: PropTypes.array.isRequired,
};
