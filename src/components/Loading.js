import React, { Component } from "react";
import styles from "./Loading.module.css";

class Loading extends Component {
  render() {
    return (
      <div className={styles.LoadingContainer}>
        <div className={styles.Spinner}>
          <div className={styles.Bounce1}></div>
          <div className={styles.Bounce2}></div>
          <div className={styles.Bounce3}></div>
        </div>
      </div>
    );
  }
}

export default Loading;
