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
    let username = "";
    try {
      // const token = localStorage.getItem('token');
      username = localStorage.getItem('username');
    } catch (error) {
      alert("请登录以解锁享受个性化推荐！");
    }

    // 设置axios的请求头部，包含认证token
    const config = {
      headers: {
        ...(username ? { Authorization: `Bearer ${username}` } : {}) // 使用Bearer schema，理论上这玩意用来设计token的，但我用来弄username的也行
      }
    };
    const response = await axios.get(`${API_BASE_URL}/get-posts`, config);
    files.value = response.data["posts"];
  } catch (error) {
    alert("Error with fetching files");
  }
}

async function fetchPost(name) {
  try {
    // const token = ''
    let username = "";
    try {
      // const token = localStorage.getItem('token');
      username = localStorage.getItem('username');
    } catch (error) {
      alert("请登录以解锁享受个性化推荐！");
    }

    // 设置axios的请求头部，包含认证token
    const config = {
      headers: {
        ...(username ? { Authorization: `Bearer ${username}` } : {}) // 使用Bearer schema，理论上这玩意用来设计token的，但我用来弄username的也行
      }
    };
    const response = await axios.get(`${API_BASE_URL}/get-post/${name}`, config);
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
