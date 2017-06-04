<template lang="jade">
  div
    .row
      div(style="width:5%; height: 100%; float: left;")
        h1.input-num {{ inputSigmoid }}
      div(style="width:10%; margin-left: 45%; float: left;")
        neuron(text="ƒ(x)" textSize="30px")
      div(style="width:5%; height: 100%; float: left;")
        h1.output-num {{ sigmoid(inputSigmoid, true) }}
    br
    .row
      .col-md-4.col-md-offset-4
        p O neuronio irá fazer um calculo com o valor de entrada para determinar qual deverá ser a saida.
         | O importante é que a saida também tem que ser um numero entre 0 e 1.
        p A função mais utilizada para isso chama-se &nbsp;
          a(href="https://pt.wikipedia.org/wiki/Fun%C3%A7%C3%A3o_sigm%C3%B3ide" target="_blank") sigmoid
          | . Independentemente do valor que você passar para ela
          | ela irá retornar um valor entre 0 e 1. Quando menor o valor passado mais perto de zero ela retorna, e
          | o mesmo vale para numeros grandes, retornando algo mais próximo de 1.
    br
    .row
      .col-md-6.col-md-offset-3
        p Não acredita que isso é possivel?
      .col-md-2.col-md-offset-5
        label Tente você mesmo: &nbsp;
          input.form-control(type="text" v-model="inputSigmoid")
      .col-md-4.col-md-offset-4
        sigmoid(:input="inputSigmoid")

</template>

<script>
import Neuron from '../common/Neuron.vue'
import Sigmoid from '../common/Sigmoid/Sigmoid.vue'

export default {
  components: {
    Neuron,
    Sigmoid
  },
  data () {
    return {
      inputSigmoid: 0.9
    }
  },
  methods: {
    sigmoid (t, round) {
      t = isNaN(t) ? parseFloat(t) : t
      if (!round) { return 1 / (1 + Math.pow(Math.E, -t)) }
      return this.round(1 / (1 + Math.pow(Math.E, -t)))
    },
    round (num) {
      return Math.round(num * 100) / 100
    }
  }
}
</script>

<style scoped>
  @keyframes in-neuron {
    0% {margin-left: 42%;}
    50% {margin-left: 49%;}
    100% {margin-left: 49%;}
  }

  @keyframes out-neuron {
    0% {margin-left: -6.5%;}
    50% {margin-left: -6.5%;}
    100% {margin-left: 0%;}
  }

  .input-num {
    position: absolute;
    margin-left: 42%;
    margin-top: 40px;
    animation: in-neuron 8s linear 0s infinite;
  }
  .output-num {
    position: absolute;
    margin-left: -6%;
    margin-top: 40px;
    animation: out-neuron 8s linear 0s infinite;
  }

  p {font-size: 18px}
</style>
