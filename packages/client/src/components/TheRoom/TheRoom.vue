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
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import MessageInput from "@/components/TheRoom/MessageInput.vue";
import ChatThread from "@/components/TheRoom/ChatThread.vue";
import ChatHeader from "@/components/TheRoom/ChatHeader.vue";
import { useSupabaseStore } from "@/stores/supabase";
import { storeToRefs } from "pinia";
import getRandomAnimalEmoji from "@/utils/getRandomAnimalEmoji";
import { useChatStore } from "@/stores/chat";

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const supabaseStore = useSupabaseStore()

const { session } = supabaseStore
const { user } = storeToRefs(supabaseStore)
const { joinRoom } = chatStore

const email = computed(() => session?.user?.email ?? '')
const avatar = computed(() => user.value?.avatar ?? getRandomAnimalEmoji())
const roomId = computed(() => route.params.roomId as string)

onMounted(() => {
  if (!email.value || !avatar.value) {
    console.debug('redirecting', email.value, avatar.value)
    router.replace({ name: 'lobby', params: { roomId: roomId.value } })
  } else {
    joinRoom(roomId.value)
  }
})


</script>