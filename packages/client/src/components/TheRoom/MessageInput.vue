<template>
  <div class="p-inputgroup flex-1">
    <InputText v-model="message" @keyup.enter="send()"/>
    <Button icon="pi pi-send" @click="send()"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useChatStore } from "@/stores/chat";

const chatStore = useChatStore()
const {sendMessage} = chatStore

const message = ref('')

function send() {
  const msg = message.value.trim();
  if (msg == '') return
  sendMessage(msg)
  message.value = ''
}
</script>