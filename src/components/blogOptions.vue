<template>
    <div ref="myElement" class="article__options" @click="showArticleMenu">
        <div class="ellipsis">
            <h5>&hellip;</h5>
        </div>
        <div class="article__options-menu" v-if="ellipsisIsClicked == true">
            <div class="article__options-item">
                <img src="../../public/images/bookmark.png" alt="">
                Сохранить
            </div>
            <div class="article__options-item" v-if="userID == profile">
                <img src="../../public/images/rewrite.png" alt="">
                Редактировать
            </div>
            <div class="article__options-item" v-if="userID == profile" style="color: #ff4141;">
                <img src="../../public/images/delete.png" alt="">
                Удалить
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'blogOptions',
    data() {
        return {
            ellipsisIsClicked: false
        }
    },
    props: ['userID'],
    computed: {
        profile() {
            return this.$store.state.userID;
        }
    },
    methods: {
        showArticleMenu() {
            this.ellipsisIsClicked = !this.ellipsisIsClicked;
            // event.stopPropagation();
            console.log(this.ellipsisIsClicked);
        },
        // closeMenu(event) {
        //     if (!this.$refs.myElement.contains(event.target)) {
        //         console.log('Клик вне элемента');
        //         this.ellipsisIsClicked = false;
        //     }
        // },
    },
    // mounted() {
    //     // Добавляем слушатель клика на всю страницу
    //     document.addEventListener('click', this.closeMenu);
    // },
    // beforeDestroy() {
    //     // Удаляем слушатель перед уничтожением компонента
    //     document.removeEventListener('click', this.closeMenu);
    // },
}
</script>
 
<style lang="scss">
@import '../variables.scss';

.article__options {
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