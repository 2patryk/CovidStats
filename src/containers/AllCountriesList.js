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
import DoughnutChart from "../components/DoughnutChart";
import Counter from "../components/Counter";
import styles from "./AllCountriesList.module.css";

class AllCountriesList extends Component {
  constructor(props) {
    super(props);

    console.log("construcor");
    this.goToCountry = this.goToCountry.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCountriesIfNeeded());
  }

  componentDidUpdate(prevProps) {
    //   const { dispatch } = this.props
    //   dispatch(fetchCountriesIfNeeded())
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(invalidateCountries());
    dispatch(fetchCountriesIfNeeded());
  }

  goToCountry = (countrySlug) => {
    //history.push("/" + countrySlug);
  };

  render() {
    const {
      countries,
      isFetching,
      lastUpdated,
      haveError,
      summary,
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
          <div >
            <div className={`row no-gutters ${styles.summaryRow}`}>
              <div className={`col-md-6 ${styles.colLeft}`}>
                <div className="cardMaterial">
                <Counter data={summary}/>
                </div>
              </div>
              <div className={`col-md-6 ${styles.colRight}`}>
              <div className="cardMaterial">
                <DoughnutChart
                  data={{
                    Deaths: summary.TotalDeaths,
                    Recovered: summary.TotalRecovered,
                    Active:
                      summary.TotalConfirmed -
                      summary.TotalRecovered -
                      summary.TotalDeaths,
                    Confirmed: summary.TotalConfirmed,
                  }}
                />
                </div>
              </div>
            </div>

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
};

function mapStateToProps(state) {
  const { allCountries } = state;

  const {
    isFetching,
    lastUpdated,
    items: countries,
    haveError,
    lastError,
    summary,
  } = isEmptyObject(allCountries)
    ? {
        isFetching: true,
        items: [],
        haveError: false,
        lastError: {},
        summary: {},
      }
    : allCountries;

  return {
    isFetching,
    countries,
    lastUpdated,
    haveError,
    lastError,
    summary,
  };
}

export default connect(mapStateToProps)(AllCountriesList);
