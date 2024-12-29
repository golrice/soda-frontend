<template>
    <div class="flex flex-col h-screen justify-center items-center">
        <div class="flex flex-col p-4 h-full border border-r border-gray-200 rounded-lg w-4/5 bg-gray-50">
            <div class="flex flex-row justify-center items-center mb-4">
                <h1 class="text-3xl font-bold">{{ visit_name }}</h1>
            </div>
            <!-- 消息列表 -->
            <div class="flex flex-col h-full space-y-2 overflow-y-auto p-4 border rounded-lg mb-4"
                ref="messagesContainer">
                <div v-for="message in messages" :key="message.id"
                    :class="['message', message.sender === current_name ? 'self-end bg-blue-500 text-white' : 'self-start bg-gray-200']"
                    class="p-2 rounded-lg max-w-2/3">
                    {{ message.text }}
                </div>
            </div>

            <!-- 输入框 -->
            <form @submit.prevent="sendMessage" class="flex">
                <input v-model="newMessage" type="text" placeholder="Type a message..."
                    class="flex-grow p-2 border rounded-l-lg focus:outline-none" />
                <button type="submit"
                    class="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors">
                    Send
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { CHAT_API_BASE_URL, WS_BASE_URL } from '@/config';
import { useRoute } from 'vue-router';

const messages = ref([]);
const route = useRoute();
const current_name = ref('');
const visit_name = ref('');
const chatroom = ref('');
const newMessage = ref('');
const socket = ref(null);
const messagesContainer = ref(null);

const fetchMessages = async () => {
    try {
        const response = await fetch(`${CHAT_API_BASE_URL}/history?chatroom=${chatroom.value}`);
        const data = await response.json();
        messages.value = data.data;
        await scrollToEnd();
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

async function sendMessage() {
    if (newMessage.value.trim() === '') {
        return;
    }

    const message = {
        chatroom: chatroom.value,
        sender: current_name.value,
        receiver: visit_name.value,
        text: newMessage.value,
    };

    socket.value.send(JSON.stringify(message));
    newMessage.value = '';
}

async function scrollToEnd() {
    await nextTick();
    if (messagesContainer.value) {
        const container = messagesContainer.value;
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth',
        })
    }
}

onMounted(() => {
    console.log('mounted');
    current_name.value = route.params.current_name || '';
    visit_name.value = route.params.visit_name || '';
    console.log(current_name.value, visit_name.value);
    chatroom.value = [current_name.value, visit_name.value].sort().join('-');
    fetchMessages();

    socket.value = new WebSocket(`${WS_BASE_URL}/chat/${chatroom.value}/`);

    socket.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        messages.value.push(data);

        scrollToEnd();
    }

    socket.value.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.value.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.value.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
    };
});

onUnmounted(() => {
    if (socket.value) {
        socket.value.close();
    }
})

</script>

<style scoped></style>
