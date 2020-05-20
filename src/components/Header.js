import React, { Component } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
// import { Provider } from "react-redux";
// import _store from "../store/store";

// import App from "./App";
// const store = _store();

export default class Root extends Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              
                <Link to="/">
                  <span className={styles.logo}>CovidStats</span>
                </Link>
              
            </div>
          </div>
        </div>
      </header>
    );
  }
}
