<template>
    <div class="pagination">
        <nav class="pagination__wrapper">
            <div class="pagination__item" v-for="p in pagesCount" @click="enterPage(p)">{{ p }}</div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'blogArticlePagination',
    props: ['pagesCount'],
    methods: {
        enterPage(p) {
            console.log(p);
            this.$emit('enter-page', p);
        }
    }
}
</script>

<style lang="scss">
.pagination {
    user-select: none;
    width: 1100px;
    margin-bottom: 12px;
    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        overflow-x: hidden;
    }
    &__item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        background-color: white;
        border: 1px solid #eaeaea;
        border-radius: 50px;
        box-shadow: 0 0 12px #efefef;
        margin-right: 6px;
        font-family: 'Nunito Sans', sans-serif;
        &:hover {
            cursor: pointer;
            border: 1px solid #d1d1d1;
            box-shadow: 0 10px 20px #ececec;
            transition: 0.1s;
        }
        &:active {
            background-color: #eaeaea;
        }
    }
}
</style>