<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh;">
    <blogHeader/>
    <blogWrapper/>
    <blogFooter/>
  </div>
</template>

<script>
import blogHeader from './components/blogHeader.vue';
import blogWrapper from './components/blogWrapper.vue';
import blogFooter from './components/blogFooter.vue';

export default {
  name: 'App',
  data() {
    return {
      // userId: ''
    }
  },
  components: {
    blogHeader,
    blogWrapper,
    blogFooter
  },
}
</script>

<style lang="scss">
@import './variables.scss';

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

html, body {
  height: 100%;
}

body {
  background-color: $mainColor;
}
</style>
