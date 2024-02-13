<template>
    <footer class="footer">
        <nav class="footer__nav">
            © 2024
        </nav>
    </footer>
</template>

<script>
export default {
    name: 'blogFooter'
}
</script>

<style lang="scss">
@import '../variables.scss';

.footer {
    width: 100%;
    padding: 24px 0;
    border-top: 1px solid $borderColor;
    background-color: $footerColor;
    align-self: flex-end;
    &__nav {
        margin: 0 auto;
        width: 1170px;
        color: $TitleColor;
        font-family: 'Oswald', sans-serif;
        font-size: 14px;
        // text-align: end;
    }
}
</style>