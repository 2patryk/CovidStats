import React, { Component } from "react";
import styles from './Error.module.css';
export default class Error extends Component {
  render() {
    const { onClick, error } = this.props;
    return (
      <div className={styles.ErrorContainer}>
        <div className={styles.Error}>
        <h2>We have a problem</h2>
        <span>{error.message}</span>
        <span>Try again in a moment</span>
        <button className={styles.Error_button} onClick={onClick}>Refresh</button>
        </div>
      </div>
    );
  }
}
