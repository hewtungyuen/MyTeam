import { createRouter, createWebHistory } from 'vue-router'
import ProjectPage from '@/views/ProjectPage.vue'

const routes = [
    {
        path: '/ProjectPage',
        name: 'ProjectPage',
        component: ProjectPage
    }
]

const router = createRouter({
 history: createWebHistory(),
 routes
})

export default router