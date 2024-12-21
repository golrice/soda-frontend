<template>
    <PostDetailsCard v-for="file in files" :key="file.name" :file="file" @click="fetchPost(file.name)" />
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
    console.log("Fetching files");
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

    router.push({ path: `/posts/${name}`, query: { name: postData['title'], content: postData['content'] } })
  } catch (error) {
    alert("Error with fetching file");
  }
}

onMounted(() => {
  fetchPosts();
});

</script>
