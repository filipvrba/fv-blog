import Chart from "chart.js/auto";

export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._canvas = this._parent.querySelector("#adminAnalyticsChartBarCanvas");
    this._ctx = this._canvas.getContext("2d");
    this._chart = null
  };

  renderChart(data) {
    if (this._chart) {
      this._chart.data.labels = data.labels;
      this._chart.data.datasets[0].data = data.datasets[0].data;
      return this._chart.update()
    } else {
      this._chart = new Chart(this._ctx, {type: "bar", data, options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {y: {beginAtZero: true}},
        onClick: this.barClick.bind(this)
      }});

      return this._chart
    }
  };

  barClick(event) {
    let index, label, options;

    let activePoints = this._chart.getElementsAtEventForMode(
      event,
      "nearest",
      {intersect: true},
      true
    );

    if (activePoints.length > 0) {
      index = activePoints[0].index;
      label = this._chart.data.labels[index];
      options = {hour: label, filterDate: this._parent.filterDate};
      return Modals.charBarModal(options)
    }
  }
}