import { combineReducers } from "redux";
import allCountries from './AllCountries';
import selectedCountry from './SelectedCountry';

const rootReducer = combineReducers({
  allCountries,
  selectedCountry
});

export default rootReducer;
