<template lang="jade">
  #app
    router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.circle {
  width: 80px;
  height: 80px;
  border: 10px solid palegreen;
  -moz-border-radius: 70px;
  -webkit-border-radius: 70px;
  border-radius: 70px;
}

.no-padd { padding: 0 }

.line {
  width: 100%;
  height: 20px;
  margin-top: 10%;
  background: palegreen;
}
.triangle-up {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 50px solid palegreen;
}
</style>
