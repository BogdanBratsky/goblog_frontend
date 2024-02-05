<template>
    <form class="login-block" @submit.prevent="createUser()">
        <header class="login-block__header">Регистрация</header>
        <div class="login-block__input">
            <input type="text" placeholder="Логин" v-model="formData.UserName">
        </div>
        <div class="login-block__input">
            <input type="text" placeholder="Почта" v-model="formData.UserEmail">
        </div>
        <div class="login-block__input">
            <input type="password" placeholder="Пароль" v-model="passwordCheck.Password1">
        </div>
        <div class="login-block__input">
            <input type="password" placeholder="Повторите пароль" v-model="passwordCheck.Password2">
        </div>
        <footer class="login-block__footer">
            <div class="login-block__signup-btn">
                <router-link to="/login">Авторизация</router-link>
            </div>
            <button type="submit" class="login-block__signin-btn">Зарегистрироваться</button>
        </footer>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'blogSignup',
    data() {
        return {
            formData: {
                UserName: '',
                UserEmail: '',
                PasswordHash: ''
            },
            passwordCheck: {
                Password1: '',
                Password2: ''
            }
        }
    },
    mounted() {
        document.title = 'Регистрация';
    },
    methods: {
        async createUser() {
            console.log('UserName: ', this.formData.UserName);
            console.log('UserEmail: ', this.formData.UserEmail);
            console.log('Password1: ', this.passwordCheck.Password1);
            console.log('Password2: ', this.passwordCheck.Password2);
            if (this.passwordCheck.Password1 != this.passwordCheck.Password2) {
                console.log('Пароли не совпадают!');
            } else {
                this.formData.PasswordHash = this.passwordCheck.Password1;
                await axios
                    .post('http://localhost:3000/register', this.formData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        window.location.href = '/login';
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

@import '../variables.scss';

.login-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
    margin-top: 100px;
    background-color: $headerColor;
    border: 1px solid $borderColor;
    border-radius: 5px;
    box-shadow: 0 0 30px $shadowColor;
    padding: 20px 40px;
    &__header {
        user-select: none;
        color: white;
        width: 100%;
        font-size: 25px;
        margin-bottom: 30px;
        text-align: center;
        font-family: 'Nunito Sans', sans-serif;
    }
    &__input {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 30px;
    }
    input {
        outline: none;
        width: 100%;
        padding: 10px;
        border: 1px solid $borderColor;
        border-radius: 3px;
        box-shadow: 0 0 5px $shadowColor inset;
        background-color: $mainColor;
        color: $TitleColor;
        font-family: 'Nunito Sans', sans-serif;
        &::placeholder {
            color: $btnColor;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 14px;
        }
        &:focus {
            box-shadow: 0 0 10px $shadowColor;
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