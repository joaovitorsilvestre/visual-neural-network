<template lang="jade">
  div
    .row
      h1 Rede Neural
    neural-network(:firstLayer="3", :hiddenLayer="3", :outputLayer="3", :header="false")
    .row
      h2 First Layer
    .row
      p Os neuronios do primeiro layer que irão receber os inputs

</template>

<script>
import NeuralNetwork from '../common/NeuralNetwork.vue'

export default {
  components: {
    NeuralNetwork
  }
}
</script>

