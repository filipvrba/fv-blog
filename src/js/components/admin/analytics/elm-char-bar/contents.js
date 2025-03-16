import Chart from "chart.js/auto";

export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._canvas = this._parent.querySelector("#adminAnalyticsChartBarCanvas");
    this._ctx = this._canvas.getContext("2d")
  };

  renderChart(data) {
    let chart = Chart.getChart(this._canvas);

    if (chart) {
      chart.data.labels = data.labels;
      chart.data.datasets[0].data = data.datasets[0].data;
      return chart.update()
    } else {
      return new Chart(this._ctx, {type: "bar", data, options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {y: {beginAtZero: true}}
      }})
    }
  }
}