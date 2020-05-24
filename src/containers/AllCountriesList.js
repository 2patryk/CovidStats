import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  fetchCountriesIfNeeded,
  invalidateCountries,
} from "../store/actions/AllCountriesActions";
import { connect } from "react-redux";
import CountriesList from "../components/CountriesList";
import { isEmptyObject } from "../utils/utils";
import ErrorMessage from "../components/ErrorMessage";
import DoughnutChart from "../components/charts/DoughnutChart";
import Counter from "../components/Counter";
import styles from "./AllCountriesList.module.css";

class AllCountriesList extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCountriesIfNeeded());
  }


  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(invalidateCountries());
    dispatch(fetchCountriesIfNeeded());
  }


  render() {
    const {
      countries,
      isFetching,
      dateOfDataUpdate,
      haveError,
      summary,
      isMobile,
    } = this.props;
    return (
      <div>
        {haveError ? <ErrorMessage onClick={this.handleRefreshClick} /> : ""}
        {isFetching && countries.length === 0 && (
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        )}
        {!isFetching && !haveError && countries.length === 0 && <h2>Empty.</h2>}
        {countries.length > 0 && (
          <div>
            <div className={`row no-gutters ${styles.summaryRow}`}>
              <div className={`col-md-6 colLeft`}>
              <h1 className="headerText">Coronavirus worldwide cases</h1>
                <div className={`cardMaterial flexDefault`}>
                 
                  <Counter data={{
                    Deaths: summary.TotalDeaths,
                    Recovered: summary.TotalRecovered,
                    Confirmed: summary.TotalConfirmed,
                    NewDeaths: summary.NewDeaths,
                    NewRecovered: summary.NewRecovered,
                    NewConfirmed: summary.NewConfirmed,
                    Date: dateOfDataUpdate
                  }} />
                </div>
              </div>
              <div className={`col-md-6 colRight`}>
              <h1 className="headerText">Distribution of confirmed cases</h1>
                <div className="cardMaterial">
                
                  <DoughnutChart
                    isMobile={isMobile}
                    data={{
                      labels: ["Active", "Deaths", "Recovered"],
                      data: [
                        summary.TotalConfirmed -
                          summary.TotalRecovered -
                          summary.TotalDeaths,
                        summary.TotalDeaths,
                        summary.TotalRecovered,
                      ],
                      colors: ["#ffeb3b", "#f44336", "#2196f3"],
                      label: "Division of Confirmed cases",
                    }}
                  />
                </div>
              </div>
            </div>
            <h1 className="headerText">List of all countries</h1>
            <CountriesList onClick={this.goToCountry} countries={countries} />
          </div>
        )}
      </div>
    );
  }
}

AllCountriesList.propTypes = {
  countries: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  haveError: PropTypes.bool,
  dateOfDataUpdate: PropTypes.any.isRequired
};

function mapStateToProps(state) {
  const { allCountries, global } = state;

  const {
    isFetching,
    lastUpdated,
    items: countries,
    haveError,
    lastError,
    summary,
    dateOfDataUpdate
  } = allCountries
|| {
        isFetching: true,
        items: [],
        haveError: false,
        lastError: {},
        summary: {},
      }
    ;

  const { isMobile } = global || { isMobile: false };
  return {
    isFetching,
    countries,
    lastUpdated,
    haveError,
    lastError,
    summary,
    isMobile,
    dateOfDataUpdate
  };
}

export default connect(mapStateToProps)(AllCountriesList);
