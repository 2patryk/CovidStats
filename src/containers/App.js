import React, { Component } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "chart.js";
import { connect } from "react-redux";
import { debounce } from "../utils/utils";
import PropTypes from "prop-types";
import {
  setIsMobile
} from "../store/actions/GlobalActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllCountriesList from "./AllCountriesList";
import Country from "./Country";
import Header from "../components/Header";
import Footer from "../components/Footer";

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: "",
    };

    Chart.plugins.unregister(ChartDataLabels);
    Chart.defaults.global.aspectRatio = 2;

    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.updateIsMobile = this.updateIsMobile.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setIsMobile({isMobile: (window.innerWidth < 768) ? true : false,}))
    window.addEventListener("resize", debounce(this.updateIsMobile, 250));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateIsMobile);
  }

  updateIsMobile() {
    const lastIsMobile = this.props.isMobile;
    const isMobile = (window.innerWidth < 768) ? true : false;
    
    if (lastIsMobile !== isMobile) 
      this.props.dispatch(setIsMobile({isMobile: isMobile}))
    
  }

  onSearchChanged(e) {
    this.setState({
      searchValue: e.currentTarget.value,
    });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Header/>
          <div className="container mainContent">
            <div className="row">
              <div className="col">
                <div className="main-box">
                  <Switch>
                    <Route exact path="/" component={AllCountriesList} />
                    <Route path="/:country" component={Country} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </Router>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      console.log("Loading change");
    }
  }
}

App.propTypes = {
  error: PropTypes.object,
  isMobile: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { error, isMobile } = state.global || { isMobile: false, error: null };

  return {error, isMobile}
}

export default connect(mapStateToProps)(App);
