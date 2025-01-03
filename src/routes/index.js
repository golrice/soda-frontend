import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import UserProfile from '@/views/UserProfile.vue'
import PostView from '@/views/PostView.vue'
import PostEditBox from '@/components/PostEditBox.vue'
import PostContentBox from '@/components/PostContentBox.vue'
import PostsList from '@/components/PostsList.vue'
import RegisterView from '@/views/RegisterView.vue'
import PalView from '@/views/PalView.vue'
import ChatRoom from '@/components/ChatRoom.vue'

const routes = [
    { path: '/login', component: LoginView },
    { path: '/', component: HomeView, },
    { path: '/user-profile', component: UserProfile },
    {
        path: '/posts', component: PostView, redirect: '/posts/list',
        children: [
            { path: ':name', component: PostContentBox },
            { path: 'create', component: PostEditBox },
            { path: 'list', component: PostsList },
        ]
    },
    { path: '/Register', component: RegisterView },
    { path: '/pal', component: PalView },
    { path: '/chatroom/:current_name/:visit_name', name: 'chatroom', component: ChatRoom },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
