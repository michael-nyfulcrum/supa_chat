<template>
  <div class="p-inputgroup flex-1">
    <InputText @keyup.enter="send()" v-model="message"/>
    <Button @click="send()" icon="pi pi-send"/>
  </div>
</template>

<script setup lang="ts">
import {useChatStore} from "@/stores/chat";
import {ref, computed} from "vue";
import {storeToRefs} from "pinia";

const chatStore = useChatStore()
const {sendMessage} = chatStore
const {socket} = storeToRefs(chatStore)

const message = ref('')
const username = computed(() => window.localStorage.getItem('username') ?? '🤡')

function send() {
  if (message.value.trim() == '') return
  sendMessage({
    timestamp: Date.now(),
    username: username.value,
    socketId: socket.value.id,
    content: message.value.trim()
  })
  message.value = ''
}
</script>