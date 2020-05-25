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
      <div className={styles.AllCases}>
        <div className={styles.CasesHeader}>
          <div className={`${styles.Row} ${styles.Row___name}`}>
            <div className={`${styles.Item} ${styles.Item___country}`}>
              <span className={styles.Item_header} onClick={() => this.handleClick(CountriesSorts.BY_NAME)}>Country</span>
            </div>
          </div>
          <div className={`${styles.Row} ${styles.Row___cases}`}>
            <div className={`${styles.Item} ${styles.Item___cases}`}>
              <span className={styles.Item_header} onClick={() => this.handleClick(CountriesSorts.BY_CONFIRMED)}>Total confirmed</span>
            </div>
            <div className={`${styles.Item} ${styles.Item___cases}`}>
              <span className={styles.Item_header} onClick={() => this.handleClick(CountriesSorts.BY_DEATH)}>Total death</span>
            </div>
            <div className={`${styles.Item} ${styles.Item___cases}`}>
              <span className={styles.Item_header} onClick={() => this.handleClick(CountriesSorts.BY_RECOVERED)}>Total recovered</span>
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
