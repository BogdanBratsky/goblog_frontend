<template>
    <div v-if="responseError">
        <blogNotFound/>
    </div>

    <div v-else class="profile-wrapper">
        <div class="profile">
            <div class="profile__info">
                <!-- <div class="profile__title" v-if="userId == profile">
                    Профиль
                </div> -->
                <header class="profile__header">
                    <div class="profile__user-name">
                        <h2>{{ userName }}</h2>
                    </div>
                    <router-link to="/new-article" v-if="userId == profile">
                    <div class="profile__write-btn" @click.stop="">
                        Создать запись
                        <img src="../../public/images/rewrite.png" alt="">
                    </div>
                    </router-link>
                    <!-- <div class="profile__write-btn" v-else>
                        Подписаться
                        <img src="../../public/images/follow.png" alt="">
                    </div> -->
                </header>
                <div class="options">
                    <div class="profile__buttons">
                        <div 
                            v-if="userId != profile"
                            class="profile__buttons-item"
                            :class="{ 'active-tab': activeTab === 0 }"
                            @click="changeTab(index)"
                        >
                            ПУБЛИКАЦИИ
                            <div class="articles-counter">{{ totalCount }}</div>
                        </div>
                        <div 
                            v-else
                            class="profile__buttons-item"
                            v-for="(tab, index) in tabs"
                            :key="index"
                            :class="{ 'active-tab': activeTab === index }"
                            @click="changeTab(index)"
                        >
                            {{ tab }}
                            <div v-if="index == 0 && activeTab == 0" class="articles-counter">{{ totalCount }}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="user-articles__wrapper">
                <blogUserArticles 
                    @load-more="getUserArticles(userId, page);" 
                    :totalCount="totalCount" 
                    :articles="articles" 
                    :articlesCount="articles.length"
                    v-if="activeTab == 0"
                />
                <!-- <blogArticleItems 
                    @load-more="getUserArticles(userId, page);" 
                    :totalCount="totalCount" 
                    :articlesCount="articles.length"
                    v-if="activeTab == 0"
                    v-for="article in articles"
                    :key="article.PostId"
                    :article="article"
                /> -->
            </div>
        </div>
        <div class="sidebar">
            <blogCategoriesSidebar/>
        </div>
    </div>
    <!-- <blogArticlePagination
        :pagesCount="Math.ceil(totalCount / perPage)"
        @enter-page="getUserArticles(this.userId)"
        :currentPage="pageNum"
    /> -->
</template>

<script>
import blogArticlePagination from '../components/blogArticlePagination.vue';
import blogUserArticles from '../components/blogUserArticles.vue';
import blogCategoriesSidebar from '../components/blogCategoriesSidebar.vue';
import blogNotFound from '../components/blogNotFound.vue';
import blogArticleItems from '../components/blogArticleItems.vue';
import axios from 'axios';
import { serverAddres } from '../../config.js';

export default {
    name: 'blogProfilePage',
    components: {
        blogUserArticles,
        blogArticlePagination,
        blogCategoriesSidebar,
        blogNotFound,
        blogArticleItems
    },
    data() {
        return {
            tabs: ['ПУБЛИКАЦИИ', 'СОХРАНЁННОЕ'],
            tabs2: ['ПУБЛИКАЦИИ'],
            activeTab: 0,
            articles: [],
            userId: 0,
            userName: '',
            totalCount: 0,
            page: 1,
            responseError: false,
        }
    },
    computed: {
        profile() {
            return this.$store.state.userID;
        },
        // userName() {
        //     return localStorage.userNAME;
        // }
    },
    methods: {
        changeTab(index) {
            this.activeTab = index;
        },
        async getUserById(id) {
            try {
                this.responseError = false;
                const response = await axios.get(`${serverAddres}/users/${id}`);
                this.userName = response.data.userName;
                console.log(this.userName);
                document.title = this.userName;
            } catch (error) {
                this.responseError = true;
                document.title = '404';
                console.error('Error fetching user data:', error);
            }
        },
        async getUserArticles(id, page) {
            this.page++;
            try {
                const response = await axios.get(`${serverAddres}/users/${id}/articles?page=${page}&perPage=10`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                this.articles = [...this.articles, ...response.data.posts];
                this.totalCount = response.data.totalCount;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
    beforeRouteUpdate(to, from, next) {
        // Вызывается, когда параметры маршрута обновляются
        this.userId = to.params.id;
        this.getUserById(this.userId);
        this.page = 1;
        this.getUserArticles(this.userId, this.page)
        this.articles = [];
        next();
    },
    mounted() {
        this.userId = this.$route.params.id;
        console.log(this.userId);
        this.getUserById(this.userId);
        this.getUserArticles(this.userId, this.page);
        // document.title = this.userName;
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.profile-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.sidebar {
    position: sticky;
    top: 67px;
    height: 100%;
    float: right;
    margin-left: 12px;
}

.profile {
    // float: left;
    color: $TitleColor;
    font-family: 'Nunito Sans', sans-serif;
    &__info {
        display: flex;
        flex-direction: column;
        background-color: $headerColor;
        border: 1px solid $borderColor;
        border-radius: 3px;
        border-bottom: 2px solid $borderColor;
        // margin-bottom: 12px;
        width: 900px;
    }
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__write-btn {
        user-select: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        // width: 150px;
        padding: 8px 12px;
        margin: 15px;
        border: 1px solid $borderColor;
        border-radius: 3px;
        box-shadow: 0 5px 20px $shadowColor;
        background-color: $btnColor;
        color: $btnTxtColor;
        font-family: 'Rubik', sans-serif;
        font-size: 15px;
        img {
            margin-left: 10px;
            width: 14px;
            height: 14px;
        }
        &:hover {
            background-color: $btnHoverColor;
            transition: 0.4s;
        }
        &:active {
            background-color: $btnActiveColor;
        }
    }
    &__user-name {
        // padding: 16px 10px;
        margin-left: 10px;
        margin: 15px;
    }
    .options {
        display: flex;
        justify-content: space-between;
    }
    &__buttons {
        user-select: none;
        display: flex;
        font-size: 15px;
        color: $btnColor;
        font-family: 'Rubik', sans-serif;
    }
    &__buttons-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 12px 0;
        margin-left: 12px;
        &:hover {
            color: white;
            border-bottom: 2px solid white;
            // transition: 0.3s;
        }
        &.active-tab {
            color: white;
            border-bottom: 2px solid white; /* Цвет и стиль подчеркивания по вашему выбору */
        }
        div {
            margin-left: 8px;
            padding: 3px 7px;
            font-size: 11px;
            border-radius: 50px;
            background-color: $btnColor;
        }
    }
    &__article-item {
        display: flex;
    }
}
</style>