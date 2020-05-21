import {
  REQUEST_COUNTRY,
  RECEIVE_COUNTRY,
  INVALIDATE_COUNTRY,
} from "../actions";

const defaultState = {
  name: "",
  isFetching: false,
  didInvalidate: false,
  history: [],
  lastUpdated: 0,
  haveError: false,
};

function country(state = defaultState, action) {
  switch (action.type) {
    case INVALIDATE_COUNTRY:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_COUNTRY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        history: [],
      });
    case RECEIVE_COUNTRY:
      return Object.assign({}, state, {
        slug: action.slug,
        name: action.name,
        isFetching: false,
        didInvalidate: false,
        history: action.history,
        lastUpdated: action.receivedAt,
        haveError: action.haveError,
        lastError: action.lastError,
      });
    default:
      return state;
  }
}

export default function selectedCountry(state = defaultState, action) {
  switch (action.type) {
    case INVALIDATE_COUNTRY:
    case RECEIVE_COUNTRY:
    case REQUEST_COUNTRY:
      return Object.assign({}, state, country(state, action));
    default:
      return state;
  }
}
