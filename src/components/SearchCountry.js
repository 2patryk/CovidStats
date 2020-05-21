import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SearchCountry extends Component {
  render() {
    const { onChange,value } = this.props;
    return (
      <input hint="Search Country" type="text" value={value} onChange={onChange}/>
    );
  }
}

SearchCountry.propTypes = {
  onChange: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
