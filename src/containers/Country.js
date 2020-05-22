import React, { Component } from "react";
import { fetchCountryIfNeeded, invalidateCountry } from "../store/actions/SelectedCountryActions";
import { connect } from "react-redux";
import CountryView from '../components/CountryView'
class Country extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;
    dispatch(fetchCountryIfNeeded(params.country));
  }


  componentDidUpdate(prevProps) {
    const {
      dispatch,
      match: { params },
    } = this.props;
    const oldParams = prevProps.match.params;
    // console.log(oldParams);
    // console.log(params);
    if (oldParams && oldParams.country !== params.country)
      dispatch(invalidateCountry());
    dispatch(fetchCountryIfNeeded(params.country));
  }
  v;

  render() {
    const {
      match: { params },history, name, lastUpdated
    } = this.props;
    return (
      <div>
        {history.length > 0 ?
        <CountryView name={name} history={history} lastUpdated={lastUpdated}/> : ""
  }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedCountry } = state;

  const {
    name,
    isFetching,
    lastUpdated,
    country,
    history,
    haveError,
    lastError,
  } = selectedCountry || {
    name: "",
    lastUpdated: 0,
    isFetching: true,
    history: [],
    haveError: false,
    lastError: {},
  };

  return {
    name,
    isFetching,
    lastUpdated,
    country,
    history,
    haveError,
    lastError,
  };
}

export default connect(mapStateToProps)(Country);
