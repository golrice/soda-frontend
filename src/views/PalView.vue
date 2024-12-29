<template>
  <div class="h-screen w-full flex flex-col justify-center items-center">
    <div class="relative w-3/5 mb-4">
      <input type="text" placeholder="搜索人名" v-model="searchQuery" @input="onInput"
        class="border border-gray-300 rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <ul v-if="results.length" class="absolute z-10 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg">
        <li v-for="person in results" :key="person.id" class="py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100"
          @click="goToPersonDetail(person)">
          {{ person }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { API_BASE_URL } from '@/config';
import router from '@/routes';
import { ref } from 'vue';

const searchQuery = ref(''); // 输入框的值
const results = ref([]); // 搜索结果

const onInput = async () => {
  if (searchQuery.value.trim() === '') {
    results.value = [];
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pal?query=${searchQuery.value}`);
    const data = await response.json();
    results.value = data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

async function goToPersonDetail(person) {
  router.push({ path: '/user-profile', query: { visit_name: person } });
}

</script>

<style></style>
