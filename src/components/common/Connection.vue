<template lang="jade">
  span
    path-line(:path="path", :mousePosX="mousePosX", :input="input", :output="output", :popOver="popPos")
    svg.line-svg
      line(:x1='first.x', :y1='first.y', :x2='second.x', :y2='second.y', :stroke="color || 'black'" stroke-width="5")
    div.tab(v-if="active" ref="pop", :style="popOver" v-on:mouseenter="showPopOver()" v-on:mouseout="hidePopOver()")
      span.weight {{ round(weight) }}

</template>

<script>
import PathLine from './PathLine.vue'

export default {
  components: {
    PathLine
  },
  props: ['first', 'second', 'color', 'active', 'mousePosX', 'weight', 'input', 'output'],
  data () {
    return {
      showPop: false,
      popPos: 0
    }
  },
  mounted () {
    if (this.active) {
      this.popPos = this.$refs['pop'].offsetLeft + (this.$refs['pop'].clientWidth / 2)
    }
  },
  computed: {
    value () {
      return 10
    },
    path () {
      return [[this.first.x, this.first.y], [this.second.x, this.second.y]]
    },
    popOver (e) {
      const x = this.second.x - this.first.x
      const y = this.second.y - this.first.y
      const h = Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2))
      const rot = this.toDegrees(Math.asin(y / h))

      return {
        left: (((this.second.x + this.first.x) / 2) - 25) + 'px',
        'margin-top': (((this.second.y + this.first.y) - 60) / 2) + 'px',
        transform: 'rotate(' + rot + 'deg)'
      }
    }
  },
  methods: {
    getDistanceFromTop (el) {
      return el.getBoundingClientRect().top + window.scrollY - (el.offsetHeight / 0.9)
    },
    showPopOver () {
      this.showPop = true
    },
    hidePopOver () {
      this.showPop = false
    },
    toDegrees (angle) {
      return angle * (180 / Math.PI)
    },
    getRandom (min, max) {
      return Math.random() * (max - min) + min
    },
    round (num) {
      return Math.round(num * 100) / 100
    }
  }
}
</script>

<style>
  .weight {
    font-size: 20px;
    left: 0px;
    color: whitesmoke;
  }

  .pop-over {
    position: absolute;
    width: 70px;
    height: 30px;
    z-index: 100000;
  }

  .line-svg {
    left: 0px;
    position: absolute;
    overflow: visible !important;
  }

  .tab {
    float: left;
    width: 60px;
    height: 30px;
    position: absolute;
    background: black;
    -webkit-border-top-left-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    -moz-border-radius-topleft: 10px;
    -moz-border-radius-topright: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .tab:before,
  .tab:after {
    content: "";
    position: absolute;
    height: 10px;
    width: 20px;
    bottom: 0;
  }

  .tab:after {
    right: -20px;
    border-radius: 0 0 0 10px;
    -moz-border-radius: 0 0 0 10px;
    -webkit-border-radius: 0 0 0 10px;
    -webkit-box-shadow: -10px 0 0 0 black;
    box-shadow: -10px 0 0 0 black;
  }

  .tab:before {
    left: -20px;
    border-radius: 0 0 10px 0;
    -moz-border-radius: 0 0 10px 0;
    -webkit-border-radius: 0 0 10px 0;
    -webkit-box-shadow: 10px 0 0 0 black;
    box-shadow: 10px 0 0 0 black;
  }
</style>
