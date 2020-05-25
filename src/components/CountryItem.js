import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CountryItem.module.css";
import { Link } from "react-router-dom";

export default class CountryItem extends Component {
  render() {
    const { country } = this.props;
    return (
      <Link className={styles.link} to={"/" + country.Slug}>
        <div className={styles.countryItem}>
          <div
            className={`${styles.row} ${styles.row__name}`}
           
          >
            <div className={`${styles.item} ${styles.item__country}`}>
              {country.Country}
            </div>
          </div>
          <div
            className={`${styles.row} ${styles.row__cases}`}
            
          >
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span className={styles.numberOf}>{country.TotalConfirmed.toLocaleString()}</span>
              <span className={styles.new}>
                {country.NewConfirmed > 0
                  ? " (+" + country.NewConfirmed.toLocaleString() + ")"
                  : ""}
              </span>
            </div>
            <div className={`${styles.item} ${styles.item__cases}`}>
              <span className={styles.numberOf}>{country.TotalDeaths.toLocaleString()}</span>
              <span className={styles.new}>
                {country.NewDeaths > 0 ? " (+" + country.NewDeaths.toLocaleString() + ")" : ""}
              </span>
            </div>

            <div className={`${styles.item} ${styles.item__cases}`}>
              <span className={styles.numberOf}>{country.TotalRecovered.toLocaleString()}</span>
              <span className={styles.new}>
                {country.NewRecovered > 0
                  ? " (+" + country.NewRecovered.toLocaleString() + ")"
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
  country: PropTypes.any.isRequired,
};
