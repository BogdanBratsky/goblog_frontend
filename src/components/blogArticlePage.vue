<template>
    <article class="article">
        <header class="article__title">
            <h5>{{ article.PostTitle }}</h5>
        </header>
        <main class="article__content">
            {{ article.PostContent }}
        </main>
    </article>
</template>

<script>
import axios from 'axios';

export default {
    name: 'blogArticlePage',
    data() {
        return {
            article: [],
        }
    },
    mounted() {
        this.loadArticles(this.$route.params.id);
    },
    methods: {
        async loadArticles(page) {
            try {
                const response = await axios.get(`http://localhost:3000/articles/${page}`, {
                    // Добавим опции для обхода проблемы CORS в разработке
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                this.article = response.data; // Переместил инициализацию articles
                document.title = this.article.PostTitle;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.article {
    margin: 0 auto;
    width: 900px;
    float: left;
    padding: 10px 15px 15px 10px;
    border: 1px solid $borderColor;
    border-radius: 4px;
    box-shadow: 0 5px 12px $shadowColor;
    background-color: $headerColor;
    font-family: 'Nunito Sans', sans-serif;
    &__title {
        color: $TitleColor;
        font-size: 30px;
        margin-bottom: 50px;
    }
    &__content {
        text-align: justify;
        color: $TitleColor;
        font-size: 20px;
        margin-bottom: 10px;
        padding-right: 60px;
    }
}
</style>