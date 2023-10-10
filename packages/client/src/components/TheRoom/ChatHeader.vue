<template>
  <div class="flex flex-row justify-between items-center">
    <p>{{ roomId }}</p>
<!--    <div class="flex flex-row gap-1 cursor-default">-->
<!--      <div-->
<!--          v-for="(user, index) of users"-->
<!--          key="index"-->
<!--          :class="{-->
<!--            'pr-3': users.length < 3-->
<!--          }"-->
<!--          class="flex flex-row items-center gap-1 rounded-full bg-gray-300"-->
<!--      >-->
<!--        <Avatar v-tooltip.top="user.username" shape="circle" size="large">-->
<!--          {{ user.avatar }}-->
<!--        </Avatar>-->
<!--        <p v-if="users.length < 3" class="text-xs">{{ user.username }}</p>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
// import {useOldChatStore} from "@/stores/oldChat";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
// const chatStore = useOldChatStore()

// const {users, socket} = storeToRefs(chatStore)

const roomId = computed(() => route.params.roomId as string)

</script>