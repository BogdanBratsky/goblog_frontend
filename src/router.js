import { createRouter, createWebHistory } from "vue-router";
import blogLogin from './components/blogLogin.vue';
import blogSignup from './components/blogSignup.vue';
import blogArticlePage from './components/blogArticlePage.vue'
import blogArticleWrapper from './components/blogArticleWrapper.vue';
import blogProfilePage from './components/blogProfilePage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/articles', 
            alias: '/',
            component:  blogArticleWrapper,
            props: true
        },
        {
            path: '/articles/:id',
            component: blogArticlePage 
        },
        { 
            path: '/login', 
            component: blogLogin 
        },
        { 
            path: '/registration', 
            component: blogSignup 
        },
        { 
            path: '/profile', 
            component:  blogProfilePage,
        },
    ]
});

export default router;