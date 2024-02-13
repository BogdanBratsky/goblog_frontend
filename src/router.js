import { createRouter, createWebHistory } from "vue-router";
import blogLogin from './components/blogLogin.vue';
import blogSignup from './components/blogSignup.vue';
import blogArticlePage from './components/blogArticlePage.vue'
import blogArticleWrapper from './components/blogArticleWrapper.vue';
import blogProfilePage from './components/blogProfilePage.vue';
import blogCreatePostPage from './components/blogCreatePostPage.vue';
import blogNotFound from './components/blogNotFound.vue';
import blogCategoryArticles from './components/blogCategoryArticles.vue';

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
            path: '/id:id', 
            component: blogProfilePage,
            props: true
        },
        { 
            path: '/new-article', 
            component: blogCreatePostPage,
        },
        { 
            path: '/categories/:id', 
            component: blogCategoryArticles,
            props: true
        },
        {
            path: '/:notFound(.*)',
            component: blogNotFound
        }
    ]
});

export default router;