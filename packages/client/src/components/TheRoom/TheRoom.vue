<template>
  <Card :pt="{content: {class: 'max-h-[60vh] w-[80vw] overflow-y-scroll flex flex-col-reverse'}}">
    <template #title>
      {{ roomId }}
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
import {computed, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import MessageInput from "@/components/TheRoom/MessageInput.vue";
import {useChatStore} from "@/stores/chat";
import ChatThread from "@/components/TheRoom/ChatThread.vue";

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const {join} = chatStore

const username = computed(() => window.localStorage.getItem('username'))
const avatar = computed(() => window.localStorage.getItem('avatar'))
const roomId = computed(() => route.params.roomId as string)

onMounted(() => {
  if (!username.value || !avatar.value) router.replace({name: 'lobby', params: {roomId: roomId.value}})
  else join(username.value, avatar.value, roomId.value)
})

</script>