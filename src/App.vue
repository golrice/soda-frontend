<template>
  <div>
    <NavBar />
    <RouterView /> 
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import NavBar from './components/NavBar.vue';

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:8000/app/');
    console.log(response.data["message"]);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  fetchData();
});

</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>