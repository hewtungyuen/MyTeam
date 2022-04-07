import { createRouter, createWebHistory } from 'vue-router'
import ProjectPage from '@/views/ProjectPage.vue'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import NewProjPage from '@/views/NewProjPage.vue'
import RegisterPage from "@/views/RegisterPage.vue"
import ForgetPassPage from "@/components/ForgetPassPage.vue"
import ProfilePage from "@/views/ProfilePage.vue"
import AddAMeeting from "@/components/AddAMeeting.vue"
import MembersStatistics from "@/views/MembersStatistics.vue"
import ColleaguesPage from '@/views/ColleaguesPage.vue'

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
        path: '/ProjectPage/:id',
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
    ,
    {
        path: '/AddAMeeting',
        name: 'AddAMeeting',
        component: AddAMeeting
    },
    
    {
        path: '/MemberStatistics/:id',
        name: 'MembersStatistics',
        component: MembersStatistics
    },

    {
        path: '/ColleaguesPage',
        name: 'ColleaguesPage',
        component: ColleaguesPage
    }
]

const router = createRouter({
 history: createWebHistory(),
 routes
})

router.beforeEach((from, to) => {
    if (from.name == 'LoginPage' && 
    (to.name == "HomePage"  
    || to.name == "ColleaguesPage" 
    || to.name == "ProfilePage"
    || to.name == "MembersStatistics"
    || to.name == "NewProjPage"
    || to.name == "ProjectPage" )) {
        let boo = confirm("are you sure you want to log out?")
        return boo
    }
  })

export default router