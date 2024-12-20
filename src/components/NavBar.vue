<template>
  <nav class="flex justify-end p-4">
    <ul class="flex space-x-4"> 
      <li>
        <NavLink to="/">主界面</NavLink>
      </li>
      <li>
        <NavLink to="posts">文章</NavLink>
      </li>
      <li>
        <NavLink to="/user-profile">用户信息</NavLink>
      </li>
      <li>
        <NavLink to="/login">登录</NavLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import NavLink from './NavLink.vue';
</script>

