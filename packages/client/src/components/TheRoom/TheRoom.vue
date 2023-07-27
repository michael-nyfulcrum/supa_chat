<template>
  <Card>
    <template #title>
      {{roomId}}
    </template>
    <template #content>
      <ChatThread/>
    </template>
    <template #footer>
      <MessageInput/>
    </template>
  </Card>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import MessageInput from "@/components/TheRoom/MessageInput.vue";
import {useChatStore} from "@/stores/chat";
import ChatThread from "@/components/TheRoom/ChatThread.vue";

const route = useRoute()
const chatStore = useChatStore()
const {join} = chatStore

const username = computed(() => window.localStorage.getItem('username') ?? '🤡')
const roomId = computed(() => route.params.id as string)

onMounted(() => {
  join(username.value, roomId.value)
})

</script>