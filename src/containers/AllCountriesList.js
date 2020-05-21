import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchCountriesIfNeeded, invalidateCountries } from "../store/actions";
import { connect } from "react-redux";
import CountriesList from "../components/CountriesList";
import history from '../history'
import isEmptyObject from '../utils/utils'
import ErrorMessage from "../components/ErrorMessage";
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

  //   handleChange(nextSubreddit) {
  //       console.log(nextSubreddit);
  //     //const history = useHistory();

  //     //history.push("/" + nextSubreddit);
  //     // this.props.dispatch(selectSubreddit(nextSubreddit))
  //     // this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  //   }

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
      lastError,
    } = this.props;
    return (
      <div>
        {haveError ? (
          <ErrorMessage
            onClick={this.handleRefreshClick}
            message={lastError.message}
          />
        ) : (
          ""
        )}
        {isFetching && countries.length === 0 && (
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        )}
        {!isFetching && !haveError && countries.length === 0 && <h2>Empty.</h2>}
        {countries.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
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
  lastError: PropTypes.object,
};

function mapStateToProps(state) {
  const { allCountries } = state;



  const {
    isFetching,
    lastUpdated,
    items: countries,
    haveError,
    lastError,
  } = isEmptyObject(allCountries)
    ? {
        isFetching: true,
        items: [],
        haveError: false,
        lastError: {},
      }
    : allCountries;

  return {
    isFetching,
    countries,
    lastUpdated,
    haveError,
    lastError,
  };
}

export default connect(mapStateToProps)(AllCountriesList);
