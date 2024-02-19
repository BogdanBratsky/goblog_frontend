<template>
    <div v-if="responseError" class="">
        <blogNotFound/>
    </div>
    <article v-else class="article">
        <header class="article__title">
            <div class="article__date">
                {{ formatDate(article.CreatedAt) }}
            </div>
            <h5>{{ article.PostTitle }}</h5>
            <router-link :to="'/id' + article.UserId">
                <div class="article__user-name">
                    {{ user }}
                </div>
            </router-link>
        </header>
        <main class="article__content">
            <pre>
                {{ article.PostContent }}
            </pre>
        </main>
    </article>
</template>

<script>
import blogNotFound from '../components/blogNotFound.vue';
import axios from 'axios';
import { serverAddres } from '../../config.js';

export default {
    name: 'blogArticlePage',
    components: {
        blogNotFound
    },
    data() {
        return {
            article: [],
            user: '',
            responseError: false,
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);

            const day = date.getUTCDate().toString().padStart(2, '0');
            const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript считаются с 0
            const year = date.getUTCFullYear();
            const hours = date.getUTCHours().toString().padStart(2, '0');
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');

            return `${day}.${month}.${year}, ${hours}:${minutes}`;
        },
        async loadArticles(id) {
            try {
                this.responseError = false;
                const response = await axios.get(`${serverAddres}/articles/${id}`, {
                    // Добавим опции для обхода проблемы CORS в разработке
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                this.article = response.data; // Переместил инициализацию articles
                this.getUserById(this.article.UserId);
                document.title = this.article.PostTitle;
            } catch (error) {
                this.responseError = true;
                document.title = '404';
                console.error('Error fetching data:', error);
            }
        },
        async getUserById(id) {
            try {
                // console.log('Making request for user with ID:', id);
                const response = await axios.get(`${serverAddres}/users/${id}`);
                // console.log(response.data.UserName)
                this.user = response.data.userName
                // return response.data.UserName;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        } 
    },
    mounted() {
        this.loadArticles(this.$route.params.id);
    },
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.article {
    margin: 0 auto;
    width: 900px;
    float: left;
    border-radius: 3px;
    font-family: 'Nunito Sans', sans-serif;
    .article__date {
        margin-bottom: 12px;
        font-size: 13px;
    }
    &__title {
        padding: 12px;
        box-shadow: 0 5px 12px $shadowColor;
        border: 1px solid $borderColor;
        background-color: $headerColor;
        color: $TitleColor;
        font-size: 36px;
        border-radius: 3px;
        font-family: 'Noto Sans TC', sans-serif;
        // margin-bottom: 24px;
        h5 {
            margin-bottom: 16px;
        }
        .article__user-name {
            display: inline-flex;
            font-size: 15px;
            color: $btnColor;
            &:hover {
                color: $TitleHoverColor;
                transition: 0.4s;
            }
        }
    }
    &__content {
        text-align: justify;
        color: $TitleColor;
        font-size: 20px;
        width: 100%;
        padding: 12px;
        // box-shadow: 0 5px 12px $shadowColor;
        // border: 1px solid $borderColor;
        margin-bottom: 12px;
        pre {
            padding-top: 12px;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 17px;
            white-space: pre-line;
            word-wrap: break-word;
            line-height: 30px;
            // margin-right: 30px;
        }
    }
}
</style>