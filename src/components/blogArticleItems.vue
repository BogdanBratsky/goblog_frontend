<template>
    <article class="article" :article_id="title.PostId">
        <header class="article__title">
            <h5>{{ title.PostTitle }}</h5>
        </header>
        <main class="article__content">{{ title.PostContent }}</main>
    </article>
</template>

<script>
export default {
    name: 'blogArticleItems',
    props: ['title']
    // components: 
}
</script>

<style lang="scss">
.article {
    margin: 0 auto;
    margin-bottom: 12px;
    width: 100%;
    padding: 10px 15px 15px 10px;
    // padding-right: 100px;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    box-shadow: 0 5px 12px #efefef;
    background-color: white;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    &:hover {
        cursor: pointer;
        border: 1px solid #d1d1d1;
        box-shadow: 0 10px 20px #ececec;
        transition: 0.2s;
    }
    &__title {
        color: black;
        font-size: 20px;
        margin-bottom: 10px;
    }
}
</style>