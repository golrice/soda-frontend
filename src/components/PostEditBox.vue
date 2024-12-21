<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="rounded-lg shadow-md p-6 w-full max-w-3xl">
            <h2 class="text-2xl font-semibold mb-4">编辑文章</h2>

            <div class="mb-4">
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input type="text" id="title" v-model="title"
                    class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="输入标题" />
            </div>

            <div class="mb-4">
                <label for="content" class="block text-sm font-medium text-gray-700 mb-1">主要内容</label>
                <textarea id="content" v-model="content" rows="6"
                    class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="在这里输入内容"></textarea>
            </div>

            <div class="flex justify-between mt-4">
                <button @click="cancel"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200">
                    取消编辑
                </button>
                <button @click="save"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                    完成并保存编辑
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { API_BASE_URL } from '@/config';
import router from '@/routes';
import axios from 'axios';
import { ref } from 'vue';

const title = ref('');
const content = ref('');

const cancel = () => {
    title.value = '';
    content.value = '';
    router.push('/posts');
};

async function save() {
    console.log('标题:', title.value);
    console.log('内容:', content.value);
    try {
        await axios.post(`${API_BASE_URL}/create-post`, {
            title: title.value,
            content: content.value,
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

</script>

<style scoped>
</style>
