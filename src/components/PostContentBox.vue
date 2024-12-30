<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="rounded-lg shadow-md p-6 w-full max-w-3xl bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="flex justify-start text-lg font-bold text-gray-800">{{ title }}</h3>
                <h3 class="flex justify-end text-lg font-bold text-gray-800">{{ author }}</h3>
            </div>

            <div class="mb-4">
                <v-md-preview class="border border-gray-300 p-2 rounded-md bg-gray-50" :text="content"></v-md-preview>
            </div>

            <div class="flex justify-between items-center" v-if="updateRight">
                <div class="flex justify-start mt-4">
                    <button @click="goUpdate()"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200">
                        修改
                    </button>
                </div>

                <div class="flex justify-end mt-4">
                    <button @click="goDelete()"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200">
                        删除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const username = ref('');

const router = useRouter();
const route = useRoute();

const title = ref('')
const content = ref('')
const author = ref('')

const updateRight = ref(false)

async function goUpdate() {
    router.push({ path: '/posts/create', query: { title: title.value, content: content.value, author: author.value, needUpdate: true } })
}

async function goDelete() {
    try {
        await axios.delete(`${API_BASE_URL}/delete-post/${title.value}?author=${author.value}`);
        router.push({ path: '/posts' });
    } catch (error) {
        alert("Error deleting post");
    }
}

onMounted(() => {
    const postData = route.query
    title.value = postData.title || '';
    content.value = postData.content || '';
    author.value = postData.author || '';
    username.value = localStorage.getItem('username') || '';
    updateRight.value = author.value != '' && username.value === author.value;
})

</script>

<style scoped></style>
