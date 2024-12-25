<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>

      <!-- Form -->
      <form @submit.prevent="handleRegister">
        <!-- First Name -->
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            v-model="firstName"
            id="firstName"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your first name"
            required
          />
        </div>

        <!-- Last Name -->
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            v-model="lastName"
            id="lastName"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your last name"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            v-model="email"
            id="email"
            type="email"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Username -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="username"
            @input="clearCheckState"
            @blur="checkUsername"
            id="username"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Username Existence Message -->
        <p v-if="!isTyping && isChecking" class="text-blue-500 text-sm mb-4">Checking username...</p>
        <p v-if="!isTyping && username && usernameExists === true" class="text-red-500 text-sm mb-4">Username already exists. Please choose another.</p>
        <p v-if="!isTyping && username && usernameExists === false" class="text-green-500 text-sm mb-4">Username is available.</p>

        <!-- Password -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Confirm Password -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password again"
            required
          />
        </div>

        <!-- Password Match Message -->
        <p v-if="password && confirmPassword && password !== confirmPassword" class="text-red-500 text-sm mb-4">
          Passwords do not match.
        </p>
        <p v-if="password && confirmPassword && password === confirmPassword" class="text-green-500 text-sm mb-4">
          Passwords match.
        </p>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="password !== confirmPassword || usernameExists"
          class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          Register
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/Login" class="text-blue-500 hover:underline">Login</router-link>
            </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SHA256 from "crypto-js/sha256";
import { enc } from "crypto-js";
import { API_BASE_URL } from '@/config'; 
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      usernameExists: null,
      errorMessage: '',
      isLoading: false,
      isTyping: false,
      isChecking: false, // 标志位，表示是否正在检查
    };
  },
  methods: {
    encryptData(password) {
      const hash = SHA256(password).toString(enc.Hex);
      return hash;
    },
    clearCheckState() {
      this.usernameExists = null; // 清除上一次的检查结果
      this.isChecking = true; // 显示“正在检查”
      this.isTyping = true;
    },
    async checkUsername() {
      if (!this.username) {
        // 如果用户名为空，清除状态并返回
        this.usernameExists = null;
        this.isChecking = false;
        this.isTyping = false; 
        return;
      }
      this.isTyping = false;
      // 开始检查
      this.isChecking = true;

      try {
        // 模拟发送请求到后端
        const response = await axios.post(`${API_BASE_URL}/if_username_exist`, { username: this.username });
        this.usernameExists = response.data.exists; // 后端返回 { exists: true/false }
      } catch (error) {
        console.error('Error checking username:', error);
        this.usernameExists = null; // 请求失败时重置状态
      } finally {
        this.isChecking = false; // 检查完成
      }
    },
    async handleRegister() {
      if (!this.firstName || !this.lastName || !this.email || !this.username || !this.password || !this.confirmPassword) {
        this.errorMessage = 'All fields are required.';
      } else if (this.usernameExists) {
        this.errorMessage = 'Username already exists.';
      } else if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
      } else {
        const encryptedPassword = this.encryptData(this.password);
        this.errorMessage = '';
        this.isLoading = true;
        try {
          const response = await axios.post(`${API_BASE_URL}/Register`,{
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            username: this.username,
            password: encryptedPassword,
          });
          if(response.data.status === 200){
            alert('Register Successful');
          }
          else if(response.data.status === 201){
            this.errorMessage = 'Username exist.Please try another one.';
          }
          else if(response.data.status === 202){
            this.errorMessage = 'Please check all the required unit.';
          }
        } catch(error){
          if(error.response){
            console.error('Response error:',error.response);
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
