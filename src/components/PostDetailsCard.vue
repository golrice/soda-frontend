<template>
  <div class="card w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow mx-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
    <div class="mb-2"><strong>文件名：</strong>{{ props.file.name }}</div>
    <div class="mb-2"><strong>创建时间：</strong>{{ props.file.creationTime }}</div>
    <div class="mb-2"><strong>作者：</strong>{{ props.file.author }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>

</style>
