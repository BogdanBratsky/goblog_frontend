<template>
  <blogHeader/>
  <blogWrapper/>
</template>

<script>
import blogHeader from './components/blogHeader.vue';
import blogWrapper from './components/blogWrapper.vue';

export default {
  name: 'App',
  data() {
    return {
      // userId: ''
    }
  },
  components: {
    blogHeader,
    blogWrapper
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

body {
  background-color: $mainColor;
  // background-color: #fffafa;
}
</style>
