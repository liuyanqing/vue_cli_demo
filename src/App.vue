<template>
  <div id="app">
    <img class="bounce" alt="logo" src="./assets/logo.png">
    <Form />
  </div>
</template>

<script>
import Form from './components/Form.vue'

export default {
  name: 'app',
  components: {
    Form
  },
  data() {
    return {
    }
  },
  mounted: function () {
  }
}
</script>

<style lang="less" scoped>
@keyframes bounceIn {
  0% {
    opacity: 0.5;
    transform: scale(.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 540px;
  margin: 0 auto;
  font-size: 16px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.bounce {
  animation: bounceIn .5s;
}
</style>
