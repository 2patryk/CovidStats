import axios from 'axios'

export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES'
export const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES'
export const INVALIDATE_COUNTRIES = 'INVALIDATE_COUNTRIES'

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

export function invalidateCountry() {
  return {
    type: INVALIDATE_COUNTRY
  }
}

function requestCountry() {
  return {
    type: REQUEST_COUNTRY
  }
}

function receiveCountries(json,error) {
  return {
    type: RECEIVE_COUNTRIES,
    countries: json.Countries,
    summary: json.Global,
    dateOfDataUpdate: json.Date ? Date.parse(json.Date) : null,
    receivedAt: Date.now(),
    haveError: error.haveError,
    lastError: error.error
  }
}

function fetchCountries() {
  return dispatch => {
    dispatch(requestCountries())
    axios.get(`https://api.covid19api.com/summary`)
      .then(response => dispatch(receiveCountries(response.data,{haveError:false})))
      .catch(err => dispatch(receiveCountries({
        Countries: [],
      },{haveError:true,error:err})))
  }
}
function receiveCountry(json,error) {
  return {
    type: RECEIVE_COUNTRY,
    slug: json.slug,
    name: json.items[0].Country,
    history: json.items.map((value)=>{return {Active:value.Active,Deaths:value.Deaths,Recovered:value.Recovered,Confirmed:value.Confirmed,date:value.Date}}),
    receivedAt: Date.now(),
    haveError: error.haveError,
    lastError: error.error
  }
}

function fetchCountry(countrySlug) {
  return dispatch => {
    dispatch(requestCountry())
    axios.get(`https://api.covid19api.com/total/country/${countrySlug}`)
      .then(response => dispatch(receiveCountry({slug:countrySlug,items:response.data},{haveError:false})))
      .catch(err => dispatch(receiveCountry({},{haveError:true,error:err})))
  }
}

function shouldFetchCountries(state) {
  const countries = state.allCountries
  if (!countries.items) {
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
function shouldFetchCountry(state,countrySlug) {
  const country = state.selectedCountry
  if (!country.history) {
    return true
  } else if (country.isFetching) {
    return false
  } else if (country.slug !== countrySlug) {
    return true
  } else {
    return country.didInvalidate
  }
}

export function fetchCountryIfNeeded(countrySlug) {
  return (dispatch, getState) => {
    if (shouldFetchCountry(getState(),countrySlug)) {
      return dispatch(fetchCountry(countrySlug))
    }
  }
}