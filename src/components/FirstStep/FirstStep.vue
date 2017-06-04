<template lang="jade">
  div
    .row
      .col-md-1
        h4 Valores Entrada
      .col-md-1
        h4 Input layer
      .col-md-3
        h4 Peso: 2
      .col-md-1
        h4 f(x)
      .col-md-3
        h4 Peso: 3
      .col-md-1
        h4 Output Layer
      .col-md-2
        h4 Valores de Saída

    .row
      .col-md-1.no-padd
        input.form-control(type="text" placeholder="input" v-model="input")
      .col-md-1.no-padd
        .circle.pull-right
      .col-md-3.no-padd
        .line
      .col-md-1.no-padd
        .circle
      .col-md-3.no-padd
        .line
      .col-md-1.no-padd
        .circle
      .col-md-2.no-padd
        h1 {{ neural.outputLayer.output }}

    .row
      .col-md-1
      .col-md-1
      .col-md-3
        h2 2 x {{ neural.w1.input }}
      .col-md-1
        h2 f({{ neural.w1.output }})
      .col-md-3
        h2 {{ neural.hiddenLayer.output }} x 3
      .col-md-1
        h2 f({{ neural.w2.output }})
      .col-md-2
    .row
      .col-md-6
        h1 Sigmoid function
        br
        h4 Essa é a função mais comum que é utilizada para simular neuronios
      .col-md-6
        sigmoid(:input="neural.w1.output")

</template>

<script>
import Sigmoid from '../common/Sigmoid/Sigmoid.vue'

export default {
  data () {
    return {
      input: 2
    }
  },
  computed: {
    neural () {
      const input = parseFloat(this.input) || 0

      const w1 = {input: input, output: this.round(input * 2)}
      const hiddenLayer = {input: w1.value, output: this.sigmoid(w1.output, true)}
      const w2 = {input: hiddenLayer.output, output: this.round(hiddenLayer.output * 3)}
      const outputLayer = {input: w2.output, output: this.sigmoid(w2.output, true)}

      return {
        w1,
        hiddenLayer,
        w2,
        outputLayer
      }
    }
  },
  methods: {
    sigmoid (t, round) {
      if (!round) { return 1 / (1 + Math.pow(Math.E, -t)) }
      return this.round(1 / (1 + Math.pow(Math.E, -t)))
    },
    round (num) {
      return Math.round(num * 100) / 100
    }
  },
  components: {
    Sigmoid
  }
}
</script>
