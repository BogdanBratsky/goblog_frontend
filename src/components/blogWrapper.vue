<template>
  <div class="main-wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'blogWrapper',
}
</script>

<style lang="scss">
@import '../variables.scss';

.main-wrapper {
    width: 1170px;
    margin: 0 auto;
    margin-top: 67px;
}
</style>
