<template lang="jade">
  div
    .row
      div(style="width:5%; height: 100%; float: left;")
        h1.input-num 0.9
      div(style="width:10%; margin-left: 45%; float: left;")
        neuron
      div(style="width:5%; height: 100%; float: left;")
        h1.output-num 0.71
    br
    .row
      .col-md-4.col-md-offset-4
        p Cada neuronio pode se conectar com varios neuronios, e sempre que este é ativado ele
          | envia um sinal para o próximo neuronio.
        p Agora pense nesse sinal como um número entre 0 e 1,
          | sendo 0 ausencia de sinal e 1 o sinal mais forte possivel.
    br
</template>

<script>
import Neuron from '../common/Neuron.vue'

export default {
  components: {
    Neuron
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
