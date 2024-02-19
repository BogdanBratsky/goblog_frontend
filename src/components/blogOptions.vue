<template>
    <div ref="myElement" class="article__options" @click="showArticleMenu">
        <div class="ellipsis">
            <h5>&hellip;</h5>
        </div>
        <div class="article__options-menu" v-if="ellipsisIsClicked == true">
            <div v-if="userID != profile" class="article__options-item">
                <img src="../../public/images/bookmark.png" alt="">
                Сохранить
            </div>
            <!-- <div class="article__options-item" v-if="this.userId == profile">
                <img src="../../public/images/rewrite.png" alt="">
                Редактировать
            </div> -->
            <div v-if="userID == profile" @click="deletePost(postID)" class="article__options-item" style="color: #ff4141;">
                <img src="../../public/images/delete.png" alt="">
                Удалить
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { serverAddres } from '../../config.js';

export default {
    name: 'blogOptions',
    data() {
        return {
            ellipsisIsClicked: false,
            userId: 0,
        }
    },
    props: ['userID', 'postID'],
    computed: {
        profile() {
            return this.$store.state.userID;
        }
    },
    methods: {
        showArticleMenu() {
            this.ellipsisIsClicked = !this.ellipsisIsClicked;
            // event.stopPropagation();
        },
        async deletePost(id) {
            console.log(id);
            await axios
                .delete(`${serverAddres}/articles/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                })
                .then(response => {
                    console.log(response);
                    location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.userId = to.params.id;
        next();
    },
    mounted() {
        this.userId = this.$route.params.id;
        // console.log(this.userId);
        // console.log(this.profile);
    }
}
</script>
 
<style lang="scss" scoped>
@import '../variables.scss';

.article__options {
    font-family: 'Nunito Sans', sans-serif;
    user-select: none;
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
        font-size: 40px;
        padding-bottom: 10px;
        color: #535353;
        &:hover {
            color: #6d6d6d;
            transition: 0.2s;
        }
        &:active {
            color: $TitleColor;
        }
    }
}
.article__options-menu {
    z-index: 200;
    background-color: $mainColor;
    border: 1px solid $borderColor;
    border-radius: 5px;
    position: absolute;
    top: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    div {
        // width: 200px;
        font-size: 13px;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        // border-bottom: 1px solid $borderColor;
        img {
            height: 13px;
            width: 13px;
            margin-right: 8px;
        }
        &:hover {
            background-color: $headerColor;
            transition: 0.2s;
        }
    }
}
</style>