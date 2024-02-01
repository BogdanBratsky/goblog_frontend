<template>
    <main class="login-block">
        <header class="login-block__header">Регистрация</header>
        <div class="login-block__input">
            <input type="text" placeholder="Логин">
        </div>
        <div class="login-block__input">
            <input type="text" placeholder="Почта">
        </div>
        <div class="login-block__input">
            <input type="password" placeholder="Пароль">
        </div>
        <div class="login-block__input">
            <input type="password" placeholder="Повторите пароль">
        </div>
        <footer class="login-block__footer">
            <div class="login-block__signup-btn">
                <router-link to="/login">Авторизация</router-link>
            </div>
            <div class="login-block__signin-btn">Зарегистрироваться</div>
        </footer>
    </main>
</template>

<script>
export default {
    name: 'blogSignup',
    mounted() {
        document.title = 'Регистрация';
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.login-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
    margin-top: 72px;
    background-color: $mainColor;
    border: 1px solid $borderColor;
    border-radius: 8px;
    box-shadow: 0 0 30px $shadowColor;
    padding: 20px 30px;
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
        border: 1px solid #eaeaea;
        border-radius: 5px;
        box-shadow: 0 0 10px $shadowColor;
        background-color: #4d4d4d;
        &::placeholder {
            color: white;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 14px;
        }
        &:focus {
            box-shadow: 0 0 20px $shadowColor;
        }
    }
    &__footer {
        user-select: none;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__signin-btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 8px 15px;
        border: 1px solid #eaeaea;
        border-radius: 4px;
        background-color: $btnColor;
        color: white;
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
</style>