import axios from "axios";

export const REQUEST_COUNTRIES = "REQUEST_COUNTRIES";
export const RECEIVE_COUNTRIES_SUCCESS = "RECEIVE_COUNTRIES_SUCCESS";
export const RECEIVE_COUNTRIES_FAILURE = "RECEIVE_COUNTRIES_FAILURE";
export const INVALIDATE_COUNTRIES = "INVALIDATE_COUNTRIES";

export const SET_FILTER = "SET_FILTER";
export const SET_SORT = "SET_SORT";

export const CountriesSorts = {
  BY_CONFIRMED: 'BY_CONFIRMED',
  BY_RECOVERED: 'BY_RECOVERED',
  BY_DEATH: 'BY_DEATHS',
  BY_NAME: 'BY_NAME'
}
export const CountriesFilters = {
  BY_SEARCH_TEXT: 'BY_SEARCH_TEXT',
}

export const Order = {
  ASC: 'ASC',
  DESC: 'DESC'
}

export function invalidateCountries() {
  return {
    type: INVALIDATE_COUNTRIES,
  };
}

function requestCountries() {
  return {
    type: REQUEST_COUNTRIES,
  };
}

function receiveCountriesSuccess(payload) {
  return {
    type: RECEIVE_COUNTRIES_SUCCESS,
    payload
  };
}
function receiveCountriesFailure(error) {
  return {
    type: RECEIVE_COUNTRIES_FAILURE,
    error,
  };
}

export function setFilter(payload){
  return {
    type: SET_FILTER,
    payload
  }
}

export function setSort(payload){
  return {
    type: SET_SORT,
    payload
  }
}

function fetchCountries() {
  return (dispatch) => {
    dispatch(requestCountries());
    axios
      .get(`https://api.covid19api.com/summary`)
      .then((response) =>
        dispatch(
            receiveCountriesSuccess({
                countries: response.data.Countries,
                summary: response.data.Global,
                dateOfDataUpdate: response.data.Date
                  ? Date.parse(response.data.Date)
                  : null,
                receivedAt: Date.now(),
              })
          
        )
      )
      .catch((error) => dispatch(receiveCountriesFailure(error)));
  };
}

function shouldFetchCountries(state) {
  const countries = state.allCountries;
  if (!countries.items) {
    return true;
  } else if (countries.isFetching) {
    return false;
  } else {
    return countries.didInvalidate;
  }
}

export function fetchCountriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCountries(getState())) {
      return dispatch(fetchCountries());
    }
  };
}
