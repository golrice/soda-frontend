<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-4">
        <div class="relative w-3/5 mb-4">
            <input type="text" placeholder="标题" v-model="title"
                class="border border-gray-300 rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="rounded-lg shadow-md p-6 w-full max-w-5xl min-h-screen">
            <v-md-editor v-model="content" height="700px" @save="save"></v-md-editor>
        </div>
    </div>
</template>

<script setup>
import { API_BASE_URL } from '@/config';
import router from '@/routes';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const title = ref('');
const content = ref('');
const username = ref('');
const needUpdate = ref(false);
const prv_title = ref('');

async function save() {
    try {
        await axios.post(`${API_BASE_URL}/create-post`, {
            title: title.value,
            content: content.value,
            username: username.value,
            prv_title: prv_title.value,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        router.push('/posts');
    } catch (error) {
        alert("Error with fetching file, error message: " + error.message);
    }
}

onMounted(() => {
    if (!localStorage.getItem('username')) {
        alert('Please login first');
        router.push('/login');
    }
    const postData = route.query;
    title.value = postData.title || '';
    content.value = postData.content || '';
    username.value = localStorage.getItem('username');
    needUpdate.value = postData.needUpdate || false;

    if (needUpdate.value) {
        prv_title.value = postData.title;
    }
})

</script>

<style scoped></style>
