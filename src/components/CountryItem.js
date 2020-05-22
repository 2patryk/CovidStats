import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CountryItem.module.css";
import { Link } from "react-router-dom";

export default class CountryItem extends Component {
  render() {
    const { onClick, country } = this.props;
    return (
      <Link className={styles.link} to={"/" + country.Slug}>
        <div className={styles.countryItem}>
          <div
            className={`${styles.row} ${styles.row__name}`}
            onClick={onClick}
          >
            <div className={`${styles.item} ${styles.item__country}`}>
              {country.Country}
            </div>
          </div>
          <div
            className={`${styles.row} ${styles.row__cases}`}
            onClick={onClick}
          >
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span className={styles.numberOf}>{country.TotalConfirmed}</span>
              <span className={styles.new}>
                {country.NewConfirmed > 0
                  ? " (+" + country.NewConfirmed + ")"
                  : ""}
              </span>
            </div>
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span className={styles.numberOf}>{country.TotalDeaths}</span>
              <span className={styles.new}>
                {country.NewDeaths > 0 ? " (+" + country.NewDeaths + ")" : ""}
              </span>
            </div>

            <div className={`${styles.item} ${styles.item__cases}`}>
              <span className={styles.numberOf}>{country.TotalRecovered}</span>
              <span className={styles.new}>
                {country.NewRecovered > 0
                  ? " (+" + country.NewRecovered + ")"
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

CountryItem.propTypes = {
  onClick: PropTypes.any.isRequired,
  country: PropTypes.any.isRequired,
};
