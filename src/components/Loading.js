import React, { Component } from "react";
import styles from "./Loading.module.css";

class Loading extends Component {
  render() {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>
          <div className={styles.bounce1}></div>
          <div className={styles.bounce2}></div>
          <div className={styles.bounce3}></div>
        </div>
      </div>
    );
  }
}

export default Loading;
