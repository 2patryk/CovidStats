import {
    REQUEST_COUNTRIES,
    RECEIVE_COUNTRIES,
    INVALIDATE_COUNTRIES,
  } from "../actions";
  
const defaultState = {
  isFetching: false,
  didInvalidate: true,
  items: [],
  lastUpdated: 0,
  haveError:false
}

function countries(
  state = defaultState,
    action
  ) {
    switch (action.type) {
      case INVALIDATE_COUNTRIES:
        return Object.assign({}, state, {
          didInvalidate: true,
        });
      case REQUEST_COUNTRIES:
        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false,
          items: [],
        });
      case RECEIVE_COUNTRIES:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: action.countries,
          summary: action.summary,
          dateOfDataUpdate: action.dateOfDataUpdate,
          lastUpdated: action.receivedAt,
          haveError: action.haveError,
          lastError: action.lastError,
        });
      default:
        return state;
    }
  }

  export default function allCountries(state = defaultState, action) {
    switch (action.type) {
      case INVALIDATE_COUNTRIES:
      case RECEIVE_COUNTRIES:
      case REQUEST_COUNTRIES:
        return Object.assign({}, state, countries(state, action));
      default:
        return state;
    }
  }
  