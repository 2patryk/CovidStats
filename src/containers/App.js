import React, { Component } from "react";
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {
// fetchCountriesIfNeeded,

// } from '../store/actions'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllCountriesList from "./AllCountriesList";
import Country from "./Country";
import Header from "../components/Header";

class App extends Component {
  constructor(){
    super();

    this.state = {
      searchValue: ""
    }

    this.onSearchChanged = this.onSearchChanged.bind(this);
  }

  onSearchChanged(e){
    
    this.setState({
      searchValue: e.currentTarget.value
    })
  }

  render() {
    return (
      <div>
        <Router basename="/covid/">
          <Header onChange={this.onSearchChanged} searchValue={this.state.searchValue}/>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="main-box">
                  <Switch>
                    <Route exact path="/" component={AllCountriesList} />
                    <Route path="/:country" component={Country} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
       console.log("Loading change");
    }
}


}
 export default App;


// AsyncApp.propTypes = {
//   selectedSubreddit: PropTypes.string.isRequired,
//   posts: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// }

// function mapStateToProps(state){ 
// const { loading } = state.loading || false;

// return { loading }
// }


// export default connect(mapStateToProps)(App)
