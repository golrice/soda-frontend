<template>
  <div
    class="card m-h-full w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow mx-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
    @click="fetchPost(props.file.title)">
    <div class="mb-2"><strong>文件名：</strong>{{ props.file.title }}</div>
    <div class="mb-2"><strong>创建时间：</strong>{{ props.file.creationTime }}</div>
    <div class="mb-2"><strong>作者：</strong>{{ props.file.author }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { API_BASE_URL } from '@/config';

const router = useRouter();

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
});

async function fetchPost(title) {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-post/${title}`);
    const postData = response.data;

    router.push({ path: `/posts/${title}`, query: { title: postData['title'], content: postData['content'], author: postData['author'] } })
  } catch (error) {
    alert("Error with fetching file");
  }
}
</script>

<style scoped></style>
