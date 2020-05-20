import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchCountriesIfNeeded } from "../store/actions";
import { connect } from 'react-redux'
import CountriesList from '../components/CountriesList';
import history from '../history';
class AllCountriesList extends Component {
  constructor(props) {
    super(props);

    console.log("construcor");
    this.goToCountry = this.goToCountry.bind(this);
    //this.handleChange = this.handleChange.bind(this);
   // this.handleRefreshClick = this.handleRefreshClick.bind(this);
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

  // handleRefreshClick(e) {
  //   e.preventDefault()

  //   const { dispatch, selectedSubreddit } = this.props
  //   dispatch(invalidateSubreddit(selectedSubreddit))
  //   dispatch(fetchPostsIfNeeded(selectedSubreddit))
  // }
  goToCountry = (countrySlug) => {
    //history.push('/' + countrySlug);
    this.props.history.push('/' + countrySlug);
  }

  render() {
    const { countries, isFetching, lastUpdated } = this.props
    return (
      <div>
        <h1>All</h1>
        <Link to="/Poland">
          <span>CovidStats</span>
        </Link>
        {isFetching && countries.length === 0 && <h2>Loading...</h2>}
        {!isFetching && countries.length === 0 && <h2>Empty.</h2>}
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
};

function mapStateToProps(state) {
  const { allCountries } = state;

  function isEmptyObject(obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  }


  const { isFetching, lastUpdated, items : countries } = (isEmptyObject(allCountries) ? {
    isFetching: true,
    items: []
  } : allCountries);

  console.log(isFetching);

  return {
    isFetching,
    countries,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(AllCountriesList);
