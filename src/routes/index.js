import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import UserProfile from '@/views/UserProfile.vue'
import PostView from '@/views/PostView.vue'

const routes = [
    { path: '/login', component: LoginView },
    { path: '/', component: HomeView, },
    { path: '/user-profile', component: UserProfile },
    { path: '/posts', component: PostView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
