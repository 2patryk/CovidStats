import axios from 'axios'

export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES'
export const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES'
export const INVALIDATE_COUNTRIES = 'INVALIDATE_COUNTRIES'
export const GO_TO_COUNTRY = 'GO_TO_COUNTRY'

export const REQUEST_COUNTRY = 'REQUEST_COUNTRY'
export const RECEIVE_COUNTRY = 'RECEIVE_COUNTRY'
export const INVALIDATE_COUNTRY = 'INVALIDATE_COUNTRY'


export function invalidateCountries() {
  return {
    type: INVALIDATE_COUNTRIES
  }
}

function requestCountries() {
  return {
    type: REQUEST_COUNTRIES
  }
}

function receiveCountries(json) {
    console.log(json);
  return {
    type: RECEIVE_COUNTRIES,
    countries: json.Countries,
    receivedAt: Date.now()
  }
}

function fetchCountries() {
  return dispatch => {
    dispatch(requestCountries())
    axios.get(`https://api.covid19api.com/summary`)
      .then(response => dispatch(receiveCountries(response.data)))
  }
}

function shouldFetchCountries(state) {
  const countries = state.allCountries.items
  if (!countries) {
    return true
  } else if (countries.isFetching) {
    return false
  } else {
    return countries.didInvalidate
  }
}

export function fetchCountriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCountries(getState())) {
      return dispatch(fetchCountries())
    }
  }
}