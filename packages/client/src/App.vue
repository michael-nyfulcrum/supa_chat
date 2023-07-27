<template>
  <div class="flex w-full h-full items-center justify-center">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import {useChatStore} from "@/stores/chat";
import {onMounted} from "vue";

const chatStore = useChatStore()
const {connect} = chatStore

onMounted(() => {
  connect()
})
</script>