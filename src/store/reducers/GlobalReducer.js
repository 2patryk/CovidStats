import {RESET_ERROR_MESSAGE} from '../actions/GlobalActions';
import { combineReducers } from "redux";

function error(state = null, action) {
    const { type, error } = action
  
    if (type === RESET_ERROR_MESSAGE) {
      return null
    } else if (error) {
      return error
    }
  
    return state
  }
  const globalReducer = combineReducers({
    error
  });

  export default globalReducer;
  