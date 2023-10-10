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
          <InputText v-model="email" placeholder="Username" readonly/>
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
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import getRandomAnimalEmoji from "@/utils/getRandomAnimalEmoji";
import { useSupabaseStore } from "@/stores/supabase";

const router = useRouter()
const route = useRoute()
const supabaseStore = useSupabaseStore()

const { session, changeAvatar } = supabaseStore
const { user } = storeToRefs(supabaseStore)

const roomId = ref(route.params.roomId as string ?? '')

const canJoin = computed(() => roomId.value !== "")
const email = computed(() => session?.user?.email ?? '')
const avatar = computed(() => user.value?.avatar ?? getRandomAnimalEmoji())

function randomizeAvatar() {
  changeAvatar(getRandomAnimalEmoji())
}

function join() {
  if (canJoin.value) router.push({ name: 'room', params: { roomId: roomId.value } })
}
</script>

<style lang="scss" scoped>

</style>