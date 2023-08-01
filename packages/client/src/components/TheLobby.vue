<template>
  <Card>
    <template #content>
      <div class="flex flex-col gap-3">
        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-circle"></i>
            </span>
          <InputText v-model="avatar" placeholder="Avatar" readonly @keyup.enter="join()"/>
          <Button @click="randomizeAvatar()">Random</Button>
        </div>
        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>
          <InputText v-model="username" placeholder="Username" @keyup.enter="join()"/>
        </div>
        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-hashtag"></i>
            </span>
          <InputText v-model="roomId" placeholder="RoomID" @keyup.enter="join()"/>
        </div>
        <Button v-if="canJoin" label="Chat!" @click="join"/>
        <Button v-else disabled label="Chat!"/>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import {useChatStore} from "@/stores/chat";
import {computed, ref} from "vue";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import getRandomAnimalEmoji from "@/utils/getRandomAnimalEmoji";
import {v4 as uuidv4} from 'uuid';

const router = useRouter()
const route = useRoute()

const chatStore = useChatStore()
const {connect} = chatStore
const {connected} = storeToRefs(chatStore)

const username = ref(window.localStorage.getItem('username') ?? '')
const roomId = ref(route.params.roomId as string ?? window.localStorage.getItem('roomId') ?? '')
const avatar = ref(window.localStorage.getItem('avatar') ?? getRandomAnimalEmoji())
const uuid = ref(window.localStorage.getItem('uuid') ?? uuidv4())

const canJoin = computed(() => username.value !== "" && roomId.value !== "" && connected.value)

function randomizeAvatar() {
  avatar.value = getRandomAnimalEmoji()
}

function join() {
  if (!canJoin.value) return
  window.localStorage.setItem('username', username.value)
  window.localStorage.setItem('roomId', roomId.value)
  window.localStorage.setItem('avatar', avatar.value)
  window.localStorage.setItem('uuid', uuid.value)
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