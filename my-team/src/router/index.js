import { createRouter, createWebHistory } from 'vue-router'
import ProjectPage from '@/views/ProjectPage.vue'
import HomePage from '@/views/HomePage.vue'

const routes = [
    {
        path: '/ProjectPage',
        name: 'ProjectPage',
        component: ProjectPage
    },

    {
        path: '/HomePage',
        name:'HomePage',
        component: HomePage
    }
]

const router = createRouter({
 history: createWebHistory(),
 routes
})

export default router