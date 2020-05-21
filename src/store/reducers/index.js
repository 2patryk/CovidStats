import { combineReducers } from "redux";
import allCountries from './AllCountries';
import selectedCountry from './SelectedCountry';
import global from './GlobalReducer';

const rootReducer = combineReducers({
  global,
  allCountries,
  selectedCountry
});

export default rootReducer;
