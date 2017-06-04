<template lang="jade">
  div
    .row
      h1 Como os neuronios de uma rede neural funcionam?
    .row
      step-one(v-if="step == 1")
      step-two(v-if="step == 2")

    .row
      .col-md-2.col-md-offset-4
        action-button(text='Anterior', :onClick="previous")
      .col-md-2
        action-button(text='Próximo', :onClick="next")

</template>

<script>
import StepOne from './StepOne.vue'
import StepTwo from './StepTwo.vue'
import ActionButton from '../common/ActionButton.vue'

export default {
  components: {
    StepOne,
    StepTwo,
    ActionButton
  },
  data () {
    return {
      step: 1
    }
  },
  methods: {
    next () {
      this.step = 1 + this.step
      if (this.step === 3) {
        this.$router.push('layer-neuron-weigths')
      }
    },
    previous () {
      this.step = this.step - 1
      if (this.step === 0) {
        this.step = 1
      }
    }
  }
}
</script>

<style>
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
