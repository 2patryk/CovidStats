import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CountryItem.module.css";
import { Link } from "react-router-dom";

export default class CountryItem extends Component {
  render() {
    const { onClick, country } = this.props;
    return (
  
      <tr onClick={onClick}>
            
        <td className={styles.countryName}>
        <Link to={"/" +  country.Slug}>
          {country.Country}
          </Link>
          </td>
        
        <td>
          <div className={styles.cases}>
            <span className={styles.numberOf}>{country.TotalConfirmed}</span>
            <span>
              {country.NewConfirmed > 0
                ? "(+" + country.NewConfirmed + ")"
                : "-"}
            </span>
          </div>
        </td>
        <td>
          <div className={styles.cases}>
            <span className={styles.numberOf}>{country.TotalDeaths}</span>
            <span>
              {country.NewDeaths > 0 ? "(+" + country.NewDeaths + ")" : "-"}
            </span>
          </div>
        </td>
        <td>
          <div className={styles.cases}>
            <span className={styles.numberOf}>{country.TotalRecovered}</span>
            <span>
              {country.NewRecovered > 0
                ? "(+" + country.NewRecovered + ")"
                : "-"}
            </span>
          </div>
        </td>
      </tr>
      
    );
  }
}

CountryItem.propTypes = {
  onClick: PropTypes.any.isRequired,
  country: PropTypes.any.isRequired,
};
