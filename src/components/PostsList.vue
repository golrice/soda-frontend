<template>
  <div class="h-screen flex flex-col gap-4">
    <PostDetailsCard v-for="file in files" :key="file.title" :file="file" @click="fetchPost(file.title)" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PostDetailsCard from '@/components/PostDetailsCard.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import router from '@/routes';

const files = ref([])

async function fetchPosts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-posts`);
    files.value = response.data["posts"];
  } catch (error) {
    alert("Error with fetching files");
  }
}

async function fetchPost(name) {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-post/${name}`);
    const postData = response.data;

    router.push({ path: `/posts/${name}`, query: { title: postData['title'], content: postData['content'], author: postData['author'] } })
  } catch (error) {
    alert("Error with fetching file");
  }
}

onMounted(() => {
  fetchPosts();
});

</script>
