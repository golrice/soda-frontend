<template>
  <nav class="flex justify-end p-4">
    <ul class="flex space-x-4"> 
      <li v-for="item in navItems" :key="item.path">
        <NavLink :to="item.path">{{ item.name }}</NavLink>
      </li>
   </ul>
  </nav>
</template>

<script setup>
import NavLink from './NavLink.vue';

const navItems = [
  { path: '/', name: '主界面' },
  { path: 'posts', name: '文章' },
  { path: '/user-profile', name: '用户信息' },
  { path: '/login', name: '登录' },
]
</script>

