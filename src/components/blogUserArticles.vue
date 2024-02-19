<template>
    <div class="wrapper">
        <article class="article" :article_id="article.PostId"  v-for="article in articles">
            <div style="display: flex; align-items: center;">
                <div class="article__date">{{ formatDate(article.CreatedAt) }}</div>
            </div>
            <router-link :to="'/articles/' + article.PostId">
                <header class="article__title" @click.stop="">
                    {{ article.PostTitle }}
                </header>
            </router-link>
                <div class="article__content" style="position: relative;">
                    <pre>
                        {{ formatText(article.PostContent) }}
                    </pre>
                    <div id="shadow"></div>
                </div>
                <div>
                    <router-link :to="'/articles/' + article.PostId">
                        <div class="article__read-more">
                            Читать далее
                        </div>
                    </router-link>
                </div>
                <!-- <div class="article__time-to-read">
                    <img src="../../public/images/watch.png" alt="">
                    1 мин.
                </div> -->
                <footer class="article__info">
                </footer>
                <blogOptions v-if="profile != 0" :postID="article.PostId" :userID="article.UserId"/>
                <!-- <div style="display: flex; position: absolute; bottom: 10px; right: 10px;"> -->
                    <!-- <div class="article__comments">
                        197
                        <img src="../../public/images/comments1.png" alt="">
                    </div> -->
                <!-- </div> -->
            </article>
    </div>
    <div @click="loadMore" class="loadmore-wrapper" v-if="totalCount > 10 && totalCount != articlesCount">
        <!-- {{ articlesCount }} -->
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
            ellipsisIsClicked: false,
        }
    },
    props: ['articles', 'totalCount', 'articlesCount'],
    computed: {
        profile() {
            return this.$store.state.userID;
        }
    },
    methods: {
        formatText(textString) {
            if (textString.length > 800) {
                return textString.slice(0, 800) + '...';
            } else {
                return textString;
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);

            const day = date.getUTCDate().toString().padStart(2, '0');
            const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript считаются с 0
            const year = date.getUTCFullYear();
            const hours = date.getUTCHours().toString().padStart(2, '0');
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');

            return `${day}.${month}.${year}, ${hours}:${minutes}`;
        },
        loadMore() {
            this.$emit('load-more');
        },
        changeTab(index) {
            this.activeTab = index;
        },
        showArticleMenu(event) {
            this.ellipsisIsClicked = !this.ellipsisIsClicked;
            event.stopPropagation();
        },
    },
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
    // box-shadow: 0 10px 10px $shadowColor;
    // margin-bottom: 12px;
}

.loadmore-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
}

.article {
    cursor: default;
    position: relative;
    margin: 0 auto;
    margin-bottom: 12px;
    padding: 16px 12px;
    box-shadow: 0 10px 10px $shadowColor;
    border: 1px solid $borderColor;
    background-color: $headerColor;
    font-family: 'Nunito Sans', sans-serif;
    color: $TitleColor;
    // border-radius: 7px;
    width: 900px;
    justify-self: flex-start;
    &:hover {
        cursor: pointer;
        transition: 0.2s;
    }
    &__date {
        cursor: default;
        font-size: 13px;
        margin-bottom: 10px;
    }
    &__title {
        font-size: 26px;
        margin-bottom: 24px;
        color: $TitleColor;
        font-family: 'Noto Sans TC', sans-serif;
        &:hover {
            color: $TitleHoverColor;
            transition: 0.2s;
        }
    }
    &__content {
        cursor: default;
        margin-bottom: 24px;
        color: $paginationNumColor;
        pre {
            margin-right: 50px;
            // text-align: justify;
            padding-top: 12px;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 16px;
            white-space: pre-line;
            word-wrap: break-word;
            line-height: 25px;
        }
        #shadow {
            box-shadow: 0 -50px 60px -20px $headerColor inset; 
            height: 100px; 
            width: 100%; 
            position: absolute; 
            bottom: 0; 
            right: 0;
        }
    }
    &__read-more {
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        border-radius: 3px;
        border: 1px solid $borderColor;
        background-color: $btnColor;
        box-shadow: 0 3px 5px $shadowColor;
        color: $btnTxtColor;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 14px;
        &:hover {
        background-color: $btnHoverColor;
        color: $btnTxtColor;
        transition: 0.3s;
        }
        &:active {
            background-color: $btnActiveColor;
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