import { createRouter, createWebHistory } from 'vue-router'
import ProjectPage from '@/views/ProjectPage.vue'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import NewProjPage from '@/views/NewProjPage.vue'
import RegisterPage from "@/views/RegisterPage.vue"
import ForgetPassPage from "@/components/ForgetPassPage.vue"

const routes = [
    {
        path: "/",
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/RegisterPage",
        name: "RegisterPage",
        component: RegisterPage
    },
    {
        path: "/ForgetPassPage",
        name: "ForgetPassPage",
        component: ForgetPassPage
    },
    {
        path: '/ProjectPage',
        name: 'ProjectPage',
        component: ProjectPage
    },

    {
        path: '/HomePage',
        name:'HomePage',
        component: HomePage
    },
    
    {
        path: '/NewProjPage',
        name: 'NewProjPage',
        component: NewProjPage
    }
]

const router = createRouter({
 history: createWebHistory(),
 routes
})

export default router