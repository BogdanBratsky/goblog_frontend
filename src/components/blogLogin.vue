<template>
    <form class="login-block" @submit.prevent="submitHadnler()">
        <header class="login-block__header">Авторизация</header>
        <div class="login-block__input">
            <div v-if="errors.email" class="valid-info">{{ errors.email }}</div>
            <input 
                :class="errors.email ? 'input-warning' : 'input'"
                type="text" 
                placeholder="Почта"
                v-model="formData.UserEmail"
            >
        </div>
        <div class="login-block__input">
            <div v-if="errors.password" class="valid-info">{{ errors.password }}</div>
            <input 
                :class="errors.password ? 'input-warning' : 'input'"
                type="password" 
                placeholder="Пароль"
                v-model="formData.PasswordHash"
            >
        </div>
        <footer class="login-block__footer">
            <div class="login-block__signup-btn">
                <router-link to="/registration">Зарегистрироваться</router-link>
            </div>
            <button type="submit" class="login-block__signin-btn">Войти</button>
            <!-- {{ this.token }} -->
        </footer>
    </form>
</template>

<script>
import axios from 'axios';
import { serverAddres } from '../../config.js';

export default {
    name: 'blogLogin',
    data() {
        return {
            formData: {
                UserEmail: '',
                PasswordHash: '',
                isUncrorrect: false
            },
            token: '',
            errors: {
                email: null,
                password: null
            }
        }
    },  
    methods: {
        formIsValid() {
            let isValid = true;

            if (this.formData.UserEmail.length === 0) {
                isValid = false;
                this.errors.email = 'Введите почту';
            } else {
                this.errors.email = null;
            }

            if (this.formData.PasswordHash.length === 0) {
                isValid = false;
                this.errors.password = 'Введите пароль';
            } else {
                this.errors.password = null;
            }

            return isValid;
        },
        async submitHadnler() {
            if (this.formIsValid()) {
                await axios
                    .post(`${serverAddres}/login`, this.formData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        // this.isUncrorrect = false;
                        console.log(response.data);
                        // this.token = response.data.token;
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('userID', response.data.userInfo.userId);
                        localStorage.setItem('userNAME', response.data.userInfo.userName);
                        window.location.href = '/';
                    })
                    .catch(error => {
                        this.isUncrorrect = true;
                        console.error('Error:', error);
                    });
            }
        },
    },
    mounted() {
        document.title = 'Авторизация';
    },
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.valid-info {
    color: #c02f2f;
    align-self: flex-end;
    margin-bottom: 6px;
    font-size: 14px;
    font-family: 'Nunito Sans', sans-serif;
}

.login-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
    background-color: $headerColor;
    border: 1px solid $borderColor;
    border-radius: 5px;
    box-shadow: 0 0 30px $shadowColor;
    padding: 20px 40px;
    &__header {
        user-select: none;
        color: $TitleColor;
        width: 100%;
        font-size: 25px;
        margin-bottom: 30px;
        text-align: center;
        font-family: 'Nunito Sans', sans-serif;
    }
    &__input {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 40px;
    }
    .input {
        outline: none;
        width: 100%;
        padding: 12px 10px;
        border: 1px solid $borderColor;
        border-radius: 3px;
        box-shadow: 0 0 5px $shadowColor inset;
        background-color: $mainColor;
        color: $TitleColor;
        font-family: 'Nunito Sans', sans-serif;
        &::placeholder {
            user-select: none;
            color: $btnColor;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 14px;
        }
        &:focus {
            border: 1px solid $btnColor;
        }
    }
    .input-warning {
        outline: none;
        width: 100%;
        padding: 12px 10px;
        border: 1px solid #c02f2f;
        border-radius: 3px;
        box-shadow: 0 0 5px $shadowColor inset;
        background-color: $mainColor;
        color: $TitleColor;
        font-family: 'Nunito Sans', sans-serif;
        &::placeholder {
            user-select: none;
            color: $btnColor;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 14px;
        }
        &:focus {
            border: 1px solid $btnColor;
        }
    }
    &__footer {
        user-select: none;
        width: 100%;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        align-items: center;
        padding-top: 30px;
        border-top: 1px solid $borderColor;
    }
    &__signin-btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 8px 55px;
        margin-bottom: 20px;
        border: none;
        border-radius: 4px;
        background-color: $btnColor;
        color: white;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 15px;
        &:hover {
            background-color: $btnHoverColor;
            transition: 0.2s;
        }
        &:active {
            background-color: $btnActiveColor;
        }
    }
    &__signup-btn {
        font-family: 'Nunito Sans', sans-serif;
        font-size: 14px;
        a {
            color: #a7c7ff;
            &:hover {
                color: white;
            }
        }
    }
}
</style>