<template lang="jade">
  section.section
    svg.svg-filters(xmlns="http://www.w3.org/2000/svg" version="1.1")
      defs
        filter#filter-goo-3(ref="filter")
          feGaussianBlur(in="SourceGraphic" stdDeviation="7" result="blur" x="0")
          feColorMatrix(in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo")
          feComposite(in="SourceGraphic" in2="goo")

    button#component-3.button.button--2.button--3(ref="btn"
                                                  style="filter: url('#filter-goo-3')"
                                                  v-on:click="onClick()") {{ text }}
      span.button__bg(ref="button__bg" style="transform: matrix(1, 0, 0, 1, 0, 0);")
      span.right(style='transform: matrix(0, 0, 0, 0, 60, 0); opacity: 0;')
      span.left(style='transform: matrix(0, 0, 0, 0, -60, -0.627283); opacity: 0;')
      span.right(style='transform: matrix(0, 0, 0, 0, 60, 14.3951); opacity: 0;')
      span.left(style='transform: matrix(0, 0, 0, 0, -60, -8.24309); opacity: 0;')
      span.right(style='transform: matrix(0, 0, 0, 0, 60, 36.8147); opacity: 0;')
      span.left(style='transform: matrix(0, 0, 0, 0, -60, 20.3385); opacity: 0;')
      span.right(style='transform: matrix(0, 0, 0, 0, 60, 0); opacity: 0;')
      span.left(style='transform: matrix(0, 0, 0, 0, -60, 4.85994); opacity: 0;')
      span.right(style='transform: matrix(0, 0, 0, 0, 60, 1.2009); opacity: 0;')
      span.left(style='transform: matrix(0, 0, 0, 0, -60, 5.75314); opacity: 0;')
      span.right(style='transform: matrix(0, 0, 0, 0, 60, 30.6783); opacity: 0;')
      span.left(style='transform: matrix(0, 0, 0, 0, -60, 13.7122); opacity: 0;')
      span.right(style='transform: matrix(0, 0, 0, 0, 60, 0); opacity: 0;')
      span.left(style='transform: matrix(0, 0, 0, 0, -60, 1.65637); opacity: 0;')
      span.right(style='transform: matrix(0, 0, 0, 0, 60, 7.31997); opacity: 0;')
      span.left(style='transform: matrix(0, 0, 0, 0, -60, -5.59723); opacity: 0;')
      span.right(style='transform: matrix(0, 0, 0, 0, 60, -14.1575); opacity: 0;')
      span.left(style='transform: matrix(0, 0, 0, 0, -60, -19.1216); opacity: 0;')

</template>

<script>
  import '../../../static/js/TweenMax.min'

  export default {
    props: ['onClick', 'text'],
    data () {
      return {
        bt: this.$refs['btn'],
        filter: this.$refs['filter'],
        particleCount: 6,
        particles: [],
        clicked: false
      }
    },
    methods: {
      getRandom (min, max) {
        return Math.random() * (max - min) + min
      }
    },
    created () {
      setTimeout(() => {
        /*eslint-disable */
        let bt = this.$refs['btn']
        let particleCount = 6;
        let particles;
        let clicked = false;
        let filter = this.$refs['filter'];

        bt.addEventListener('mouseenter', function() {
          particles = [];

          TweenLite.to(bt.querySelectorAll('.button__bg'), 1.5, { scaleX: 1.05, ease: Expo.easeOut, delay: 0.2 });

          for (var i = 0; i < particleCount; i++) {
            particles.push(document.createElement('span'));
            bt.appendChild(particles[i]);

            particles[i].classList.add(i % 2 ? 'left' : 'right');

            var dir = i % 2 ? '-' : '+';
            var tl = new TimelineLite();

            tl.to(particles[i], 2, { x: dir + 18, scaleX: 1.4, ease: Expo.easeOut });
          }

          TweenLite.to(filter, 1.5, { onUpdate: function() { filter.setAttribute('x', 0); }});
        });

        bt.addEventListener('mouseleave', function() {
          if (clicked) return;

          TweenLite.to(bt.querySelectorAll('.button__bg'), 0.9, { scale: 1, ease: Power3.easeOut, overwrite: 'all' });

          for (var i = 0; i < particles.length; i++) {
            particles[i].classList.add(i % 2 ? 'left' : 'right');

            TweenLite.to(particles[i], 0.6, { x: 0, scaleX: 1, ease: Power3.easeOut, onComplete: function() {
              this.target.parentNode.removeChild(this.target);
            } });
          }

          TweenLite.to(filter, 1.5, { onUpdate: function() { filter.setAttribute('x', 0); }});
        });

        bt.addEventListener('click', () => {
          clicked = true;

          TweenLite.to(bt.querySelectorAll('.button__bg'), 0.9, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4), delay: 0.1,
            onComplete: function(){
              clicked = false;
            },
            onOverwrite: function(){
              clicked = false;
            }
          }, 0.6);

          for (var i = 0; i < particleCount; i++) {
            var dir = i % 2 ? '-' : '+';
            var size = i < 2 ? 1 : this.getRandom(0.2, 0.6);
            var r = i % 2 ? this.getRandom(-1, 1)*i/2 : this.getRandom(-1, 1)*i;

            TweenLite.set(particles[i], { scale: size });
            TweenLite.to(particles[i], 0.1, { scale: size, x: dir +'=25' });
            TweenLite.to(particles[i], 0.6, { x: dir + 60, y: r*10, scale: 0, opacity: 0, ease: Power3.easeOut });
          }
        });
        /*eslint-enable */
      }, 20)
    }
  }
</script>

