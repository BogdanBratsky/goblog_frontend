<template>
    <div class="wrapper">
        <div class="articles-wrapper">
            <blogArticleItems 
                v-for="article in articles"
                :key="article.PostId"
                :title="article"
            />
            <blogArticlePagination 
                :pagesCount="Math.ceil(totalCount / perPage)"
                @enter-page="loadArticles"
                :currentPage="pageNum"
            />
        </div>
        <div class="categories-wrapper">
            <blogCategoriesSidebar/>
        </div>
    </div>
</template>

<script>
import blogArticleItems from '../components/blogArticleItems.vue';
import blogArticlePagination from '../components/blogArticlePagination.vue';
import blogLoadMore from '../components/blogLoadMore.vue';
import blogCategoriesSidebar from '../components/blogCategoriesSidebar.vue';
import axios from 'axios';

export default {
    data() {
        return {
            articles: [],
            totalCount: 0,
            perPage: 10,
            pageNum: 1
        }
    },
    name: 'blogArticleWrapper',
    components: {
        blogArticleItems,
        blogLoadMore,
        blogArticlePagination,
        blogCategoriesSidebar
    },
    mounted() {
        this.loadArticles();
        document.title = 'Все записи';
    },
    methods: {
        async loadArticles(page = 1) {
            try {
                const response = await axios.get(`http://localhost:3000/articles?page=${page}&perPage=${this.perPage}`, {
                    // Добавим опции для обхода проблемы CORS в разработке
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                this.articles = response.data.posts; // Переместил инициализацию articles
                this.totalCount = response.data.totalCount;

                this.pageNum = page 
                // console.log(response.data.posts); // response.data содержит данные ответа
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.wrapper {
    width: 1170px;
    position: relative;
    display: flex;
    justify-content: space-between;
    // overflow: auto
}

.articles-wrapper {
    // float: left;
    display: flex;
    flex-direction: column;
    width: 900px;
}

.categories-wrapper {
    position: sticky;
    top: 67px;
    float: right;
    height: 100%;
}
</style>
