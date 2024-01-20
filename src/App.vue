<template>
  <blogHeader/>
  <blogArticleWrapper/>
</template>

<script>
import blogHeader from './components/blogHeader.vue';
import blogArticleWrapper from './components/blogArticleWrapper.vue';

export default {
  name: 'App',
  components: {
    blogHeader,
    blogArticleWrapper
  }
}
</script>

<style lang="scss">
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
</style>
