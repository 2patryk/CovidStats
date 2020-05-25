import {
  REQUEST_COUNTRY,
  RECEIVE_COUNTRY_SUCCESS,
  RECEIVE_COUNTRY_FAILURE,
  INVALIDATE_COUNTRY,
} from "../actions/SelectedCountryActions";

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
      return {
        ...state,
        ...{
          didInvalidate: true,
        },
      };
    case REQUEST_COUNTRY:
      return {
        ...state,
        ...{
          isFetching: true,
          didInvalidate: false,
          history: [],
        },
      };
    case RECEIVE_COUNTRY_SUCCESS:
      return {
        ...state,
        ...{
          slug: action.payload.slug,
          name: action.payload.name,
          isFetching: false,
          didInvalidate: false,
          history: action.payload.history,
          lastUpdated: action.payload.receivedAt,
          haveError:false
        },
      };
    case RECEIVE_COUNTRY_FAILURE:
      return {
        ...state,
        ...{ isFetching: false, didInvalidate: false, haveError: true },
      };
    default:
      return state;
  }
}

export default function selectedCountry(state = defaultState, action) {
  switch (action.type) {
    case INVALIDATE_COUNTRY:
    case RECEIVE_COUNTRY_SUCCESS:
    case RECEIVE_COUNTRY_FAILURE:
    case REQUEST_COUNTRY:
      return Object.assign({}, state, country(state, action));
    default:
      return state;
  }
}
