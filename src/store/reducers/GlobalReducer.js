import {RESET_ERROR_MESSAGE, SET_IS_MOBILE} from '../actions/GlobalActions';
import { combineReducers } from "redux";

function error(state = null, action) {
    if (action.type === RESET_ERROR_MESSAGE) {
      return null
    } else if (action.error) {
      return action.error
    }
  
    return state;
  }

  function isMobile(state = false, action){
    if(action.type === SET_IS_MOBILE){
      return action.payload.isMobile
    }

    return state;
  }
  const globalReducer = combineReducers({
    error,
    isMobile
  });

  export default globalReducer;
  