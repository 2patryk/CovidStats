import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SearchBar.module.css";
export default class SearchBar extends Component {
  render() {
    const { onChange, value } = this.props;
    return (
      <div className={styles.Group}>
        <input
          className={styles.SearchBar}
          type="text"
          value={value}
          onChange={onChange}
          required
        />
        <span className={styles.Highlight}></span>
        <span className={styles.Bar}></span>
        <label>Search country</label>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
