<template lang="jade">
  .row(v-on:mousemove="moveMouse($event)")
    .col-md-6.col-md-offset-3.fix-position(v-if="header")
      .col-md-1.center-element
      .col-md-1.center-element
        h4 First Layer
      .col-md-8.center-element
        h4 Hidden Layer
      .col-md-1.center-element
        h4 Output Layer
      .col-md-1.center-element

    span(v-for="(c, index) in connections")
      connection(:first="c.pos[0]", :second="c.pos[1]", :color="index == 0 ? 'black' : 'gray'", :active="true",
      :mousePosX="mousePosX", :weight="c.weight", :input="c.input", :output="c.output", :key="c.id")

    .col-md-6.col-md-offset-3.fix-position
      .col-md-1.layer
        span.item(v-for="(n, index) in firstLayer")
          input.form-control(type="text", :value="inputs[index]")
      .col-md-1.layer
        span.item(v-for="(n, index) in firstLayer")
          neuron(:ref="'nFirstLayer' + index", :text="'f(' + inputs[index] + ')'")
      .col-md-8.layer
        span.item(v-for="(n, index) in hiddenLayer")
          neuron(:ref="'nHiddenLayer' + index", :text="'f(' + round(hiddenLayerInputs[index]) + ')'")
      .col-md-1.layer
        span.item(v-for="(n, index) in outputLayer")
          neuron(:ref="'nOutputLayer' + index", :text="'f(' + round(outputLayerInputs[index]) + ')'")
      .col-md-1.layer
        span.item(v-for="(n, index) in outputLayer")
          label.form-control(type="text") {{ round(outputs[index]) }}
</template>

<script>
import Connection from '../common/Connection.vue'
import Neuron from '../common/Neuron.vue'
import Neural from '../../neural/Neural'

export default {
  components: {
    Neuron,
    Connection
  },
  props: ['firstLayer', 'hiddenLayer', 'outputLayer', 'header'],
  data () {
    return {
      connections: [],
      inputs: [2, 1, 0.2],
      hiddenLayerInputs: [0, 0, 0],
      outputLayerInputs: [0, 0, 0],
      outputs: [],
      mousePosX: 0,
      neural: new Neural(this.firstLayer, this.hiddenLayer, this.outputLayer)
    }
  },
  mounted () {
    const r = this.neural.partial(this.inputs)
    this.hiddenLayerInputs = r.inputsHiddenLayer
    this.outputLayerInputs = r.inputsOutputLayer
    this.outputs = r.outputsOutputLayer

    let id = 0
    for (let nf = 0; nf < this.firstLayer; nf++) {
      for (let nh = 0; nh < this.hiddenLayer; nh++) {
        this.connections.push({
          pos: [this.getPos(this.$refs['nFirstLayer' + nf][0].$el), this.getPos(this.$refs['nHiddenLayer' + nh][0].$el)],
          input: r.outputsFirstLayer[nf],
          output: r.outputsFirstWeight[nf][nh],
          weight: this.neural.wih.tolist()[nf][nh],
          id: 'conecction' + id
        })
        id++
      }
    }

    for (let nh = 0; nh < this.hiddenLayer; nh++) {
      for (let no = 0; no < this.outputLayer; no++) {
        this.connections.push({
          pos: [this.getPos(this.$refs['nHiddenLayer' + nh][0].$el), this.getPos(this.$refs['nOutputLayer' + no][0].$el)],
          input: r.outputsHiddenLayer[nh],
          output: r.outputsSecondWeight[nh][no],
          weight: this.neural.who.tolist()[no][nh],
          id: 'conecction' + id
        })
        id++
      }
    }
  },
  methods: {
    getPos (el) {
      return {
        x: el.getBoundingClientRect().left + (el.offsetWidth / 2),
        y: this.getDistanceFromTop(el)
      }
    },
    getDistanceFromTop (el) {
      return el.getBoundingClientRect().top + window.scrollY - (el.offsetHeight / 0.9)
    },
    moveMouse (e) {
      this.mousePosX = e.x
    },
    round (num) {
      return Math.round(num * 100) / 100
    }
  }
}
</script>

<style>
  .layer {
    position: static !important;
    height: 550px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column; /* works with row or column */
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .fix-position {position: static !important;}

  .item {
    display: flex;
    flex: 2 0 0;
  }
  .item input, label {
    max-height: 50% !important;
    align-self: center;
  }

</style>

