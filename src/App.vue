<template>
  <BaseLayout>
    <NavBar :navItems="navItems"/>
    <RouterView /> 
  </BaseLayout>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import BaseLayout from './layouts/BaseLayout.vue';

const navItems = [
  { path: '/', name: '主界面', hidden: false },
  { path: '/posts', name: '文章', hidden: false },
  { path: '/user-profile', name: '用户信息', hidden: false },
  { path: '/login', name: '登录', hidden: false },
  { path: '/Register', name: '注册', hidden: false},
]
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>