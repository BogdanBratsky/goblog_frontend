<template>
    <div class="wrapper">
        <div class="articles__wrapper">
            <blogArticleItems 
                v-for="article in articles"
                :key="article.PostId"
                :article="article"
            />
        </div>
        <div class="sidebar">
            <blogCategoriesSidebar/>
        </div>
    </div>
</template>

<script>
import blogArticleItems from '../components/blogArticleItems.vue';
import blogCategoriesSidebar from '../components/blogCategoriesSidebar.vue';
import axios from 'axios';
import { serverAddres } from '../../config.js';

export default {
    name: 'blogCategoryArticles',
    data() {
        return {
            articles: []
        }
    },
    components: {
        blogArticleItems,
        blogCategoriesSidebar
    },
    methods: {
        async getArticlesByCategory(id) {
            await axios
                .get(`${serverAddres}/categories/${id}/articles`)
                .then(response => {
                    this.articles = response.data.posts;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    beforeRouteUpdate(to, from, next) {
        // Вызывается, когда параметры маршрута обновляются
        this.getArticlesByCategory(to.params.id);
        next();
    },
    mounted() {
        console.log(this.$route.params.id);
        this.getArticlesByCategory(this.$route.params.id);
    }
}
</script>

<style lang="scss" scoped> 

.wrapper {
    width: 1170px;
    display: flex;
}

.articles__wrapper {
    width: 900px;
}

.sidebar {
    height: 100%;
    position: sticky;
    top: 67px;
    // float: right;
}
</style>