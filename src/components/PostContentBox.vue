<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="rounded-lg shadow-md p-6 w-full max-w-3xl bg-white">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800">{{ title }}</h3>
            </div>

            <div class="mb-4">
                <p class="border border-gray-300 p-2 rounded-md bg-gray-100">{{ content }}</p>
            </div>

            <div class="flex justify-end mt-4">
                <button @click="goBack"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200">
                    返回
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const postData = ref(route.query);
const title = ref(postData.value.name)
const content = ref(postData.value.content)

const goBack = () => {
    router.push('/posts/list'); 
}
</script>

<style scoped>
</style>
