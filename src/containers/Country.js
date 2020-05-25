import React, { Component } from "react";
import {
  fetchCountryIfNeeded,
  invalidateCountry,
} from "../store/actions/SelectedCountryActions";
import { connect } from "react-redux";
import LineChart from "../components/charts/LineChart";
import DoughnutChart from '../components/charts/DoughnutChart';
import Counter from "../components/Counter";
import Error from "../components/Error";
import Loading from "../components/Loading";

class Country extends Component {
  constructor(props) {
    super(props);

    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch,match: { params } } = this.props;
    dispatch(invalidateCountry());
    dispatch(fetchCountryIfNeeded(params.country));
  }

  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;
    dispatch(fetchCountryIfNeeded(params.country));
  }
  

  render() {
    const { history, name, lastUpdated, isMobile,haveError,error,isFetching } = this.props;
    return (
      <div>
        {haveError ? <Error onClick={this.handleRefreshClick} error={error} /> : ""}
        {isFetching && (
          <Loading/>
        )}
        {history.length > 0 ? (
          <div>
            <div className="row no-gutters">
              <div className={`col`}>
              <h1 className="headerText">Chart of infections over time since the first case in {name}</h1>

              <div className="cardMaterial">
                <LineChart isMobile={isMobile} history={history} />
                </div>
              </div>
            </div>
            <div className={`row no-gutters`}>
              <div className="col-md-6 colLeft">
        <h1 className="headerText">Coronavirus cases in {name}</h1>

                <div className="cardMaterial flexDefault">
                <Counter data={{
                    Deaths: history[history.length - 1].Deaths,
                    Recovered: history[history.length - 1].Recovered,
                    Confirmed: history[history.length - 1].Confirmed,
                    NewDeaths: history[history.length - 1].Deaths-history[history.length - 2].Deaths,
                    NewRecovered: history[history.length - 1].Recovered-history[history.length - 2].Recovered,
                    NewConfirmed: history[history.length - 1].Confirmed-history[history.length - 2].Confirmed,
                    Date: lastUpdated
                  }} />
                </div>
              </div>
              <div className="col-md-6 colRight">
              <h1 className="headerText">Distribution of confirmed cases</h1>

                <div className="cardMaterial">
                  <DoughnutChart
                    isMobile={isMobile}
                    data={{
                      labels: ["Active", "Deaths", "Recovered"],
                      data: [
                        history[history.length - 1].Confirmed -
                          history[history.length - 1].Recovered -
                          history[history.length - 1].Deaths,
                        history[history.length - 1].Deaths,
                        history[history.length - 1].Recovered,
                      ],
                      colors: ["#ffeb3b", "#f44336", "#2196f3"],
                      label: "Division of Confirmed cases",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedCountry, global } = state;

  const {
    name,
    isFetching,
    lastUpdated,
    country,
    history,
    haveError,
  } = selectedCountry || {
    name: "",
    lastUpdated: 0,
    isFetching: true,
    history: [],
    haveError: false,
  };

  const { isMobile,error } = global || { isMobile: false };

  return {
    name,
    isFetching,
    lastUpdated,
    country,
    history,
    haveError,
    isMobile,
    error
  };
}

export default connect(mapStateToProps)(Country);
