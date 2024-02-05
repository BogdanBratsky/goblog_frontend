<template>
    <div class="wrapper">
        <article class="article" :article_id="article.PostId"  v-for="article in articles">
            <div style="display: flex; align-items: center;">
                <div class="article__date">25.01.2024, 20:25</div>
            </div>
            <router-link :to="'/articles/' + article.PostId">
                <header class="article__title" @click.stop="">
                    {{ article.PostTitle }}
                </header>
            </router-link>
                <!-- <div class="article__time-to-read">
                    <img src="../../public/images/watch.png" alt="">
                    1 мин.
                </div> -->
                <footer class="article__info">
                </footer>
                <blogOptions :userID="article.UserId"/>
                <!-- <div style="display: flex; position: absolute; bottom: 10px; right: 10px;"> -->
                    <!-- <div class="article__comments">
                        197
                        <img src="../../public/images/comments1.png" alt="">
                    </div> -->
                <!-- </div> -->
            </article>
    </div>
    <div class="loadmore-wrapper" v-if="totalCount > 10">
        <blogLoadMore/>
    </div>
</template>

<script>
import blogArticlePagination from '../components/blogArticlePagination.vue';
import blogOptions from '../components/blogOptions.vue';
import blogLoadMore from '../components/blogLoadMore.vue';


export default {
    name: 'blogUserArticles',
    components: {
        blogArticlePagination,
        blogOptions,
        blogLoadMore
    },
    data() {
        return {
            pageNum: 1,
            perPage: 5,
            ellipsisIsClicked: false
        }
    },
    props: ['articles', 'totalCount'],
    methods: {
        changeTab(index) {
            this.activeTab = index;
        },
        showArticleMenu(event) {
            this.ellipsisIsClicked = !this.ellipsisIsClicked;
            event.stopPropagation();
            console.log(this.ellipsisIsClicked);
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

// .loadmore-wrapper {
//     width: 100%;
//     margin: 0 auto;
// }

.wrapper {
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 10px $shadowColor;
}

.loadmore-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px 0;
}

.article {
    position: relative;
    margin: 0 auto;
    // margin-bottom: 12px;
    padding: 16px 12px;
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
        font-size: 26px;
        margin-bottom: 50px;
        color: $TitleColor;
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