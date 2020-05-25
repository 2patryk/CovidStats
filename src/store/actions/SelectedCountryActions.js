import axios from "axios";

export const REQUEST_COUNTRY = "REQUEST_COUNTRY";
export const RECEIVE_COUNTRY_SUCCESS = "RECEIVE_COUNTRY_SUCCESS";
export const RECEIVE_COUNTRY_FAILURE = "RECEIVE_COUNTRY_FAILURE";
export const INVALIDATE_COUNTRY = "INVALIDATE_COUNTRY";

export function invalidateCountry() {
  return {
    type: INVALIDATE_COUNTRY,
  };
}

function requestCountry() {
  return {
    type: REQUEST_COUNTRY,
  };
}

function receiveCountrySuccess(payload) {
  return {
    type: RECEIVE_COUNTRY_SUCCESS,
    payload,
  };
}
function receiveCountryFailure(error) {
  return {
    type: RECEIVE_COUNTRY_FAILURE,
    error,
  };
}

function fetchCountry(countrySlug) {
  return (dispatch) => {
    dispatch(requestCountry());
    axios
      .get(`https://api.covid19api.com/total/country/${countrySlug}`)
      .then((response) =>
        dispatch(
          receiveCountrySuccess({
            slug: countrySlug,
            name: response.data[0].Country,
            history: response.data.map((value) => {
              return {
                Active: value.Active,
                Deaths: value.Deaths,
                Recovered: value.Recovered,
                Confirmed: value.Confirmed,
                date: value.Date,
              };
            }),
            receivedAt: Date.now(),
          })
        )
      )
      .catch((error) => dispatch(receiveCountryFailure(error)));
  };
}

function shouldFetchCountry(state, countrySlug) {
  const country = state.selectedCountry;
  if (!country.history) {
    return true;
  } else if (country.isFetching) {
    return false;
  } else if (country.slug !== countrySlug) {
    return true;
  } else {
    return country.didInvalidate;
  }
}

export function fetchCountryIfNeeded(countrySlug) {
  return (dispatch, getState) => {
    if (shouldFetchCountry(getState(), countrySlug)) {
      return dispatch(fetchCountry(countrySlug));
    }
  };
}
