import Chart from "chart.js";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class LineChart extends Component {
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
    this.updateChart();
  }

  updateChart() {
    this.myLineChart.aspectRatio = this.props.isMobile ? 1 : 2.5;
    this.myLineChart.options.elements.point.radius = this.props.isMobile ? 0 : 3;
    this.myLineChart.resize();
    this.myLineChart.update();
  }

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef}></canvas>
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
      plugins:[{
        beforeInit: function (chart, options) {
          chart.legend.afterFit = function () {
            this.height = this.height + 20;
          };
        },
      }],
      options: {
        responsive: true,
        aspectRatio: this.props.isMobile ? 1 : 2.5,
        elements: {
          point: {
            radius: this.props.isMobile ? 0 : 3,
          },
        },
        hoverMode: "index",
        stacked: false,
        layout: {
          padding: {
            top: 10,
            bottom: 20,
          },
        },
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

LineChart.propTypes = {
  history: PropTypes.array.isRequired,
  isMobile: PropTypes.bool.isRequired,
};
