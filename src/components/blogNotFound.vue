<template>
    <div class="notFoundPage">
        <div class="notFoundPage__title">
            <h2 style="z-index: 10;">4</h2>
            <h2 style="display: block; z-index: 5; padding-top: 30px;">0</h2>
            <h2 style="z-index: 1; padding-top: 60px;">4</h2>
        </div>
        <div class="notFoundPage__footer">
            <span>НЕТ ТАКОЙ СТРАНИЦЫ.</span>
            <router-link to="/articles">
                <span class="notFoundPage__link">
                    ПЕРЕЙТИ НА ГЛАВНУЮ.
                </span>
            </router-link>
        </div>
        <!-- <img src="../../public/images/404.svg" alt=""> -->
    </div>
</template>

<script>
export default {
    name: 'blogNotFound'
}
</script>

<style lang="scss">
@import '../variables.scss';

.notFoundPage {
    user-select: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 180px;
    &__title {
        display: flex;
        font-family: 'Vina Sans', sans-serif;
        margin-bottom: 24px;
        color: $TitleColor;
        text-shadow: -24px 24px 0 $btnColor;
    }
    &__footer {
        color: $TitleColor;
        font-size: 0.085em;
    }
    &__link {
        color: $TitleColor;
        // text-decoration: underline dotted;
        &:hover {
            color: $TitleHoverColor;
            transition: 0.2s;
        }
    }
    // img {
    //     margin: 0 auto;
    //     width: 300px;
    //     height: 300px;
    // }
}
</style>