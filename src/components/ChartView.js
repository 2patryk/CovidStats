import Chart from "chart.js";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ChartView extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.dataset = {};
  }

  componentWillReceiveProps() {
    
  }

  componentDidUpdate(){
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
    const filteredHistory = this.props.history.filter((value)=> value.Confirmed > 0)
    this.dataset = {
      labels: filteredHistory.map((value) => new Date(value.date).toLocaleDateString("pl-PL")),
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
        }
        // {
        //     label: 'My Second dataset',
        //     borderColor: window.chartColors.blue,
        //     backgroundColor: window.chartColors.blue,
        //     fill: false,
        //     data: [
        //         randomScalingFactor(),
        //         randomScalingFactor(),
        //         randomScalingFactor(),
        //         randomScalingFactor(),
        //         randomScalingFactor(),
        //         randomScalingFactor(),
        //         randomScalingFactor()
        //     ],
        //     yAxisID: 'y-axis-2'
        // }
      ],
    };
  }

  buildChart() {
    var myLineChart = new Chart(this.chartRef.current, {
      type: "line",
      data: this.dataset,
      options: {
        responsive: true,
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
            // {
            //   type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            //   display: true,
            //   position: "right",
            //   id: "y-axis-2",

            //   // grid line settings
            //   gridLines: {
            //     drawOnChartArea: false, // only want the grid lines for one axis to show up
            //   },
            // },
          ],
        },
      },
    });
  }
}

ChartView.propTypes = {
  history: PropTypes.array.isRequired,
};
