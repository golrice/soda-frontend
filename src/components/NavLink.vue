<template>
    <RouterLink 
        :to="props.to"
        class="bg-blue-200 text-blue-800 rounded-full px-4 py-2 transition duration-300 hover:bg-blue-300 hover:text-blue-900">
        <slot></slot>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
    to: {
        type: String,
        required: true
    }
});

</script>
