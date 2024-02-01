<template>
    <aside class="category-sidebar">
        <header class="category-sidebar__title">
            Категории
        </header>
        <div class="category-sidebar__item" v-for="item in items">
            {{ item }}
        </div>
    </aside>
</template>

<script>
export default {
    name: 'blogCategoriesSidebar',
    data() {
        return {
            items: [
                'Политика', 
                'Экономика', 
                'Мир', 
                'Бизнес', 
                'Финансы', 
                'Телекоммуникации', 
                'Общество', 
                'Культура', 
                'Спорт'
            ]
        }
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
    &__item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px;
        border-top: 1px solid $borderColor;
        &:hover {
            color: white;
            background-color: $headerColor;
            transition: 0.3s;
        }
    }
    &__title {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        background-color: $headerColor;
    }
}
</style>