<template>
  <Card>
    <template #content>
      <div class="flex flex-col gap-3">
        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-circle"></i>
            </span>
          <InputText readonly  placeholder="Avatar" @keyup.enter="join()" v-model="avatar"/>
          <Button @click="randomizeAvatar()">Random</Button>
        </div>
        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>
          <InputText placeholder="Username" @keyup.enter="join()" v-model="username"/>
        </div>
        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-hashtag"></i>
            </span>
          <InputText placeholder="RoomID" @keyup.enter="join()" v-model="roomId"/>
        </div>
        <Button v-if="canJoin" @click="join" label="Chat!"/>
        <Button v-else disabled label="Chat!"/>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import {useChatStore} from "@/stores/chat";
import {computed, ref} from "vue";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import getRandomAnimalEmoji from "@/utils/getRandomAnimalEmoji";

const router = useRouter()
const route = useRoute()

const chatStore = useChatStore()
const {connected} = storeToRefs(chatStore)

const username = ref(window.localStorage.getItem('username') ?? '')
const roomId = ref(route.params.roomId as string ?? window.localStorage.getItem('roomId') ?? '')
const avatar = ref(window.localStorage.getItem('avatar') ?? getRandomAnimalEmoji())

const canJoin = computed(() => username.value !== "" && roomId.value !== "" && connected.value)

function randomizeAvatar() {
  avatar.value = getRandomAnimalEmoji()
}

function join() {
  if (!canJoin.value) return
  window.localStorage.setItem('username', username.value)
  window.localStorage.setItem('roomId', roomId.value)
  window.localStorage.setItem('avatar', avatar.value)
  router.push({
    name: 'room',
    params: {
      roomId: roomId.value
    }
  })
}
</script>

<style lang="scss" scoped>

</style>