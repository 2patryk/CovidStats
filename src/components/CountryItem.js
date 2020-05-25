import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CountryItem.module.css";
import { Link } from "react-router-dom";

export default class CountryItem extends Component {
  render() {
    const { country } = this.props;
    return (
      <Link className={styles.Link} to={"/" + country.Slug}>
        <div className={styles.CountryItem}>
          <div
            className={`${styles.Row} ${styles.Row_name}`}
           
          >
            <div className={`${styles.Item} ${styles.Item_country}`}>
              {country.Country}
            </div>
          </div>
          <div
            className={`${styles.Row} ${styles.Row_cases}`}
            
          >
            <div className={`${styles.Item} ${styles.Item_cases}`}>
              <span className={styles.NumberOf}>{country.TotalConfirmed.toLocaleString()}</span>
              <span className={styles.New}>
                {country.NewConfirmed > 0
                  ? " (+" + country.NewConfirmed.toLocaleString() + ")"
                  : ""}
              </span>
            </div>
            <div className={`${styles.Item} ${styles.Item_cases}`}>
              <span className={styles.NumberOf}>{country.TotalDeaths.toLocaleString()}</span>
              <span className={styles.New}>
                {country.NewDeaths > 0 ? " (+" + country.NewDeaths.toLocaleString() + ")" : ""}
              </span>
            </div>

            <div className={`${styles.Item} ${styles.Item_cases}`}>
              <span className={styles.NumberOf}>{country.TotalRecovered.toLocaleString()}</span>
              <span className={styles.New}>
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
