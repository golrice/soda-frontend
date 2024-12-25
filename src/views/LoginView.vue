<template>
  
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

      <!-- Form -->
      <form @submit.prevent="handleLogin">
        <!-- Username -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="LoginForm.username"
            id="username"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="LoginForm.password"
            id="password"
            type="password"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Error message -->
        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <a href="#" class="text-blue-500 hover:underline">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script>
//import { RSAKey } from 'jsrsasign';
import axios from 'axios';
import SHA256 from "crypto-js/sha256";
import { enc } from "crypto-js";
import { API_BASE_URL } from '@/config';
export default {
  data() {
    return {
      LoginForm: {
        username: '',
        password: '',
        //OpenKey: '',
      },
      //publicKey: '',
      errorMessage: '',
      isLoading: false, 
    };
  },
  methods: {
    encryptData(password) {
      const hash = SHA256(password).toString(enc.Hex);
      return hash;
    },
    async handleLogin() {
      // Basic validation
      if (this.LoginForm.username === '' || this.LoginForm.password === '') {
        this.errorMessage = 'Both fields are required.';
      } else {
        this.errorMessage = '';
        this.isLoading = true;
        const encryptedPassword = this.encryptData(this.LoginForm.password);
        try {
          const response = await axios.post(`${API_BASE_URL}/login`, {
            username: this.LoginForm.username,
            sha256_hash: encryptedPassword
          });
          //console.error(response.error);
          if (response.data.message === 'Password is correct') {
            alert('Login Successful');
            // Handle successful login, e.g., redirect to dashboard
          } 
          else if(response.data.message === 'User does not exist.'){
            this.errorMessage = 'User does not exist.';
          }

          else if(response.data.message === 'Incorrect username or password.'){
            this.errorMessage = 'Incorrect username or password.';
          }
        } catch (error) {
           // Handle network errors or other issues
           if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response error:', error.response);
            this.errorMessage = error.response.data.message || 'An error occurred on the server.';
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Request error:', error.request);
            this.errorMessage = 'No response from the server. Please check your connection.';
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
            this.errorMessage = 'An error occurred while setting up the request.';
          }
        } finally {
          this.isLoading = false; 
        }
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles (if any) can go here */
</style>
