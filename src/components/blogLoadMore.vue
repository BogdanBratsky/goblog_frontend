<template>
    <div class="loadmore-btn">
        Загрузить ещё
    </div>
</template>

<script>
// import axios from 'axios';

export default {
    name: 'blogLoadMore',
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.loadmore-btn {
    // margin: 0 auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    width: 900px;
    padding: 15px;
    border: 1px solid $borderColor;
    border-radius: 8px;
    box-shadow: 0 0 5px $shadowColor;
    color: $TitleColor;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
}

</style>