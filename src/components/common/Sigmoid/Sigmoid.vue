<template lang="jade">
  chart(:chartData="optionsChart", :height="200")
</template>

<script>
  import chart from './chart'

  export default {
    props: ['input'],
    computed: {
      optionsChart () {
        const input = parseFloat(this.input) || 0

        const temp = [...Array(12).fill().map((_, i) => i - 6), input]
        temp.sort((a, b) => { return a - b })
        const labels = new Set(temp).toJSON()

        let data = []
        labels.forEach(item => {
          data.push({
            x: item,
            y: this.sigmoid(item)
          })
        })
        const pointRadius = data.map(item => { return item.x === input ? '5' : '0' })

        return {
          datasets: [
            {
              label: '',
              data,
              pointBackgroundColor: 'palegreen',
              pointRadius
            }
          ]
        }
      }
    },
    methods: {
      sigmoid (t) {
        return 1 / (1 + Math.pow(Math.E, -t))
      }
    },
    components: {
      chart
    }
  }
</script>

