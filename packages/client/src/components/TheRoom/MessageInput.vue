<template>
  <div class="p-inputgroup flex-1">
    <InputText @keyup.enter="send()" v-model="message"/>
    <Button @click="send()" icon="pi pi-send"/>
  </div>
</template>

<script setup lang="ts">
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