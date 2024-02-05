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
                rows="15" 
                type="text" 
                placeholder="Введите текст"
                v-model="formData.PostContent"
            ></textarea>
            <footer>
                <button type="submit" class="create__button">Опубликовать</button>
            </footer>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'blogCreatePostPage',
    data() {
        return {
            formData: {
                PostTitle: '',
                PostContent: '',
                CategoryId: 1
            }
        }
    },
    methods: {
        async createArticle() {
            console.log(this.formData.articleTitle);
            console.log(this.formData.articleText);
            await axios
                .post('http://localhost:3000/articles', this.formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                })
                .then(response => {
                    console.log(response);
                    // window.location.href = '/';
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },
    mounted() {
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