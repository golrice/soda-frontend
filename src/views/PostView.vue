<template>
  <div>
    <div class="flex flex-col gap-4">
      <FileDetailsCard v-for="file in files" :key="file.name" :file="file" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FileDetailsCard from '@/components/FileDetailsCard.vue';

const files = ref([
  { name: 'file1.txt', creationTime: '2022-01-01', author: 'user1' },
  { name: 'file2.txt', creationTime: '2022-01-02', author: 'user2' },
  { name: 'file3.txt', creationTime: '2022-01-03', author: 'user3' },
])

</script>
