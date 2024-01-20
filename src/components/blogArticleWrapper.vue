<template>
    <main class="main-wrapper">
        <div class="articlesCount" style="margin-bottom: 10px;">Количество записей: {{ totalCount }}</div>
        <blogArticleItems 
            v-for="article in articles"
            :key="article.PostId"
            :title="article"
        />
        <blogArticlePagination 
            :pagesCount="Math.ceil(totalCount / 20)"
            @enter-page="loadArticles"
        />
    </main>
</template>

<script>
import blogArticleItems from '../components/blogArticleItems.vue';
import blogArticlePagination from '../components/blogArticlePagination.vue'
import axios from 'axios';

export default {
    data() {
        return {
            articles: [],
            totalCount: 0,
        }
    },
    name: 'blogArticleWrapper',
    components: {
        blogArticleItems,
        blogArticlePagination
    },
    mounted() {
        this.loadArticles();
    },
    methods: {
        async loadArticles(page = 1) {
            try {
                const response = await axios.get(`http://localhost:3000/articles?page=${page}&perPage=20`, {
                    // Добавим опции для обхода проблемы CORS в разработке
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                this.articles = response.data.posts; // Переместил инициализацию articles
                this.totalCount = response.data.totalCount;
                // console.log(response.data.posts); // response.data содержит данные ответа
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        // getPageNum(pageNumber) {
        //     this.pageNum = pageNumber;
        //     console.log(this.pageNum);
        // }
    }
}
</script>

<style lang="scss">
.main-wrapper {
    width: 1100px;
    margin: 0 auto;
    margin-top: 72px;
}
</style>
