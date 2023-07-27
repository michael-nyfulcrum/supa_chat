<template>
  <div class="flex flex-col">
    <div v-if="messages.length > 0" v-for="(message, index) in messages" :key="index">
      <div class="flex flex-row gap-2"
           :class="{
            'mt-6': index > 0 && messages[index - 1].socketId != message.socketId,
            'mt-0.5': index > 0 && messages[index - 1].socketId == message.socketId,
            'flex-row-reverse': socket.id == message.socketId
           }">
        <Avatar 
            v-if="index === messages.length - 1 || messages[index + 1].socketId != message.socketId"
            class="self-end" 
            shape="circle">🐶</Avatar>
        <Avatar v-else class="self-end invisible" shape="circle"></Avatar>
        <div class="flex flex-col gap-1">
          <p v-if="messages[index - 1]?.socketId != message.socketId" class="text-[0.7em] text-gray-500 ml-2">
            {{ message.username }}</p>
          <div class="bg-gray-300 rounded-xl p-2 text-sm">{{ message.content }}</div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center">
      <p>Say something to kick off the conversation!</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useChatStore} from "@/stores/chat";
import {storeToRefs} from "pinia";

const chatStore = useChatStore()
const {messages, socket} = storeToRefs(chatStore)

</script>