<template>
    <header class="header">
        <div class="header__nav">
            <div class="logo-wrap">
                <div class="logo-icon">BLOG</div>
            </div>
            <div class="header__user-btn">
                Войти
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'blogHeader',
    // data() {
    //     return {
    //         isInSystem: false
    //     }
    // }
}
</script>

<style lang="scss">
.header {
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
    // box-shadow: 0 5px 10px #efefef;
    position: fixed;
    top: 0;
    left: 0;
    user-select: none;
    &__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 1100px;
        height: 60px;
        margin: 0 auto;
        .logo-wrap {
            cursor: pointer;
            display: flex;
            align-items: center;
            font-size: 26px;
            font-family: 'Oswald', sans-serif;
        }
    }
    &__user-btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 50%;
        padding: 5px 7px;
        border: 1px solid #eaeaea;
        border-radius: 4px;
        background-color: #5858ee;
        color: white;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 13px;
        &:hover {
            background-color: #6363ff;
            border: 1px solid #d1d1d1;
            transition: 0.2s;
        }
        &:active {
            background-color: #9595ff;
        }
    }
}
</style>