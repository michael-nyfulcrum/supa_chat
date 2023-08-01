<template>
  <div class="p-inputgroup flex-1">
    <InputText v-model="message" @keyup.enter="send()"/>
    <Button icon="pi pi-send" @click="send()"/>
  </div>
</template>

<script lang="ts" setup>
import {useChatStore} from "@/stores/chat";
import {computed, ref} from "vue";
import {storeToRefs} from "pinia";

const chatStore = useChatStore()
const {sendMessage} = chatStore
const {socket} = storeToRefs(chatStore)

const message = ref('')
const username = computed(() => window.localStorage.getItem('username') ?? '🤡')

function send() {
  const msg = message.value.trim();
  if (msg == '') return
  sendMessage(msg)
  message.value = ''
}
</script>