<template>
    <article class="article" :article_id="title.PostId" @click.stop="">
        <div class="article__date">25.01.2024, 20:25</div>
            <router-link :to="'/articles/' + title.PostId">
                <header class="article__title">
                    {{ title.PostTitle }}
                </header>
            </router-link>
            <footer class="article__info">
                <div>
                    <!-- <div class="article__time-to-read">
                        <img src="../../public/images/watch.png" alt="">
                        1 мин.
                    </div> -->
                </div>
                <router-link :to="'/id' + title.UserId">
                    <div class="article__user-name">
                        {{ user }}
                    </div>
                </router-link>
            </footer>
            <div style="display: flex; position: absolute; bottom: 10px; right: 10px;">
                <!-- <div class="article__comments">
                    197
                    <img src="../../public/images/comments1.png" alt="">
                </div> -->
                <div class="article__bookmark">
                    <img src="../../public/images/bookmark1.png" alt="">
                </div>
            </div>
        </article>
</template>

<script>
import axios from 'axios';

export default {
    name: 'blogArticleItems',
    props: ['title'],
    data() {
        return {
            user: ''
        }
    },
    methods: {
        async getUserById(id) {
            try {
                // console.log('Making request for user with ID:', id);
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                // console.log(response.data.UserName)
                this.user = response.data.UserName
                // return response.data.UserName;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        } 
    },
    mounted() {
        this.getUserById(this.title.UserId)
    },
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.article {
    position: relative;
    margin: 0 auto;
    margin-bottom: 12px;
    width: 100%;
    padding: 12px;
    background-color: $headerColor;
    font-family: 'Nunito Sans', sans-serif;
    color: $TitleColor;
    border-bottom: 1px solid $borderColor;
    // border-radius: 4px;
    box-shadow: 0 0 10px $shadowColor;
    &:hover {
        cursor: pointer;
        border: none;
        box-shadow: 0 0 10px $shadowColor;
        // border: 1px solid $borderHoverColor;
        transition: 0.2s;
    }
    &__date {
        font-size: 13px;
        margin-bottom: 10px;
    }
    &__title {
        font-size: 28px;
        margin-bottom: 50px;
        color: $TitleColor;
        &:hover {
            color: $TitleHoverColor;
            transition: 0.2s;
        }
    }
    &__user-name {
        display: inline-block;
        // color: $TitleColor;
        color: $btnColor;
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
            width: 12px;
            height: 12px;
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