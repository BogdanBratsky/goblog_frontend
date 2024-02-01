<template>
    <div class="profile-wrapper">
        <div class="profile">
            <div class="profile__info">
                <header class="profile__user-name">
                    <h2>@{{ $store.state.userNAME }}</h2>
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
                            <!-- <img src="../../public/images/articles.png" alt=""> -->
                        </div>
                    </div>
                    <!-- <div class="profile__write-btn">
                        Создать запись
                        <img src="../../public/images/write.png" alt="">
                    </div> -->
                </div>
            </div>
            
            <div class="user-articles__wrapper">
                <blogUserArticles v-if="activeTab == 0"/>
            </div>
        </div>
        <div class="sidebar">
            <blogCategoriesSidebar/>
        </div>
    </div>
    <!-- <blogArticlePagination/> -->
</template>

<script>
import blogArticlePagination from '../components/blogArticlePagination.vue';
import blogUserArticles from '../components/blogUserArticles.vue';
import blogCategoriesSidebar from '../components/blogCategoriesSidebar.vue';

export default {
    name: 'blogProfilePage',
    components: {
        blogUserArticles,
        blogArticlePagination,
        blogCategoriesSidebar
    },
    data() {
        return {
            tabs: ['ПУБЛИКАЦИИ', 'ПОДПИСКИ', 'ЗАКЛАДКИ'],
            activeTab: 0,
            articles: []
        }
    },
    computed: {
        userId() {
            return this.$store.state.userID;
        }
    },
    methods: {
        changeTab(index) {
            this.activeTab = index;
        },
    },
    mounted() {
        document.title = this.$store.state.userNAME;
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.profile {
    float: left;
    color: $TitleColor;
    font-family: 'Nunito Sans', sans-serif;
    &__info {
        display: flex;
        flex-direction: column;
        background-color: $headerColor;
        border: 1px solid $borderColor;
        border-bottom: 2px solid $borderColor;
        // margin-bottom: 12px;
        width: 900px;
    }
    &__user-name {
        padding: 16px 10px;
    }
    .options {
        display: flex;
        justify-content: space-between;
    }
    &__write-btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px 10px;
        border-radius: 25px;
        img {
            margin-left: 8px;
            width: 24px;
            height: 24px;
        }
        &:hover {
            background-color: #2b2b2b;
            transition: 0.2s;
        }
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
        // &::after {
        //     content: "";
        //     width: 20px;
        //     height: 20px;
        //     background-image: url('../../public/images/articles.png');
        // }
    }
    &__article-item {
        display: flex;
    }
    .user-articles__wrapper {
        box-shadow: 0 10px 10px $shadowColor;
        margin-bottom: 12px;
    }
}

.sidebar {
    position: sticky;
    top: 67px;
    float: right;
}
</style>