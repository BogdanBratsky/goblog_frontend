<template>
    <article class="article" :article_id="article.PostId" @click.stop="">
        <div class="article__date">{{ dateFormated }}</div>
            <router-link :to="'/articles/' + article.PostId">
                <header class="article__title">
                    {{ article.PostTitle }}
                </header>
            </router-link>
            <footer class="article__info">
                <div>
                    <!-- <div class="article__time-to-read">
                        <img src="../../public/images/watch.png" alt="">
                        1 мин.
                    </div> -->
                </div>
                <div class="article__content" style="position: relative;">
                    <pre>
                        {{ formatText(article.PostContent) }}
                    </pre>
                    <div 
                        v-if="isLong" 
                        id="shadow"
                    ></div>
                </div>
                <div>
                    <router-link v-if="isLong" :to="'/articles/' + article.PostId">
                        <div class="article__read-more">
                            Читать далее
                        </div>
                    </router-link>
                </div>
                <router-link :to="'/id' + article.UserId">
                    <div class="article__user-name">
                        {{ user }}
                    </div>
                </router-link>
            </footer>
            <blogOptions v-if="profile != 0" :postID="article.PostId" :userID="article.UserId"/>

            <!-- <div style="display: flex; position: absolute; bottom: 10px; right: 10px;">
                <div class="article__comments">
                    197
                    <img src="../../public/images/comments1.png" alt="">
                </div>
                <div v-if="profile != 0 && title.UserId != profile" class="article__bookmark">
                    <img src="../../public/images/bookmark1.png" alt="">
                </div>
            </div> -->
        </article>
</template>

<script>
import blogOptions from '../components/blogOptions.vue';
import axios from 'axios';

export default {
    name: 'blogArticleItems',
    components: {
        blogOptions
    },
    props: ['article'],
    data() {
        return {
            user: '',
            dateFormated: '',
            isLong: false
        }
    },
    computed: {
        profile() {
            return this.$store.state.userID;
        }
    },
    methods: {
        // isLongText(textString) {
        //     if (textString.length > 1200) {
        //         this.isLong = true;
        //     } else {
        //         this.isLong = false;
        //     }
        // },
        formatText(textString) {
            if (textString.length > 800) {
                this.isLong = true;
                return textString.slice(0, 800) + '...';
            } else {
                this.isLong = false;
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

            this.dateFormated = `${day}.${month}.${year}, ${hours}:${minutes}`;

        },
        async getUserById(id) {
            try {
                // console.log('Making request for user with ID:', id);
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                // console.log(response.data.UserName)
                this.user = response.data.userName
                // return response.data.UserName;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        } 
    },
    mounted() {
        this.getUserById(this.article.UserId);
        this.formatDate(this.article.CreatedAt)
    },
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.article {
    cursor: default;
    position: relative;
    margin: 0 auto;
    margin-bottom: 12px;
    width: 100%;
    padding: 12px;
    background-color: $headerColor;
    font-family: 'Noto Sans TC', sans-serif;
    color: $TitleColor;
    border: 1px solid $borderColor;
    // border-radius: 4px;
    box-shadow: 0 0 10px $shadowColor;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 20px $shadowColor;
        transition: 0.2s;
    }
    &__date {
        cursor: default;
        font-size: 13px;
        margin-bottom: 10px;
    }
    &__title {
        font-size: 28px;
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
        box-shadow: 0 3px 10px $shadowColor;
        color: $btnTxtColor;
        margin-bottom: 24px;
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
        // color: $TitleColor;
        color: $btnColor;
        font-size: 15px;
        &:hover {
            color: $TitleHoverColor;
            transition: 0.4s;
        }
    }
    &__time-to-read {
        display: inline-flex;
        align-items: center;
        padding: 6px;
        margin-bottom: 12px;
        border: 1px solid $borderColor;
        border-radius: 4px;
        font-size: 12px;
        img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
        }
    }
    &__bookmark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid $borderColor;
        box-shadow: 0 0 10px $shadowColor;
        border-radius: 2px;
        padding: 8px;
        img {
            width: 10px;
            height: 10px;
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