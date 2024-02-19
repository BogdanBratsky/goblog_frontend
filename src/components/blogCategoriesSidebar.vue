<template>
    <aside class="category-sidebar">
        <header class="category-sidebar__title">
            Категории
        </header>
        <div class="" v-for="category in categories">
            <router-link :to="`/categories/` + category.CategoryId">
                <div class="category-sidebar__item">
                    {{ category.CategoryName }}
                </div>
            </router-link>
        </div>
    </aside>
</template>

<script>
import axios from 'axios';
import { serverAddres } from '../../config.js';

export default {
    name: 'blogCategoriesSidebar',
    data() {
        return {
           categories: []
        }
    },
    methods: {
        async getCategories() {
            await axios
                .get(`${serverAddres}/categories`)
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.category-sidebar {
    user-select: none;
    box-shadow: 0 2px 20px $shadowColor;
    color: $TitleColor;
    font-family: 'Rubik', sans-serif;
    width: 258px;
    border-radius: 5px;
    margin-bottom: 12px;
    &__title {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 20px;
        background-color: $headerColor;
        border: 1px solid $borderColor;
    }
    &__item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px;
        border-bottom: 1px solid $borderColor;
        color: $btnColor;
        // background-color: $headerColor;
        &:hover {
            color: white;
            background-color: $headerColor;
            transition: 0.3s;
        }
    }
}
</style>