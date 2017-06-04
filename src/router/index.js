import Vue from 'vue'
import Router from 'vue-router'
import Neuron from '../components/Neuron/Neuron.vue'
import LayerNeuronWeigths from '../components/LayerNeuronWeigths/LayerNeuronWeigths.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Neuron',
      component: Neuron
    },
    {
      path: '/layer-neuron-weigths',
      name: 'LayerNeuronWeigths',
      component: LayerNeuronWeigths
    }
  ]
})
