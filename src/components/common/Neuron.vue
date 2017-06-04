<template lang="jade">
  section.section.center
    svg(xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-filters")
      defs
        filter#filter-goo-4
          feGaussianBlur(in="SourceGraphic" stdDeviation="7" result="blur" ref="filter")
          feColorMatrix(in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo")
    button#component-4.button.button--4(:style="{'font-size': textSize || '10px'}"
                                        ref="button"
                                        v-on:mouseup="mouseup",
                                        v-on:mousemove="mousemove") {{ text || text=='' ? text : 'Neuronio' }}
      span.button__bg(style="filter: url('#filter-goo-4')" ref="blobs")
        span.blob
        span.blob
        span.blob
        span.blob
</template>

<script>
  import '../../../static/js/TweenMax.min'

  export default {
    props: ['text', 'textSize'],
    methods: {
      getRandom (min, max) {
        return Math.random() * (max - min) + min
      },
      mouseup () {
        const $ctrl = this
        const blobs = this.$refs['blobs'].childNodes

        let dirX = Math.random() > 0.5 ? -1 : 1
        let dirY = Math.random() > 0.5 ? -1 : 1
        let r = $ctrl.getRandom(60, 80)

        Array.prototype.slice.call(blobs, 1).forEach((bt) => {
          /*eslint-disable */
          let tl = new TimelineLite()
          tl.to(bt, 1.2, { x: dirX * r * Math.random() + '%', y: dirY * r * Math.random() + '%', ease: Elastic.easeOut.config(1, 0.2) })
          tl.to(bt, 1.2, { x: '0%', y: '0%', ease: Elastic.easeOut.config(1, 0.2) }, '-=1.1')
          /*eslint-enable */
        })
      },
      mousemove (e) {
        const bt = this.$refs['button']
        const blobs = this.$refs['blobs'].childNodes
        const filter = this.$refs['filter']
        let x = (e.pageX - bt.offsetLeft - bt.offsetWidth / 2) * 0.6
        let y = (e.pageY - bt.offsetTop - bt.offsetHeight / 2) * 0.6

        /*eslint-disable */
        TweenLite.to(blobs[1], 4.2, { x: x, y: y, ease: Elastic.easeOut.config(1, 0.1) })
        TweenLite.to(blobs[2], 2.8, { x: x, y: -y, ease: Elastic.easeOut.config(1, 0.1) })
        TweenLite.to(blobs[3], 2.8, { x: -x, y: -y, ease: Elastic.easeOut.config(1, 0.1) })
        TweenLite.to(filter, 5, {onUpdate: () => { filter.setAttribute('x', 0) }})
        /*eslint-enable */
      }
    }
  }
</script>

<style>
  .center {
    align-self: center;
  }
</style>
