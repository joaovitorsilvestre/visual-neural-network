<template lang="jade">
  div
    svg(:width="size.width", :height="size.height")
      path(:id="uniqueId", :d="dataPath"
      stroke-linecap="round" stroke-width="1" fill="none")
      text(ref='textEl', :x="posMouse" y="100%" fill="#4fc08d" font-size="20" font-family="'Lato', sans-serif")
        textPath(:xlink:href="'#' + uniqueId") {{ value }}

</template>

<script>
export default {
  props: ['path', 'text', 'mousePosX', 'input', 'output', 'popOver'],
  data () {
    return {
      posX: 0
    }
  },
  mounted () {
    this.initial = this.$refs['textEl'].getBoundingClientRect().left
  },
  computed: {
    value () {
      return this.mousePosX < this.popOver ? this.round(this.input) : this.round(this.output)
    },
    dataPath () {
      return 'M' + this.path
    },
    posMouse () {
      return (this.mousePosX - this.initial)
    },
    size () {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    },
    uniqueId () {
      return this._uid
    }
  },
  methods: {
    round (num) {
      return Math.round(num * 100) / 100
    }
  }
}
</script>

<style scoped>
  div {
    position: absolute;
  }

  svg {
    left: 0px;
    overflow: visible !important;
  }
</style>
