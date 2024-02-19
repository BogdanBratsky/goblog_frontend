<template>
    <div class="create">
        <header class="create__header">
            <h3>Создание записи</h3>
        </header>
        <form class="create__wrapper" @submit="createArticle()">
            <!-- <input ref="titleInput" id="title" type="text" placeholder="Заголовок"> -->
            <textarea 
                ref="titleInput" 
                id="title" 
                rows="2" 
                type="text" 
                placeholder="Заголовок"
                v-model="formData.PostTitle"
            ></textarea>
            <textarea 
                id="content" 
                rows="17" 
                type="text" 
                placeholder="Введите текст"
                v-model="formData.PostContent"
            ></textarea>
            <div style="font-size: 15px; margin-bottom: 6px;">Выберите категорию: </div>
            <select id="category" v-model="formData.CategoryId">
                <option 
                    v-for="category in categories"
                    :value="category.CategoryId"
                >{{ category.CategoryName }}</option>
            </select>
            <footer>
                <button type="submit" class="create__button">Опубликовать</button>
            </footer>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { serverAddres } from '../../config.js';

export default {
    name: 'blogCreatePostPage',
    data() {
        return {
            formData: {
                PostTitle: '',
                PostContent: '',
                CategoryId: null
            },
            categories: []
        }
    },
    methods: {
        async createArticle() {
            if (this.formData.PostTitle == '' || this.formData.PostContent == '') return
            await axios
                .post(`${serverAddres}/articles`, this.formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                })
                .then(response => {
                    // window.location.href = '/';
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        async getCategories() {
            await axios
                .get(`${serverAddres}/categories`)
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },
    mounted() {
        this.getCategories();
        // Устанавливаем фокус на поле с id="title" при загрузке компонента
        this.$refs.titleInput.focus();
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.create {
    font-family: 'Nunito Sans', sans-serif;
    &__header {
        background-color: $headerColor;
        border: 1px solid $borderColor;
        border-radius: 3px;
        width: 900px;
        color: $TitleColor;
        padding: 24px 12px;
        font-size: 22px;
        margin-bottom: 12px;
    }
    &__wrapper {
        background-color: $headerColor;
        display: flex;
        flex-direction: column;
        border: 1px solid $borderColor;
        box-shadow: 0 5px 15px $shadowColor;
        border-radius: 5px;
        width: 900px;
        color: $TitleColor;
        padding: 16px;
        font-size: 22px;
        margin-bottom: 12px;
        input, textarea {
            border: none;
            outline: none;
            resize: none;
            overflow-y: hidden; 
            height: auto; 
            background-color: inherit;
            color: $TitleColor;
        }
        #title {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 12px;
            &::placeholder {
                font-size: 30px;
            }
        }
        #content {
            font-size: 18px;
            max-width: 100%;
            margin-bottom: 12px;
            overflow-y: auto; 
            &::placeholder {
                font-size: 18px;
            }
            // &:focus {
            //     box-shadow: 0 0 10px $shadowColor;
            // }
        }
        #category {
            cursor: pointer;
            display: inline-flex;
            width: 200px;
            padding: 4px;
            margin-bottom: 12px;
            font-size: 15px;
            background-color: $headerColor;
            color: $TitleColor;
            outline: none;
            border: 1px solid $borderColor;
            border-radius: 3px;
            box-shadow: 0 5px 10px $shadowColor;
            option {
                cursor: pointer;
            }
        }
    }
    &__button {
        user-select: none;
        cursor: pointer;
        font-size: 16px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: $btnColor;
        border: 1px solid $borderColor;
        border-radius: 3px;
        padding: 8px 10px;
        color: $btnTxtColor;
        font-size: 14px;
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