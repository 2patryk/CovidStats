import axios from "axios";

export const REQUEST_COUNTRIES = "REQUEST_COUNTRIES";
export const RECEIVE_COUNTRIES_SUCCESS = "RECEIVE_COUNTRIES_SUCCESS";
export const RECEIVE_COUNTRIES_FAILURE = "RECEIVE_COUNTRIES_FAILURE";
export const INVALIDATE_COUNTRIES = "INVALIDATE_COUNTRIES";

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
