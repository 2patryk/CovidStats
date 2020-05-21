import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import SearchCountry from "./SearchCountry";
import PropTypes from "prop-types";

class Header extends Component {
  constructor(){
    super();
    this.isRoot = false;
    this.lastIsRoot = false;
  }



  render() {
    const {onChange, searchValue} = this.props;
    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              
                <Link to="/">
                  <span className={styles.logo}>CovidStats</span>
                </Link>
              
            </div>
            <div className="col-md-9">
              
                {(this.props.location.pathname === "/" ? true : false) ? <SearchCountry onChange={onChange} value={searchValue} /> : ""}
              
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  onChange: PropTypes.any.isRequired,
  searchValue: PropTypes.any.isRequired,
};



export default withRouter(Header);

