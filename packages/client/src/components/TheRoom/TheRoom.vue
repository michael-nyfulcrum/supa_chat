<template>
  <Card :pt="{content: {class: 'h-[60vh] w-[80vw] overflow-y-scroll flex flex-col-reverse'}}">
    <template #title>
      <ChatHeader/>
    </template>
    <template #content>
      <ChatThread/>
    </template>
    <template #footer>
      <MessageInput/>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import {computed, onBeforeUnmount, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import MessageInput from "@/components/TheRoom/MessageInput.vue";
import {useChatStore} from "@/stores/chat";
import ChatThread from "@/components/TheRoom/ChatThread.vue";
import ChatHeader from "@/components/TheRoom/ChatHeader.vue";

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const {join, leave} = chatStore

const username = computed(() => window.localStorage.getItem('username'))
const avatar = computed(() => window.localStorage.getItem('avatar'))
const uuid = computed(() => window.localStorage.getItem('uuid'))
const roomId = computed(() => route.params.roomId as string)

onMounted(() => {
  if (!username.value || !avatar.value || !uuid.value) router.replace({name: 'lobby', params: {roomId: roomId.value}})
  else join(username.value, avatar.value, uuid.value, roomId.value)
})

onBeforeUnmount(() => {
  leave()
})

</script>