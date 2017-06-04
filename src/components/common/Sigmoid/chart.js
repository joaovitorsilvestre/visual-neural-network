import { Line, mixins } from 'vue-chartjs'

export default Line.extend({
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    const options = {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          ticks: {
            min: -6,
            max: 6
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            max: 1,
            min: 0,
            stepSize: 0.2
          }
        }]
      }
    }

    this.renderChart(this.chartData, options)
  }
})
