<template>
    <div class="profile__article-wrapper">
        <div class="profile__article-item" v-for="article in articles">
            <router-link :to="'/articles/' + article.PostId">
                <article class="article" :article_id="article.PostId">
                    <div style="display: flex; align-items: center;">
                        <div class="article__date">25.01.2024, 20:25</div>
                    </div>
                    <header class="article__title">
                        {{ article.PostTitle }}
                    </header>
                    <!-- <div class="article__time-to-read">
                        <img src="../../public/images/watch.png" alt="">
                        1 мин.
                    </div> -->
                    <footer class="article__info">
                    </footer>
                    <div class="article__options">
                        <!-- <img src="../../public/images/options.png" alt=""> -->
                        <div class="ellipsis">
                            <h5>&hellip;</h5>
                        </div>
                    </div>
                    <!-- <div style="display: flex; position: absolute; bottom: 10px; right: 10px;"> -->
                        <!-- <div class="article__comments">
                            197
                            <img src="../../public/images/comments1.png" alt="">
                        </div> -->
                    <!-- </div> -->
                </article>
            </router-link>
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
import axios from 'axios';

export default {
    name: 'blogUserArticles',
    components: {
        blogArticlePagination,
    },
    data() {
        return {
            articles: [],
            totalCount: 0,
            pageNum: 1,
            perPage: 5
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
        async getUserArticles(id) {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}/articles`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                this.articles = response.data.posts;
                this.totalCount = response.data.totalCount;
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
    mounted() {
        this.getUserArticles(this.userId);
        document.title = this.$store.state.userNAME;
    },
    watch() {
        this.getUserArticles(this.userId);
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.article {
    position: relative;
    margin: 0 auto;
    // margin-bottom: 12px;
    padding: 12px;
    border-bottom: 1px solid $borderColor;
    background-color: $mainColor;
    font-family: 'Nunito Sans', sans-serif;
    color: $TitleColor;
    // border-radius: 7px;
    width: 900px;
    justify-self: flex-start;
    &:hover {
        cursor: pointer;
        background-color: $headerColor;
        transition: 0.2s;
    }
    &__date {
        font-size: 13px;
        margin-bottom: 10px;
    }
    &__title {
        font-size: 30px;
        margin-bottom: 50px;
        &:hover {
            color: $TitleHoverColor;
            transition: 0.2s;
        }
    }
    &__user-name {
        display: inline-block;
        &:hover {
            color: $TitleHoverColor;
        }
    }
    &__time-to-read {
        display: inline-flex;
        align-items: center;
        padding: 6px;
        margin-bottom: 45px;
        border: 1px solid $borderColor;
        border-radius: 4px;
        font-size: 12px;
        img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
        }
    }
    &__options {
        position: absolute;
        top: 0;
        right: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        // border: 1px solid $borderColor;
        // box-shadow: 0 0 10px $shadowColor;
        border-radius: 2px;
        padding: 5px 12px;
        .ellipsis {
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            padding-bottom: 10px;
            color: #535353;
            &:hover {
                color: $TitleColor;
                transition: 0.2s;
            }
        }
    }
    &__comments {
        margin-right: 8px;
        display: inline-flex;
        align-items: center;
        // justify-content: center;
        border: 1px solid $borderColor;
        border-radius: 4px;
        padding: 8px;
        font-size: 14px;
        img {
            width: 12px;
            height: 12px;
            margin-left: 6px;
        }
    }
}
</style>