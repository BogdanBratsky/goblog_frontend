<template>
    <div class="wrapper">
        <div class="articles-wrapper">
            <blogArticleItems 
                v-for="article in articles"
                :key="article.PostId"
                :article="article"
            />
            <!-- <blogArticlePagination 
                :pagesCount="Math.ceil(totalCount / perPage)"
                @enter-page="loadArticles"
                :currentPage="pageNum"
            /> -->
            <div @click="loadArticles" class="loadmore-wrapper" v-if="totalCount > 10 && totalCount != articles.length">
                <!-- {{ articlesCount }} -->
                <blogLoadMore/>
            </div>
        </div>
        <div class="sidebar">
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
            perPage: 20,
            pageNum: 1
        }
    },
    name: 'blogArticleWrapper',
    components: {
        blogArticleItems,
        blogLoadMore,
        blogArticlePagination,
        blogCategoriesSidebar,
    },
    mounted() {
        this.loadArticles();
        document.title = 'Все записи';
    },
    methods: {
        async loadArticles() {
            try {
                const response = await axios.get(`http://localhost:3000/articles?page=${this.pageNum}&perPage=${this.perPage}`, {
                    // Добавим опции для обхода проблемы CORS в разработке
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                this.articles = [...this.articles, ...response.data.posts];
                this.totalCount = response.data.totalCount;
                
                // this.pageNum = page 
                this.pageNum++;
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
    display: flex;
    flex-direction: column;
    width: 900px;
}

.sidebar {
    position: sticky;
    top: 67px;
    height: 100%;
}

.loadmore-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
}
</style>
