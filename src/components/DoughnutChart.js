import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./DoughnutChart.module.css";
import { LightenDarkenColor } from "../utils/utils";
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
        <canvas ref={this.chartRef} className={styles.doughnutChart}></canvas>
      </div>
    );
  }

  updateData() {
    this.dataset = {
      datasets: [
        {
          data: [
            this.props.data.Active,
            this.props.data.Deaths,
            this.props.data.Recovered,
          ],
          backgroundColor: ["#ffeb3b", "#f44336", "#2196f3"],
          label: "Division of Confirmed cases",
          datalabels: {},
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
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          datalabels: {
            borderColor: "white",
            borderRadius: 50,
            borderWidth: 2,
            backgroundColor: function (context) {
              let ar = context.dataset.backgroundColor.map((value) => {
                return LightenDarkenColor(value, -17);
              });

              return ar;
            },
            color: "white",
            display: "true",
            textShadowColor: "rgba(0,0,0,0.5)",
            textShadowBlur: 5,
            font: {
              size: 16,
            },
            padding: 10,
            labels: {
              title: {
                font: {
                  weight: "bold",
                },
              },
              value: {
                color: "green",
                textStrokeColor: "blue",
              },
            },
            formatter: function (value, context) {
              let total = context.dataset.data.reduce(function (
                previousValue,
                currentValue,
              ) {
                return previousValue + currentValue;
              });
              return (value/total * 100).toFixed(2) + "%";
            },
          },
        },
        cutoutPercentage: 50,
        responsive: true,
        aspectRatio: 1.5,
        // maintainAspectRatio: false,
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
             
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var currentValue = dataset.data[tooltipItem.index];

              return data.labels[tooltipItem.index] + ": " + currentValue.toLocaleString();
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
