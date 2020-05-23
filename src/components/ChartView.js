import Chart from "chart.js";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ChartView extends Component {
  constructor(props) {
    super(props);
    this.myLineChart = null;

    this.chartRef = React.createRef();
    this.dataset = {};
  }

  componentDidMount() {
    this.updateData();
    this.buildChart();
  }

  componentDidUpdate() {
    this.updateData();
    this.buildChart();
  }

  render() {
    return (
      <div>
        <canvas
          id="myChart"
          ref={this.chartRef}
          width="1000"
          height="500"
        ></canvas>
      </div>
    );
  }

  updateData() {
    console.log("updateData");
    const filteredHistory = this.props.history.filter(
      (value) => value.Confirmed > 0
    );
    this.dataset = {
      labels: filteredHistory.map((value) =>
        new Date(value.date).toLocaleDateString("pl-PL")
      ),
      datasets: [
        {
          label: "Confirmed",
          borderColor: "orange",
          backgroundColor: "orange",
          fill: false,
          data: filteredHistory.map((value) => value.Confirmed),
          yAxisID: "y-axis-1",
        },
        {
          label: "Deaths",
          borderColor: "red",
          backgroundColor: "red",
          fill: false,
          data: filteredHistory.map((value) => value.Deaths),
          yAxisID: "y-axis-1",
        },
        {
          label: "Recovered",
          borderColor: "blue",
          backgroundColor: "blue",
          fill: false,
          data: filteredHistory.map((value) => value.Recovered),
          yAxisID: "y-axis-1",
        },
      ],
    };
  }

  buildChart() {
    if (this.myLineChart) this.myLineChart.destroy();
    this.myLineChart = new Chart(this.chartRef.current, {
      type: "line",
      data: this.dataset,
      options: {
        responsive: true,
        elements: {
          point: {
            radius: 0,
          },
        },
        hoverMode: "index",
        stacked: false,

        scales: {
          yAxes: [
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "left",
              id: "y-axis-1",
            },
          ],
        },
      },
    });
  }
}

ChartView.propTypes = {
  history: PropTypes.array.isRequired,
};
