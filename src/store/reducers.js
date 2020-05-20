import { combineReducers } from 'redux'
import {
  REQUEST_COUNTRIES,
  RECEIVE_COUNTRIES,
  INVALIDATE_COUNTRIES
} from './actions'


function countries(
  state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        lastUpdated: 0
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_COUNTRIES:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_COUNTRIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        items:[]
      })
    case RECEIVE_COUNTRIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.countries,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function allCountries(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_COUNTRIES:
    case RECEIVE_COUNTRIES:
    case REQUEST_COUNTRIES:
      return Object.assign({}, state, 
        countries(state, action)
      )
    default:
      return state
  }
}

const rootReducer = combineReducers({
    allCountries
})

export default rootReducer