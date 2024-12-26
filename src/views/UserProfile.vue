<template>
  <div class="container">
    <!-- 左侧固定区域 -->
    <div class="left-section">
      <div class="avatar">
        <img :src="user.avatar" alt="User Avatar" />
      </div>
      <div class="user-info">
        <h2>{{ user.name }}</h2>
        <!-- 关注按钮 -->
        <button @click="followUser" class="follow-btn">{{ isFollowing ? '已关注' : '关注' }}</button>
        <div class="tags">
          <!-- 渲染标签 -->
          <a v-for="(tag, index) in user.tags" :key="index" :href="`#tag${index + 1}`" class="tag">{{ tag }}</a>
        </div>
      </div>
      <!-- 底部按钮容器 -->
      <div class="bottom-buttons">
        <button @click="editInfo" class="bottom-btn">修改信息</button>
        <button @click="logout" class="bottom-btn">注销账户</button>
      </div>
    </div>

    <!-- 右侧个人简介 -->
    <div class="intro-container">
      <div class="intro">
        <p>{{ user.intro }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { API_BASE_URL } from '@/config';
// 用户数据
const user = ref({
  avatar: '',
  name: '',
  intro: '',
  tags: [],
});

// 是否关注状态
const isFollowing = ref(false);
const username = "wym"

// 获取用户信息（从后端获取）
const getUserInfo = async (username) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-profile?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      user.value = data;
    } else {
      console.error("Failed to fetch user info:", response.status);
    }
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};

// 关注按钮点击事件
const followUser = () => {
  isFollowing.value = !isFollowing.value;
};

// 页面加载时获取用户信息
onMounted(() => {
  getUserInfo(username);  // 假设默认查询用户名 'wym'
});
</script>

<style scoped>
/* 整体布局 */
.container {
  display: flex;
  height: 100vh;
  padding: 20px;
}

/* 左侧固定区域 */
.left-section {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding-bottom: 20px;
  height: 100vh;
  box-sizing: border-box;
}

/* 头像样式 */
.avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

/* 用户名样式 */
.user-info h2 {
  font-size: 20px;
  color: #333;
  text-align: center;
  margin: 0;
}

/* 关注按钮 */
.follow-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 关注按钮悬停效果 */
.follow-btn:hover {
  background-color: #0056b3;
}

/* 标签样式 */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
}

/* 单个标签样式 */
.tag {
  text-decoration: none;
  color: #007bff;
  padding: 5px 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 标签悬停效果 */
.tag:hover {
  background-color: #007bff;
  color: white;
}

/* 底部按钮容器 */
.bottom-buttons {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 30px;
}

/* 按钮样式 */
.bottom-btn {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 按钮悬停效果 */
.bottom-btn:hover {
  background-color: #218838;
}

/* 注销按钮样式 */
.bottom-btn:nth-child(2) {
  background-color: #dc3545;
}

/* 注销按钮悬停效果 */
.bottom-btn:nth-child(2):hover {
  background-color: #c82333;
}

/* 右侧内容区域 */
.intro-container {
  margin-left: 240px; /* 左侧导航栏宽度 + 间距 */
  flex: 1;  /* 让右侧内容区域填满剩余空间 */
  padding: 20px;
  overflow-y: auto;
  max-height: 100vh;
}

/* 白色背景半透明容器 */
.intro {
  background-color: rgba(255, 255, 255, 0.5); /* 白色背景，50%透明 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 可选的阴影效果 */
  width:auto; /* 使宽度填满父容器 */
  box-sizing: border-box; /* 确保 padding 不影响容器宽度 */
}

/* 个人简介文本 */
.intro p {
  margin: 0;
  font-size: 16px;
  color: #333;
}
</style>
