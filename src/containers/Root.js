import React, { Component } from "react";
import { Provider } from "react-redux";
import _store from "../store/store";

import App from "./App";
const store = _store();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}
