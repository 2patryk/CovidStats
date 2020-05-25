import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  fetchCountriesIfNeeded,
  invalidateCountries,
  CountriesFilters,
  CountriesSorts,
  Order,
  setFilter,
  setSort,
} from "../store/actions/AllCountriesActions";
import { connect } from "react-redux";
import CountriesList from "../components/CountriesList";
import Error from "../components/Error";
import DoughnutChart from "../components/charts/DoughnutChart";
import Counter from "../components/Counter";
import styles from "./AllCountriesList.module.css";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

class AllCountriesList extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.filterBySearchValue = this.filterBySearchValue.bind(this);
    this.sortCountriesList = this.sortCountriesList.bind(this);
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

  sortCountriesList(sort) {
    this.props.dispatch(
      setSort({
        type: sort,
        order: (this.props.sort.order === Order.ASC && this.props.sort.type === sort) ? Order.DESC : Order.ASC
      })
    );
  }

  filterBySearchValue(e) {
    e.preventDefault();
    this.props.dispatch(
      setFilter({
        type: CountriesFilters.BY_SEARCH_TEXT,
        data: e.currentTarget.value,
      })
    );
  }

  render() {
    const {
      countries,
      isFetching,
      dateOfDataUpdate,
      haveError,
      summary,
      isMobile,
      error,
      filter,
    } = this.props;
    return (
      <div>
        {haveError ? (
          <Error onClick={this.handleRefreshClick} error={error} />
        ) : (
          ""
        )}
        {isFetching && countries.length === 0 && <Loading />}
        {countries.length === 0 && filter === {} && <h2>Empty.</h2>}
        {(countries.length > 0 || filter !== {}) && summary && (
          <div>
            <div className={`row no-gutters ${styles.summaryRow}`}>
              <div className={`col-md-6 colLeft`}>
                <h1 className="headerText">Coronavirus worldwide cases</h1>
                <div className={`cardMaterial flexDefault`}>
                  <Counter
                    data={{
                      Deaths: summary.TotalDeaths,
                      Recovered: summary.TotalRecovered,
                      Confirmed: summary.TotalConfirmed,
                      NewDeaths: summary.NewDeaths,
                      NewRecovered: summary.NewRecovered,
                      NewConfirmed: summary.NewConfirmed,
                      Date: dateOfDataUpdate,
                    }}
                  />
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
            <div className={`row no-gutters`}>
              <div className={`col-md-9`}>
                <h1 className="headerText">List of all countries</h1>
              </div>
              <div className={`col-md-3`}>
                <div className={styles.searchBar}>
                  <SearchBar
                    onChange={this.filterBySearchValue}
                    value={filter.data || ""}
                  />
                </div>
              </div>
            </div>
            {countries.length > 0 ? (
              <CountriesList
                onHeaderClick={this.sortCountriesList}
                countries={countries}
              />
            ) : (
              "No countries was found"
            )}
          </div>
        )}
      </div>
    );
  }
}

const getVisibleCountries = (countries, filter, sort) => {
  switch (filter.type) {
    case CountriesFilters.BY_SEARCH_TEXT:
      countries = countries.filter((val) =>
        val.Country.toLowerCase().includes(filter.data.toLowerCase())
      );
      break;
    default:
  }

  switch (sort.type) {
    case CountriesSorts.BY_CONFIRMED:
      countries = countries.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);
      break;
    case CountriesSorts.BY_DEATH:
      countries = countries.sort((a, b) => a.TotalDeaths - b.TotalDeaths);
      break;
    case CountriesSorts.BY_RECOVERED:
      countries = countries.sort((a, b) => a.TotalRecovered - b.TotalRecovered);
      break;
    case CountriesSorts.BY_NAME:
    default:
      countries = countries.sort();
  }

  if (sort.order === Order.DESC) countries = countries.reverse();

  return countries;
};

AllCountriesList.propTypes = {
  countries: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  haveError: PropTypes.bool,
  dateOfDataUpdate: PropTypes.any.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { allCountries, global } = state;

  const {
    isFetching,
    lastUpdated,
    haveError,
    lastError,
    summary,
    dateOfDataUpdate,
    sort,
    filter,
  } = allCountries || {
    isFetching: true,
    haveError: false,
    lastError: {},
    summary: {},
    sort: {},
    filter: {},
  };

  const countries = getVisibleCountries([...allCountries.items], filter, sort);
  const { isMobile, error } = global || { isMobile: false, error: {} };
  return {
    isFetching,
    countries,
    lastUpdated,
    haveError,
    lastError,
    summary,
    isMobile,
    error,
    dateOfDataUpdate,
    sort,
    filter,
  };
}

export default connect(mapStateToProps)(AllCountriesList);
