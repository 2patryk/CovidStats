import React, { Component } from "react";
import PropTypes from "prop-types";
import CountryItem from "./CountryItem";
import styles from "./CountriesList.module.css";

export default class CountriesList extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <th>Country</th>
            <th>Confirmed cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
          </tr>
          {this.props.countries.map((country, i) => (
            <CountryItem onClick={() => onClick(country.Slug)} key={i} country={country} />
          ))}
        </tbody>
      </table>
    );
  }
}

CountriesList.propTypes = {
  onClick: PropTypes.any.isRequired,
  countries: PropTypes.array.isRequired,
};
