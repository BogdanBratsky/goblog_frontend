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
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 15px;
    border: 1px solid $borderColor;
    border-radius: 3px;
    box-shadow: 0 5px 10px $shadowColor;
    background-color: $btnColor;
    color: $btnTxtColor;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    &:hover {
        background-color: $btnHoverColor;
        color: $btnTxtColor;
        transition: 0.3s;
    }
    &:active {
        background-color: $btnActiveColor;
    }
}

</style>