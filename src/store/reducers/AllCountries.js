import {
  REQUEST_COUNTRIES,
  RECEIVE_COUNTRIES_SUCCESS,
  RECEIVE_COUNTRIES_FAILURE,
  INVALIDATE_COUNTRIES,
} from "../actions/AllCountriesActions";

const defaultState = {
  isFetching: false,
  didInvalidate: true,
  items: [],
  lastUpdated: 0,
  haveError: false,
  dateOfDataUpdate: 0
};

function countries(state = defaultState, action) {
  switch (action.type) {
    case INVALIDATE_COUNTRIES:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_COUNTRIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        haveError: false,
        items: [],
      });
    case RECEIVE_COUNTRIES_SUCCESS:
      return {
        ...state,
        ...{
              isFetching: false,
              didInvalidate: false,
              items: action.payload.countries,
              summary: action.payload.summary,
              dateOfDataUpdate: action.payload.dateOfDataUpdate,
              lastUpdated: action.payload.receivedAt,
            }
      };
      case RECEIVE_COUNTRIES_FAILURE:
        return {...state, ...{isFetching: false, didInvalidate: false, haveError: true}}
    default:
      return state;
  }
}

export default function allCountries(state = defaultState, action) {
  switch (action.type) {
    case INVALIDATE_COUNTRIES:
    case RECEIVE_COUNTRIES_SUCCESS:
    case RECEIVE_COUNTRIES_FAILURE:
    case REQUEST_COUNTRIES:
      return Object.assign({}, state, countries(state, action));
    default:
      return state;
  }
}
