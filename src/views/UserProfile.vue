<template>
  <div class="container">
    <!-- 左侧固定区域 -->
    <div class="left-section">
      <div class="user-info h2">
        <h2>{{ user.name }}</h2>
        <!-- 关注按钮 -->
        <button v-if="notSameUser" @click="followUser" class="follow-btn">
          {{ isFollowing ? '已关注' : '关注' }}
        </button>
        <div class="tags">
          <!-- 渲染标签 -->
          <a v-for="(tag, index) in user.tags" :key="index" :href="`#tag${index + 1}`" class="tag">{{ tag }}</a>
        </div>
      </div>
      <!-- 底部按钮容器 -->
      <div class="bottom-buttons">
        <button v-if="!notSameUser" @click="toggleEditing" class="bottom-btn">
          {{ isEditing ? '保存信息' : '修改信息' }}
        </button>
        <button v-if="!notSameUser" @click="logout" class="bottom-btn">注销账户</button>
        <button v-if="notSameUser" @click="chat" class="bottom-btn">聊天</button>
      </div>
    </div>

    <!-- 右侧个人简介 -->
    <div class="intro-container">
      <div class="intro">
        <input v-model="user.intro" class="w-full border-0" :readonly="!isEditing || notSameUser"
          :style="{ pointerEvents: isEditing ? 'auto' : 'none', backgroundColor: isEditing ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0)' }" />
      </div>
      <!-- 用户额外信息：邮箱，名字和加入时间 -->
      <div v-if="!notSameUser" class="user-additional-info">
        <div class="info-item">
          <span class="info-name">邮箱:</span>
          <input v-model="user.email" class="info-content" :readonly="!isEditing || notSameUser"
            :style="{ pointerEvents: isEditing ? 'auto' : 'none', backgroundColor: isEditing ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0)' }" />
        </div>
        <div class="info-item">
          <span class="info-name">姓:</span>
          <input v-model="user.firstname" class="info-content" :readonly="!isEditing || notSameUser"
            :style="{ pointerEvents: isEditing ? 'auto' : 'none', backgroundColor: isEditing ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0)' }" />
        </div>
        <div class="info-item">
          <span class="info-name">名:</span>
          <input v-model="user.lastname" class="info-content" :readonly="!isEditing || notSameUser"
            :style="{ pointerEvents: isEditing ? 'auto' : 'none', backgroundColor: isEditing ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0)' }" />
        </div>
        <div class="info-item">
          <span class="info-name">加入时间:</span>
          <span class="info-content">{{ user.joined_date }}</span>
        </div>
      </div>
      <div v-if="notSameUser" class="user-additional-info">
        <div class="info-item">
          <span class="info-name">邮箱:</span>
          <span class="info-content">{{ user.email }}</span>
        </div>
        <div class="info-item">
          <span class="info-name">加入时间:</span>
          <span class="info-content">{{ user.joined_date }}</span>
        </div>
      </div>
      <div class="flex flex-col gap-4 mt-4 w-full">
        <PostDetailsCard v-for="post in posts" :key="post.title" :file="post" />
      </div>
      <div class="follow-container">
        <!-- 左侧粉丝列表 -->
        <div class="follow-list">
          <h3 @click="toggleFollowers">
            粉丝 ({{ followers.length }})
            <span v-if="showFollowers">▲</span>
            <span v-else>▼</span>
          </h3>
          <ul v-if="showFollowers">
            <li v-for="(follower, index) in followers" :key="index" class="follow-item">
              <span>{{ follower }}</span>
            </li>
          </ul>
        </div>

        <!-- 右侧关注列表 -->
        <div class="follower-list">
          <h3 @click="toggleFollowing">
            关注列表 ({{ following.length }})
            <span v-if="showFollowing">▲</span>
            <span v-else>▼</span>
          </h3>
          <ul v-if="showFollowing">
            <li v-for="(follow, index) in following" :key="index" class="follow-item">
              <span>{{ follow }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { API_BASE_URL } from '@/config';
import { useRoute, useRouter } from 'vue-router';
import PostDetailsCard from '@/components/PostDetailsCard.vue';
import axios from 'axios';

// 用户数据
const user = ref({
  firstname: '',
  lastname: '',
  intro: '',
  tags: [],
  name: '',
  fullname: '',
  followed: false,
});

// 是否关注状态
const isFollowing = ref(false);
const username = ref('');
const notSameUser = ref(false);
const isEditing = ref(false);  // 新增状态来控制编辑模式
const posts = ref([]);
const router = useRouter();
const route = useRoute();

const followers = ref([]); // 关注者列表
const following = ref([]); // 粉丝列表
const showFollowers = ref(false); // 是否显示关注者列表
const showFollowing = ref(false); // 是否显示粉丝列表
const toggleFollowers = () => {
  showFollowers.value = !showFollowers.value;
};
const toggleFollowing = () => {
  showFollowing.value = !showFollowing.value;
};

async function getFollowData(username) {
  try {
    const followerResponse = await axios.get(`${API_BASE_URL}/get-followers?username=${username}`, {
      params: { username: username.value },
    });
    followers.value = followerResponse.data.friends;

    const followingResponse = await axios.get(`${API_BASE_URL}/get-following?username=${username}`, {
      params: { username: username.value },
    });
    following.value = followingResponse.data.friends;
  } catch (error) {
    console.error('Failed to fetch follow data:', error);
  }
}

// 获取用户信息（从后端获取）
async function getUserInfo(username, currentName) {
  try {
    const response = await fetch(`${API_BASE_URL}/get-profile?username=${username}&currentName=${currentName}`);
    if (response.ok) {
      const data = await response.json();
      user.value = data;
      isFollowing.value = data.followed;
    } else {
      console.error("Failed to fetch user info:", response.status);
    }
    const response2 = await fetch(`${API_BASE_URL}/get-posts/${username}`);
    if (response2.ok) {
      const data2 = await response2.json();
      posts.value = data2.posts;
    } else {
      console.error("Failed to fetch user posts:", response2.status);
    }
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
}

// 关注按钮点击事件
// 关注按钮点击事件
const followUser = async () => {
  // 切换关注状态
  isFollowing.value = !isFollowing.value;

  // 获取当前用户和被关注者的用户名
  const currentUser = username.value;
  const targetUser = user.value.name;
  const followAction = !isFollowing.value;
  try {
    // 发送关注请求到后端
    const response = await axios.post(`${API_BASE_URL}/follow`, {
      currentUser: currentUser,
      targetUser: targetUser,
      followAction: followAction,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      if (followAction) {
        console.log(`取消关注${targetUser}成功`);
      } else {
        console.log(`关注 ${targetUser} 成功`);
      }
      // 可以根据后端返回的数据进一步处理
    } else {
      console.error('关注失败:', response.status);
      isFollowing.value = !isFollowing.value;  // 关注失败时，恢复原来的状态
    }
  } catch (error) {
    console.error('关注请求失败:', error);
    isFollowing.value = !isFollowing.value;  // 关注失败时，恢复原来的状态
  }
};


async function updateIntro() {
  try {
    const response = await axios.post(`${API_BASE_URL}/update-profile`, {
      username: user.value['name'],
      intro: user.value['intro'],
      email: user.value['email'],
      firstname: user.value['firstname'],
      lastname: user.value['lastname'],
      oldname: user.value['oldname'],
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      alert('update profile success');
      isEditing.value = false;  // 保存后切换回只读模式
    } else {
      console.error('Failed to update profile:', response.status);
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
}

async function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  router.push('/');
}

async function chat() {
  // go to a chatroom including the current user and the visit user
  const visit_name = user.value['name'];
  const current_name = username.value;
  router.push({
    name: 'chatroom',
    params: {
      current_name,
      visit_name,
    },
  });
}

// 页面加载时获取用户信息
onMounted(() => {
  const postData = route.query;
  username.value = localStorage.getItem('username') || '';
  user.value['name'] = postData.visit_name || localStorage.getItem('username') || '';
  if (user.value['name'] === '') {
    alert('please login first');
    router.push('/');
  }
  notSameUser.value = username.value !== user.value['name'];
  getUserInfo(user.value['name'], username.value);  // 传递是否是同一个用户的标志
  getFollowData(user.value['name']);
});

// 切换编辑模式
const toggleEditing = () => {
  if (isEditing.value) {
    updateIntro();  // 在保存之前，提交修改
  } else {
    isEditing.value = true;  // 启用编辑模式
  }
};
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
.user-info {
  font-size: 20px;
  color: #333;
  text-align: center;
  margin: 0;
  padding-top: 20px;
  /* 确保用户名不被覆盖 */
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
  margin-left: 240px;
  /* 左侧导航栏宽度 + 间距 */
  flex: 1;
  /* 让右侧内容区域填满剩余空间 */
  padding: 20px;
  overflow-y: auto;
  max-height: 100vh;
}

/* 白色背景半透明容器 */
.intro {
  background-color: rgba(255, 255, 255, 0.5);
  /* 白色背景，50%透明 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 可选的阴影效果 */
  width: auto;
  /* 使宽度填满父容器 */
  box-sizing: border-box;
  /* 确保 padding 不影响容器宽度 */
}

/* 用户额外信息容器 */
.user-additional-info {
  margin-top: 50px;
  /* 距离个人简介50px */
  background-color: #f4f7fc;
  /* 背景颜色 */
  padding: 20px;
  /* 内边距 */
  border-radius: 10px;
  /* 圆角效果 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
}

/* 信息项容器 */
.info-item {
  display: flex;
  justify-content: space-between;
  /* 使名称和内容分开对齐 */
  margin-bottom: 20px;
}

/* 信息名称 */
.info-name {
  font-weight: bold;
  color: #555;
}

/* 信息内容 */
.info-content {
  color: #333;
  text-align: right;
  width: 60%;
  /* 控制信息内容区域的宽度 */
}

.follow-item {
  padding: 8px 16px;
  /* 内边距，使列表项更宽松 */
  border-bottom: 1px solid #ddd;
  /* 给每个列表项加一条底边 */
  cursor: pointer;
  /* 鼠标悬停时显示为可点击 */
  transition: background-color 0.3s ease;
  /* 平滑的背景色过渡 */
}
</style>
