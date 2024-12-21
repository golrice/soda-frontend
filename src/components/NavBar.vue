<template>
  <nav class="flex justify-end p-4">
    <ul class="flex space-x-4"> 
      <li v-for="item in props.navItems" :key="item.path">
        <NavLink :to="item.path" v-if="!item.hidden">{{ item.name }}</NavLink>
      </li>
   </ul>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue';
import NavLink from './NavLink.vue';

const props = defineProps({
  navItems: {
    type: Array,
    default: () => [],
  },
})
</script>

