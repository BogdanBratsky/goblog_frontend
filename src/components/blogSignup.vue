<template>
    <form class="signup-block" @submit.prevent="submitHandler()">
        <header class="signup-block__header">Регистрация</header>
        <div class="signup-block__input">
            <div v-if="errors.login" class="valid-info">{{ errors.login }}</div>
            <input :class="errors.login ? 'input-warning' : 'input'" type="text" placeholder="Логин" v-model="formData.UserName">
        </div>
        <div class="signup-block__input">
            <div v-if="errors.email" class="valid-info">{{ errors.email }}</div>
            <input :class="errors.email ? 'input-warning' : 'input'" type="text" placeholder="Почта" v-model="formData.UserEmail">
        </div>
        <div class="signup-block__input">
            <div v-if="errors.password1" class="valid-info">{{ errors.password1 }}</div>
            <input :class="errors.password1 ? 'input-warning' : 'input'" type="password" placeholder="Пароль" v-model="passwordCheck.Password1">
        </div>
        <div class="signup-block__input">
            <div v-if="errors.password2" class="valid-info">{{ errors.password2 }}</div>
            <input :class="errors.password2 ? 'input-warning' : 'input'" type="password" placeholder="Повторите пароль" v-model="passwordCheck.Password2">
        </div>
        <footer class="signup-block__footer">
            <div class="signup-block__signup-btn">
                <router-link to="/login">Авторизация</router-link>
            </div>
            <button type="submit" class="signup-block__signin-btn">Зарегистрироваться</button>
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
                Password: ''
            },
            passwordCheck: {
                Password1: '',
                Password2: ''
            },
            errors: {
                login: null,
                email: null,
                password1: null,
                password2: null
            }
        }
    },
    mounted() {
        document.title = 'Регистрация';
    },
    methods: {
        formIsValid() {
            let isValid = true;

            if (this.formData.UserName.length === 0) {
                isValid = false;
                this.errors.login = 'Введите логин';
            } else {
                this.errors.login = null;
            }

            if (this.formData.UserEmail.length === 0) {
                isValid = false;
                this.errors.email = 'Введите почту';
            } else {
                this.errors.email = null;
            }

            if (this.passwordCheck.Password1.length === 0) {
                isValid = false;
                this.errors.password1 = 'Введите пароль';
            } else {
                this.errors.password1 = null;
            }

            if (this.passwordCheck.Password2.length === 0) {
                isValid = false;
                this.errors.password2 = 'Повторите пароль';
            } else {
                this.errors.password2 = null;
            }

            return isValid;
        },
        async submitHandler() {
            if (this.formIsValid() && this.passwordCheck.Password1 == this.passwordCheck.Password2) {
                this.formData.Password = this.passwordCheck.Password1;
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

.valid-info {
    color: #c02f2f;
    align-self: flex-end;
    margin-bottom: 6px;
    font-size: 14px;
    font-family: 'Nunito Sans', sans-serif;
}

.signup-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 400px;
    margin: 0 auto;
    margin-bottom: 24px;
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