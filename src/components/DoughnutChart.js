// import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from "chart.js";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ChartView extends Component {
  constructor(props) {
    super(props);
    this.myDoughnutChart = null;

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
        <canvas ref={this.chartRef} width="1000" height="500"></canvas>
      </div>
    );
  }

  updateData() {
    this.dataset = {
      datasets: [
        {
          data: [
            this.props.data.Active / this.props.data.Confirmed,
            this.props.data.Deaths / this.props.data.Confirmed,
            this.props.data.Recovered / this.props.data.Confirmed,
          ],
          backgroundColor: ["#ffeb3b", "#f44336", "#2196f3"],
          label: "Division of Confirmed cases",
        },
      ],
      labels: ["Active", "Deaths", "Recovered"],
    };
  }

  buildChart() {
    if (this.myDoughnutChart) this.myDoughnutChart.destroy();
    this.myDoughnutChart = new Chart(this.chartRef.current, {
      type: "doughnut",
      data: this.dataset,
      options: {
        plugins: {
          datalabels: {
            color: "blue",
            labels: {
              title: {
                font: {
                  weight: "bold",
                },
              },
              value: {
                color: "green",
              },
            },
          },
        },
        cutoutPercentage: 50,
        responsive: true,
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: "Division of Confirmed cases",
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              //get the concerned dataset
              var dataset = data.datasets[tooltipItem.datasetIndex];
              //calculate the total of this data set
              var total = dataset.data.reduce(function (
                previousValue,
                currentValue,
                currentIndex,
                array
              ) {
                return previousValue + currentValue;
              });
              //get the current items value
              var currentValue = dataset.data[tooltipItem.index];
              //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
              var percentage = ((currentValue / total) * 100).toFixed(2);

              return percentage + "%";
            },
          },
        },
      },
    });
  }
}

ChartView.propTypes = {
  data: PropTypes.object.isRequired,
};
