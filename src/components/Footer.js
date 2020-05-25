import React, { Component } from "react";
import styles from "./Footer.module.css";

class Footer extends Component {
  constructor() {
    super();
    this.isRoot = false;
    this.lastIsRoot = false;
  }

  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className={styles.FooterBox}>
                <div className={styles.FooterBox_line}></div>
                <a className={styles.FooterBox_link} href="https://patryk.fun">
                  <span className={styles.FooterBox_text}>
                   Page created by Patryk Ordon
                  </span>
                  <img
                    className={styles.FooterBox_logo}
                    alt="PatrykOrdon's logo"
                    src="https://patryk.fun/images/logo_black.png"
                  />
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
