import React, { Component } from "react";
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import {
// fetchCountriesIfNeeded,

// } from '../store/actions'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllCountriesList from "./AllCountriesList";
import Country from "../components/Country";
import Header from "../components/Header";
import history from "../history";

class App extends Component {
  render() {
    //   const { selectedSubreddit, posts, isFetching, lastUpdated,match: { params } } = this.props
    //   return (
    //     <div>
    //       <Picker
    //         value={params.sub || 'gonciarz'}
    //         onChange={this.handleChange}
    //         options={['reactjs', 'frontend', 'gonciarz']}
    //       />
    //       <p>
    //         {lastUpdated && (
    //           <span>
    //             Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
    //           </span>
    //         )}
    //         {!isFetching && (
    //           <button onClick={this.handleRefreshClick}>Refresh</button>
    //         )}
    //       </p>
    //       {isFetching && posts.length === 0 && <h2>Loading...</h2>}
    //       {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
    //       {posts.length > 0 && (
    //         <div style={{ opacity: isFetching ? 0.5 : 1 }}>
    //           <Posts posts={posts} />
    //         </div>
    //       )}
    //     </div>
    //   )
    // }
    
    return (
      <div>
        <Router history={history}>
          <Header />
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
}

export default App;

// AsyncApp.propTypes = {
//   selectedSubreddit: PropTypes.string.isRequired,
//   posts: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// }

// function mapStateToProps(state) {
//   const { selectedSubreddit, postsBySubreddit } = state
//   const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {
//     isFetching: true,
//     items: []
//   }

//   return {
//     selectedSubreddit,
//     posts,
//     isFetching,
//     lastUpdated
//   }
// }

// export default connect(mapStateToProps)(AsyncApp)
