<template>
    <div class="pagination">

        <nav class="pagination__wrapper" v-if="pagesCount > 1">
            <div class="pagination__btn" v-if="currentPage > 1">
                <span @click="enterPage(currentPage - 1)">Назад</span>
            </div>
            <div v-for="p in displayedPages" :key="p" @click="enterPage(p)">
                <div class="pagination__item-style" v-if="currentPage === p">
                {{ p }}
                </div>
                <div class="pagination__item" v-else>
                {{ p }}
                </div>
            </div>
            <div class="pagination__btn" v-if="currentPage < pagesCount">
                <span @click="enterPage(currentPage + 1)">Вперёд</span>
            </div>
        </nav>
        
        <nav class="pagination__wrapper" v-else>
            <!-- <div 
                v-for="p in pagesCount" :key="p" 
                @click="enterPage(p)"
            >
                <div 
                    class="pagination__item-style" 
                    v-if="currentPage == p"
                >
                    {{ p }}
                </div>
                <div 
                    class="pagination__item" 
                    v-else
                >
                    {{ p }}
                </div>
            </div> -->
        </nav>
    </div>
</template>

<script>
export default {
  name: 'blogArticlePagination',
  props: ['pagesCount', 'currentPage'],
  computed: {
    displayedPages() {
      const MAX_DISPLAYED_PAGES = 12; // Максимальное число отображаемых страниц
      const half = Math.floor(MAX_DISPLAYED_PAGES / 2);
      let startPage = Math.max(this.currentPage - half, 1);
      let endPage = Math.min(startPage + MAX_DISPLAYED_PAGES - 1, this.pagesCount);

      if (endPage - startPage + 1 < MAX_DISPLAYED_PAGES) {
        startPage = Math.max(endPage - MAX_DISPLAYED_PAGES + 1, 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
  },
  methods: {
    enterPage(p) {
      this.$emit('enter-page', p);
    },
  },
};
</script>

<style lang="scss">
$borderRaduis: 8px;
$hoverColor: #2f2f2f;
$marginRight: 7px;
$activeColor: #c2c2c2;

@import '../variables.scss';

.pagination {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
    user-select: none;
    width: 1100px;
    margin-bottom: 12px;
    color: $paginationNumColor;
    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        overflow-x: auto;
    }
    &__item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 7px 10px;
        border-radius: $borderRaduis;
        background-color: $headerColor;
        border: 1px solid $borderColor;
        box-shadow: 0 0 12px $shadowColor;
        margin-right: $marginRight;
        &:hover {
            cursor: pointer;
            background-color: $hoverColor;
            box-shadow: 0 10px 20px $shadowColor;
            transition: 0.1s;
        }
        &:active {
            background-color: #464646;
        }

        &-style {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 7px 10px;
            border-radius: $borderRaduis;
            color: $activeColor;
            background-color: $headerColor;
            border: 1px solid $activeColor;
            box-shadow: 0 0 12px $shadowColor;
            margin-right: $marginRight;
        }
    }
    &__btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 7px 10px;
        border: 1px solid $borderColor;
        border-radius: $borderRaduis;
        margin-right: $marginRight;
        box-shadow: 0 0 10px $shadowColor;
        background-color: $headerColor;
        &:hover {
            cursor: pointer;
            background-color: $hoverColor;
            box-shadow: 0 0 12px $shadowColor;
            transition: 0.1s;
        }
        &:active {
            background-color: #464646;
            color: white;
        }
        img {
            width: 18px;
            height: 18px;
        }
        &:not(::last-child) {
            margin-right: 6px;
        }
    }
}
</style>