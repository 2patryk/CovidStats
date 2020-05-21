import React, { Component } from "react";
import PropTypes from "prop-types";
import CountryItem from "./CountryItem";
import styles from "./CountriesList.module.css";

export default class CountriesList extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div className={styles.allCases}>
        <div className={styles.casesHeader}>
          <div className={`${styles.row} ${styles.row__name}`}>
            <div className={`${styles.item} ${styles.item__country}`}>
              <span>Country</span>
            </div>
          </div>
          <div
            className={`${styles.row} ${styles.row__cases}`}
            onClick={onClick}
          >
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span>Total confirmed</span>
            </div>
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span>Total death</span>
            </div>
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span>Total recovered</span>
            </div>
          </div>
        </div>
        {this.props.countries.map((country, i) => (
          <CountryItem
            onClick={() => onClick(country.Slug)}
            key={i}
            country={country}
          />
        ))}
      </div>
    );
  }
}

CountriesList.propTypes = {
  onClick: PropTypes.any.isRequired,
  countries: PropTypes.array.isRequired,
};
