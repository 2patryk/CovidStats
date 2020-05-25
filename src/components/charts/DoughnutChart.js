import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { lightenDarkenColor } from "../../utils/utils";

export default class DoughnutChart extends Component {
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
    this.updateChart();
  }


  render() {
    return (
      <div>
        <canvas ref={this.chartRef}></canvas>
      </div>
    );
  }

  updateData() {
    this.dataset = {
      datasets: [
        {
          data: this.props.data.data,
          backgroundColor: this.props.data.colors,
          label: this.props.data.label,
          datalabels: {},
        },
      ],
      labels: this.props.data.labels,
    };
  }

  updateChart() {
    this.myDoughnutChart.aspectRatio = this.props.isMobile ? 1.1 : 1.6;
    this.myDoughnutChart.resize();
  }

  buildChart() {
    if (this.myDoughnutChart) this.myDoughnutChart.destroy();
    this.myDoughnutChart = new Chart(this.chartRef.current, {
      type: "doughnut",
      data: this.dataset,
      plugins: [
        ChartDataLabels,
        {
          beforeInit: function (chart, options) {
            chart.legend.afterFit = function () {
              this.height = this.height + 20;
            };
          },
        },
      ],
      options: {
        plugins: {
          datalabels: {
            borderColor: "white",
            anchor: "end",
            borderRadius: 50,
            borderWidth: 2,
            backgroundColor: function (context) {
              let ar = context.dataset.backgroundColor.map((value) => {
                return lightenDarkenColor(value, -17);
              });

              return ar;
            },
            color: "white",
            display: function (context) {
              return context.dataset.data[context.dataIndex] > 0; // display labels with an odd index
            },
            align: "center",
            textShadowColor: "rgba(0,0,0,0.5)",
            textShadowBlur: 5,
            font: {
              size: 14,
            },
            padding: 10,
            labels: {
              title: {
                font: {
                  weight: "bold",
                },
              },
              
            },
            formatter: function (value, context) {
              let total = context.dataset.data.reduce(function (
                previousValue,
                currentValue
              ) {
                return previousValue + currentValue;
              });
              return ((value / total) * 100).toFixed(2) + "%";
            },
          },
        },
        cutoutPercentage: 50,
        responsive: true,
        aspectRatio: this.props.isMobile ? 1.1 : 1.6,
        legend: {
          display: true,
          position: "top",
          
        },
        layout: {
          padding: {
            top: 10,
            bottom: 20,
          },
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

              return (
                data.labels[tooltipItem.index] +
                ": " +
                currentValue.toLocaleString()
              );
            },
          },
        },
      },
    });
  }
}

DoughnutChart.propTypes = {
  data: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired
};
