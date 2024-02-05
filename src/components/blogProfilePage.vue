<template>
    <div class="profile-wrapper">
        <div class="profile">
            <div class="profile__info">
                <header class="profile__header">
                    <div class="profile__user-name">
                        <h2>{{ userName }}</h2>
                    </div>
                    <router-link to="/new" v-if="userId == profile">
                    <div class="profile__write-btn" @click.stop="">
                        Создать пост
                        <img src="../../public/images/rewrite.png" alt="">
                    </div>
                    </router-link>
                    <div class="profile__write-btn" v-else>
                        Подписаться
                        <img src="../../public/images/follow.png" alt="">
                    </div>
                </header>
                <div class="options">
                    <div class="profile__buttons">
                        <div 
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
                <blogUserArticles :totalCount="totalCount" :articles="articles" v-if="activeTab == 0"/>
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
import axios from 'axios';

export default {
    name: 'blogProfilePage',
    components: {
        blogUserArticles,
        blogArticlePagination,
        blogCategoriesSidebar,
    },
    data() {
        return {
            tabs: ['ПУБЛИКАЦИИ', 'ПОДПИСКИ', 'СОХРАНЁННОЕ'],
            tabs2: ['ПУБЛИКАЦИИ'],
            activeTab: 0,
            articles: [],
            userId: 0,
            userName: '',
            totalCount: 0,
        }
    },
    computed: {
        profile() {
            return this.$store.state.userID;
        }
    },
    methods: {
        changeTab(index) {
            this.activeTab = index;
        },
        async getUserById(id) {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                this.userName = response.data.UserName;
                console.log(this.userName)
                document.title = this.userName;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },
        async getUserArticles(id) {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}/articles`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                this.articles = response.data.posts;
                this.totalCount = response.data.totalCount;
                console.log(this.articles);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
    beforeRouteUpdate(to, from, next) {
        // Вызывается, когда параметры маршрута обновляются
        this.userId = to.params.id;
        this.getUserById(this.userId);
        this.getUserArticles(this.userId)
        next();
    },
    mounted() {
        this.userId = this.$route.params.id;
        console.log('User ID:', this.userId );
        this.getUserById(this.userId);
        console.log(this.userName);
        this.getUserArticles(this.userId);
        console.log('posts:', this.articles);
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
        padding: 8px 12px;
        margin: 15px;
        border: 1px solid $borderColor;
        border-radius: 50px;
        box-shadow: 0 5px 10px $shadowColor;
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
        color: grey;
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