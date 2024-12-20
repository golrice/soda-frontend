<template>
    <router-link 
        :to="to"
        class="bg-blue-200 text-blue-800 rounded-full px-4 py-2 transition duration-300 hover:bg-blue-300 hover:text-blue-900">
        <slot></slot>
    </router-link>
</template>

<script setup>
</script>
