<template>
  <div class="flex flex-col gap-4">
    <NavBar :navItems="navItems" />
    <RouterView />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';

const navItems = [
  { path: '/posts/list', name: 'posts list', hidden: false},
  { path: '/posts/create', name: 'create posts', hidden: false},
  { path: '/posts/:name', name: 'post details', hidden: true},
]

</script>
