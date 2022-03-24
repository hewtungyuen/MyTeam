import { createRouter, createWebHistory } from 'vue-router'
import ProjectPage from '@/views/ProjectPage.vue'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import NewProjPage from '@/views/NewProjPage.vue'
import RegisterPage from "@/views/RegisterPage.vue"
import ForgetPassPage from "@/components/ForgetPassPage.vue"
import ProfilePage from "@/views/ProfilePage.vue"

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
    },

    {
        path: '/ProfilePage',
        name: 'ProfilePage',
        component: ProfilePage
    }
]

const router = createRouter({
 history: createWebHistory(),
 routes
})

export default router