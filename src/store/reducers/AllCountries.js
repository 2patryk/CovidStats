import {
  REQUEST_COUNTRIES,
  RECEIVE_COUNTRIES_SUCCESS,
  RECEIVE_COUNTRIES_FAILURE,
  INVALIDATE_COUNTRIES,
  SET_FILTER,
  SET_SORT,
  CountriesSorts,
  Order,
} from "../actions/AllCountriesActions";

const defaultState = {
  isFetching: false,
  didInvalidate: true,
  items: [],
  lastUpdated: 0,
  haveError: false,
  dateOfDataUpdate: 0,
  filter: {},
  sort: {
    type: CountriesSorts.BY_CONFIRMED,
    order: Order.DESC,
  },
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
          haveError:false
        },
      };
    case RECEIVE_COUNTRIES_FAILURE:
      return {
        ...state,
        ...{ isFetching: false, didInvalidate: false, haveError: true },
      };
    case SET_SORT:
      return {
        ...state,
        ...{
          sort: { type: action.payload.type, order: action.payload.order },
        },
      };
    case SET_FILTER:
      return {
        ...state,
        ...{
          filter: { type: action.payload.type, data: action.payload.data },
        },
      };
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
    case SET_FILTER:
    case SET_SORT:
      return Object.assign({}, state, countries(state, action));
    default:
      return state;
  }
}
