<template>

  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

      <!-- Form -->
      <form @submit.prevent="handleLogin">
        <!-- Username -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input v-model="username" id="username" type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username" required />
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" id="password" type="password"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password" required />
        </div>

        <!-- Error message -->
        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <button type="submit"
          class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <a @click="this.$router.push('/Register')" class="text-blue-500 hover:underline cursor-pointer">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script setup>
//import { RSAKey } from 'jsrsasign';
import axios from 'axios';
import SHA256 from "crypto-js/sha256";
import { enc } from "crypto-js";
import { API_BASE_URL } from '@/config';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');
//publicKey: '',
let errorMessage = ref('');
const isLoading = ref(false);

function encryptData(password) {
  const hash = SHA256(password).toString(enc.Hex);
  return hash;
}

async function handleLogin() {
  // Basic validation
  if (username.value === '' || password.value === '') {
    errorMessage = 'Both fields are required.';
  } else {
    errorMessage.value = '';
    isLoading.value = true;
    const encryptedPassword = encryptData(password.value);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username: username.value,
        sha256_hash: encryptedPassword
      });
      //console.error(response.error);
      if (response.data.message === 'Password is correct') {
        alert('Login Successful');
        // Handle successful login, e.g., redirect to dashboard
      }
      else if (response.data.message === 'User does not exist.') {
        errorMessage.value = 'User does not exist.';
      }

      else if (response.data.message === 'Incorrect username or password.') {
        errorMessage.value = 'Incorrect username or password.';
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username.value);

      router.push({ path: '/user-profile' });
    } catch (error) {
      // Handle network errors or other issues
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error:', error.response);
        errorMessage.value = error.response.data.message || 'An error occurred on the server.';
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
        errorMessage.value = 'No response from the server. Please check your connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        errorMessage.value = 'An error occurred while setting up the request.';
      }
    } finally {
      isLoading.value = false;
    }
  }
}

onMounted(() => {
  if (localStorage.getItem('token')) {
    alert('You are already logged in.');
    router.push({ path: '/user-profile' });
  }
})

</script>

<style scoped>
/* Custom styles (if any) can go here */
</style>
