<template>
    <header class="header">
        <nav class="header__nav">
                <router-link to="/articles">
                <div class="logo-wrap">
                    <div class="logo-icon">
                        ARTICLES
                    </div>
                </div>
                </router-link>
                <div class="header__user-btn" @click="showMenu()" v-if="isAuthorised">
                    {{ userName }}
                    <div v-if="isClicked" class="user-btn__clicked">
                        <router-link :to="'/id' + profile">
                        <span class="user-btn__profile">
                            Мой профиль
                        </span>
                        </router-link>
                        <span class="user-btn__exit" @click="exitFunc()">
                            <img src="../../public/images/exit.png" alt="">
                            Выйти
                        </span>
                    </div>
                </div>
            <router-link v-if="!isAuthorised" to="/login">
                <div class="header__login-btn">
                    Войти
                </div>
            </router-link>
        </nav>
    </header>
</template>

<script>
import axios from 'axios';

export default {
    name: 'blogHeader',
    props: ['ID'],
    data() {
        return {
            isAuthorised: false,
            isClicked: false,
            userName: '',
            userId: ''
        }
    },
    computed: {
        profile() {
            return this.$store.state.userID;
        }
    },
    methods: {
        showMenu() {
            this.isClicked = !this.isClicked;
        },
        // closeMenu() {
        //     if (!this.$refs.myElement.contains(event.target)) {
        //         console.log('Клик вне элемента');
        //         this.isClicked = false;
        //     }
        // },
        exitFunc() {
            localStorage.removeItem('token');
            window.location.href = '/';
        },
        async getProfile(token) {
          try {
            const response = await axios.get(`http://localhost:3000/profile`, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            });
            this.userId = response.data;
            this.$store.state.userID = this.userId;
            this.isAuthorised = true;

            this.getUserById(this.userId);

            } catch (error) {
                console.error('Error fetching user data:', error);
                this.isAuthorised = false;
            }
        }, 
        async getUserById(id) {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                this.userName = response.data.UserName
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        } 
    },
    mounted() {
        this.getProfile(localStorage.token);
    },
}
</script>

<style lang="scss">
@import '../variables.scss';

.header {
    z-index: 100;
    width: 100%;
    // background-color: $mainColor;
    background-color: $headerColor;
    border-bottom: 1px solid $borderColor;
    box-shadow: 0 3px 5px $shadowColor;
    position: fixed;
    top: 0;
    left: 0;
    user-select: none;
    &__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 1170px;
        height: 55px;
        margin: 0 auto;
        .logo-wrap {
            cursor: pointer;
            display: flex;
            align-items: center;
            font-size: 23px;
            font-family: 'Oswald', sans-serif;
            color: $logoColor;
            &:active {
                padding-top: 2px;
            }
            img {
                width: 28px;
                height: 28px;
            }
        }
    }
    &__user-block {
        display: flex;
        align-items: center;
        height: 100%;
    }
    &__write-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        // height: 60%;
        // box-shadow: 0 0 10px $shadowColor;
        // border: 1px solid $borderColor;
        padding: 5px;
        border-radius: 3px;
        img {
            width: 22px;
            height: 22px;
        }
    }
    &__user-btn {
        position: relative;
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 6px 7px;
        color: $TitleColor;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 15px;
        &:hover {
            color: $TitleHoverColor;
            transition: 0.2s;
        }
        &:active {
            color: white;
        }
    }
    &__login-btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 7px 12px;
        border: 1px solid $borderColor;
        border-radius: 3px;
        background-color: $btnColor;
        color: $btnTxtColor;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 13px;
        &:hover {
            background-color: $btnHoverColor;
            transition: 0.2s;
        }
        &:active {
            background-color: $btnActiveColor;
        }
    }
}

.user-btn__clicked {
    position: absolute;
    top: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    border: 1px solid $borderColor;
    border-radius: 5px;
    background-color: $mainColor;
    box-shadow: 0 5px 10px $shadowColor;
    span {
        display: inline-block;
        width: 150px;
        color: white;
        padding: 10px;
        font-size: 14px;
        &:hover {
            background-color: $headerColor;
            transition: 0.2s;
        }
        &:active {
            background-color: #5a5a5a;
        }
    }
    .user-btn__exit {
        display: flex;
        align-items: center;
        border-top: 1px solid $borderColor;
        color: #ff4141;
        img {
            height: 16px;
            width: 16px;
            margin-right: 2px;
        }
    }
}
</style>